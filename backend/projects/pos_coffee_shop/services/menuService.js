// projects/pos_coffee_shop/services/menuService.js
const { pos } = require('../../../models/client');
const toCaps = require('../../../utils/toCaps');
const sanitize = require('../../../utils/sanitize');
const { th } = require('zod/locales');
const { imageService } = require("./imageService");



const ensureSubCategory = async ({ name, category, merchantId }) => {
  // Try to find existing subcategory
  let sub = await pos.subCategory.findFirst({
    where: {
      name: name.toUpperCase(),
      category,
      merchantId,
    },
  });

  if (!sub) {
    sub = await pos.subCategory.create({
      data: {
        name: name.toUpperCase(),
        category,
        merchantId,
      },
    });
  }

  return sub;
};
// part of createMenuItemService
async function validateVariantGroups(variantGroups) {
  if (!Array.isArray(variantGroups)) {
    throw new Error('variantGroups must be an array');
  }

  for (const [index, group] of variantGroups.entries()) {
    if (!group.name || typeof group.name !== 'string') {
      throw new Error(`Variant group ${index}: name is required and must be a string`);
    }

    if (!Array.isArray(group.options)) {
      throw new Error(`Variant group "${group.name}": options must be an array`);
    }

    if (group.options.length === 0) {
      throw new Error(`Variant group "${group.name}": must have at least one option`);
    }

    for (const [optIndex, option] of group.options.entries()) {
      if (!option.name || typeof option.name !== 'string') {
        throw new Error(`Variant group "${group.name}", option ${optIndex}: name is required and must be a string`);
      }

      if (option.extraPrice !== undefined && typeof option.extraPrice !== 'number') {
        throw new Error(`Variant group "${group.name}", option "${option.name}": extraPrice must be a number`);
      }
    }
  }
}

async function handleVariantGroupsWithValidation(tx, variantGroups, menuItemId, merchantId) {
  if (!variantGroups?.length) return;

  // Validate input data first
  await validateVariantGroups(variantGroups);

  for (const group of variantGroups) {
    const { name, options } = group;

    try {
      // Find or create MenuVariantType with upsert to handle race conditions
      const variantType = await tx.menuVariantType.upsert({
        where: {
          name_merchantId: { // Assuming you have a compound unique constraint
            name,
            merchantId
          }
        },
        create: {
          name,
          merchantId
        },
        update: {}, // No updates needed if it exists
      });

      // Create variants with validation
      const variantData = options.map((option) => ({
        name: option.name.trim(),
        extraPrice: Number(option.extraPrice) || 0,
        menuItemId,
        variantTypeId: variantType.id
      }));

      await tx.menuVariant.createMany({
        data: variantData,
        skipDuplicates: true // Skip if duplicate names exist
      });

    } catch (error) {
      throw new Error(`Failed to create variant group "${name}": ${error.message}`);
    }
  }
}

async function handleVariantGroupsUpdate(menuItemId, merchantId, variantGroups) {
  if (!variantGroups?.length) {
    // If no variant groups provided, soft delete all existing variants for this menu item
    await pos.menuVariant.updateMany({
      where: {
        menuItemId,
        deletedAt: null
      },
      data: { deletedAt: new Date() }
    });
    return;
  }

  console.log('variantGroups', variantGroups);
  console.log('menuItemId', menuItemId);

  // Get existing variant types for this specific menu item
  const existingVariantTypes = await pos.menuVariantType.findMany({
    where: { merchantId },
    include: {
      options: {
        where: {
          menuItemId,
          deletedAt: null // Only get active variants
        }
      }
    }
  });

  // Track which variant types are being used in the update
  const incomingVariantTypeNames = variantGroups.map(group => group.name);

  for (const incomingGroup of variantGroups) {
    // 1️⃣ Find or create variantType
    let variantType = existingVariantTypes.find(
      t => t.name === incomingGroup.name
    );

    if (!variantType) {
      // Double-check if it exists in DB (might not be in our filtered list)
      variantType = await pos.menuVariantType.findFirst({
        where: { name: incomingGroup.name, merchantId },
        include: {
          options: {
            where: {
              menuItemId,
              deletedAt: null
            }
          }
        }
      });

      if (!variantType) {
        variantType = await pos.menuVariantType.create({
          data: { name: incomingGroup.name, merchantId },
          include: { options: [] }
        });
      }
    }

    // 2️⃣ Update or create variants
    for (const incomingOption of incomingGroup.options) {
      // First, check if ANY variant with this name exists for this menuItem (active or soft-deleted)
      const existingVariant = await pos.menuVariant.findFirst({
        where: {
          name: incomingOption.name,
          menuItemId
        }
      });

      if (existingVariant) {
        // Update the existing variant (whether active or soft-deleted)
        await pos.menuVariant.update({
          where: { id: existingVariant.id },
          data: {
            extraPrice: incomingOption.extraPrice,
            variantTypeId: variantType.id,
            deletedAt: null // Ensure it's active
          }
        });
      } else {
        // Create brand new variant
        await pos.menuVariant.create({
          data: {
            name: incomingOption.name,
            extraPrice: incomingOption.extraPrice,
            menuItemId,
            variantTypeId: variantType.id
          }
        });
      }
    }

    // 3️⃣ Soft delete variants that are no longer in the incoming group
    const incomingOptionNames = incomingGroup.options.map(o => o.name);

    // Get all active variants for this variant type and menu item
    const activeVariantsForType = await pos.menuVariant.findMany({
      where: {
        menuItemId,
        variantTypeId: variantType.id,
        deletedAt: null
      }
    });

    for (const existing of activeVariantsForType) {
      if (!incomingOptionNames.includes(existing.name)) {
        await pos.menuVariant.update({
          where: { id: existing.id },
          data: { deletedAt: new Date() }
        });
      }
    }
  }

  // 4️⃣ Smart cleanup: Soft delete variants and unused variant types
  for (const existingType of existingVariantTypes) {
    if (!incomingVariantTypeNames.includes(existingType.name) && existingType.options.length > 0) {
      // Step 1: Soft delete all variants for this variant type and menu item
      await pos.menuVariant.updateMany({
        where: {
          menuItemId,
          variantTypeId: existingType.id,
          deletedAt: null
        },
        data: { deletedAt: new Date() }
      });

      // Step 2: Check if this variant type is still used by other menu items
      const otherActiveUsage = await pos.menuVariant.count({
        where: {
          variantTypeId: existingType.id,
          deletedAt: null,
          menuItem: {
            merchantId, // Only check within same merchant
            id: { not: menuItemId }
          }
        }
      });

      // Step 3: Soft delete variant type if no other menu items use it
      if (otherActiveUsage === 0) {
        await pos.menuVariantType.update({
          where: { id: existingType.id },
          data: { deletedAt: new Date() }
        });

        console.log(`Cleaned up unused variant type: ${existingType.name}`);
      } else {
        console.log(`Kept variant type ${existingType.name} - used by ${otherActiveUsage} other menu items`);
      }
    }
  }
}



const menuItemService = {
  async getAllBySlug(merchantSlug) {

    return await pos.menuItem.findMany({
      where: { slug: merchantSlug },
      include: { images: true, subCategory: true },
    });
  },
  async getAll(merchantId) {
    return await pos.menuItem.findMany({
      where: { merchantId },
      include: { images: true },
    });
  },

  async getById(id) {

    return await pos.menuItem.findUnique({
      where: { id },
      include: { images: true, subCategory: true, menuVariants: { where: { menuItemId: id } } },
    });
  },

  async create(data) {
    const { subCategoryName, category, merchantId, variantGroups } = data;

    // Use database transaction to ensure all-or-nothing creation
    return await pos.$transaction(async (tx) => {
      try {
        // 1. Handle subcategory
        let subCategory = null;
        if (subCategoryName) {
          subCategory = await ensureSubCategory({ name: subCategoryName, category, merchantId });
        }

        // 2. Create menu item
        const allowedFields = ['name', 'price', 'description', 'category', 'available', 'merchantId'];
        const cleanedData = sanitize(data, allowedFields);

        const menuItem = await tx.menuItem.create({
          data: {
            ...cleanedData,
            subCategoryId: subCategory?.id || null,
          },
          include: { images: true, subCategory: true },
        });

        // 3. Create variants with validation
        if (variantGroups?.length) {
          await handleVariantGroupsWithValidation(tx, variantGroups, menuItem.id, merchantId);
        }

        // 
        return menuItem;

      } catch (error) {
        console.error('Menu item creation failed:', error);
        throw new Error(`Failed to create menu item: ${error.message}`);
      }
    });
  },

  async update(id, data, dataImage) {
    const { subCategoryName, category, merchantId, id: menuItemId, keptGalleryIds } = data;
    const existingMenuItem = await this.getById(id);
    console.log("Menu Item Id", menuItemId)

    // Update subCategory if exists
    if (existingMenuItem?.subCategory) {
      if (subCategoryName === null) {
        throw new Error('Subcategory name cannot be null');
      }
      await pos.subCategory.update({
        where: { id: existingMenuItem.subCategory.id },
        data: { name: subCategoryName, category, merchantId },
      });
    }

    const allowedFields = ['name', 'price', 'description', 'category', 'available', 'merchantId'];
    const cleanedData = sanitize(data, allowedFields);

    const menuItem = await pos.menuItem.update({
      where: { id },
      data: cleanedData,
    });

    // Handle variant updates with soft delete logic
    await handleVariantGroupsUpdate(id, merchantId, data.variantGroups);

    // --- Handle Images ---
    const existingImages = await pos.image.findMany({ where: { menuItemId } });

    // 1. Thumbnail

    const oldThumb = existingImages.find(img => img.type === 'thumbnail');
    if (dataImage.thumbnail) {
      if (oldThumb) await imageService.deleteImageById(oldThumb.id);
      await imageService.saveImage({
        file: dataImage.thumbnail,
        type: 'thumbnail',
        folder: 'menu_images',
        storage: dataImage.storage,
        menuItemId,
      });
    } else if (!dataImage.thumbnailId && oldThumb) {
      await imageService.deleteImageById(oldThumb.id);
    }

    // 2. Logo
    const oldLogo = existingImages.find(img => img.type === 'logo');
    if (dataImage.image) {
      if (oldLogo) await imageService.deleteImageById(oldLogo.id);
      await imageService.saveImage({
        file: dataImage.image,
        type: 'logo',
        folder: 'menu_images',
        storage: dataImage.storage,
        menuItemId,
      });
    }

    // 3. Gallery
    let keptGalleryArr = [];
    if (dataImage.keptGalleryIds) {
      try {
        keptGalleryArr = JSON.parse(dataImage.keptGalleryIds);
      } catch {
        keptGalleryArr = [];
      }
    }
    const oldGallery = existingImages.filter(img => img.type === 'gallery');
    const toDelete = oldGallery.filter(img => !keptGalleryArr.includes(img.id));
    for (const img of toDelete) {
      await imageService.deleteImageById(img.id);
    }
    for (const file of dataImage.gallery) {
      await imageService.saveImage({
        file,
        type: 'gallery',
        folder: 'menu_gallery',
        storage: dataImage.storage,
        menuItemId,
      });
    }

    return true;


    return menuItem;
  },

  async remove(id) {
    return await pos.menuItem.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  },
  async disableMenuItem(dataBody) {
    return await pos.menuItem.update({
      where: { id: dataBody.id },
      data: { available: dataBody.available },
    })
  },
};

module.exports = menuItemService;