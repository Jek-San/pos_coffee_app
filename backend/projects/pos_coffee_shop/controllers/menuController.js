// projects/pos_coffee_shop/controllers/menuController.js
const { imageService } = require("../services/imageService");
const toCaps = require('../../../utils/toCaps');


const menuService = require('../services/menuService');
const menuController = {
  async getAllBySlug(req, res) {
    try {
      const { merchantSlug } = req.params || req.query;
      const items = await menuService.getAllBySlug(merchantSlug);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const { merchantId } = req.params || req.query;
      const items = await menuService.getAll(merchantId);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const item = await menuService.getById(req.params.id);
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const {
        name,
        price,
        description,
        category,
        subCategoryName,
        available,
        merchantId,
        variantGroups,
        storage = 'cloudinary',
      } = req.body;

      // Validate required fields
      if (!name || !price || !category || !merchantId) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: name, price, category, and merchantId are required'
        });
      }

      // Parse and validate variant groups
      let parsedVariantGroups = null;
      if (variantGroups) {
        try {
          parsedVariantGroups = JSON.parse(variantGroups);
        } catch (error) {
          return res.status(400).json({
            success: false,
            message: 'Invalid variantGroups format: must be valid JSON'
          });
        }
      }

      const dataBody = {
        name: name.trim(),
        price: Number(price),
        description: description?.trim() || '',
        category: toCaps(category),
        subCategoryName: subCategoryName ? toCaps(subCategoryName) : null,
        variantGroups: parsedVariantGroups,
        available: available !== 'false',
        merchantId,
      };

      console.log("✅ dataBody:", dataBody);

      // Create menu item (with transaction handling variants)
      const createdMenuItem = await menuService.create(dataBody);
      const menuItemId = createdMenuItem.id;

      console.log('✅ menuItemId:', menuItemId);

      // Handle image uploads (separate from main transaction)
      const image = req.files?.image?.[0];
      const gallery = req.files?.gallery || [];
      const thumbnail = req.files?.thumbnail?.[0];

      try {
        // Upload images
        if (thumbnail) {
          await imageService.saveImage({
            file: thumbnail,
            type: 'thumbnail',
            folder: 'menu_images',
            storage,
            menuItemId,
          });
        }

        if (image) {
          await imageService.saveImage({
            file: image,
            type: 'logo',
            folder: 'menu_images',
            storage,
            menuItemId,
          });
        }

        for (const file of gallery) {
          await imageService.saveImage({
            file,
            type: 'gallery',
            folder: 'menu_gallery',
            storage,
            menuItemId,
          });
        }
      } catch (imageError) {
        console.warn('Image upload failed, but menu item created:', imageError);
        // Don't fail the entire request if image upload fails
      }

      // Get final data with images
      const updatedMenu = await menuService.getById(menuItemId);

      res.status(201).json({
        success: true,
        message: 'Menu item created successfully',
        data: {
          id: updatedMenu.id,
          name: updatedMenu.name,
          price: updatedMenu.price,
          description: updatedMenu.description,
          category: updatedMenu.category,
          subCategory: updatedMenu.subCategory,
          available: updatedMenu.available,
          merchantId: updatedMenu.merchantId,
          images: {
            logo: updatedMenu.images.find(i => i.type === 'logo') || null,
            gallery: updatedMenu.images.filter(i => i.type === 'gallery') || [],
            thumbnail: updatedMenu.images.find(i => i.type === 'thumbnail') || null,
          },
          variants: updatedMenu.menuVariants || [],
          createdAt: updatedMenu.createdAt,
          updatedAt: updatedMenu.updatedAt,
        },
      });

    } catch (error) {
      console.error('Create menu failed:', error);

      // Return appropriate error based on the error type
      if (error.message.includes('validation') || error.message.includes('required')) {
        res.status(400).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Failed to create menu item',
          error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
      }
    }
  },



  async update(req, res) {
    const menuItemId = req.params.id;
    const {
      name,
      price,
      description,
      category,
      subCategoryName, // ✅ NEW
      available,
      merchantId,
      variantGroups,
      storage = 'cloudinary',
      keptGalleryIds,
      thumbnailId,

    } = req.body;

    const image = req.files?.image?.[0];
    const gallery = req.files?.gallery || [];
    const thumbnail = req.files?.thumbnail?.[0];

    try {
      // ✅ 1. Update basic fields


      const dataBody = {
        id: menuItemId,
        name,
        price: Number(price),
        description,
        category: toCaps(category),
        subCategoryName: subCategoryName ? toCaps(subCategoryName) : null, // ✅ NEW
        variantGroups: JSON.parse(variantGroups) || null,
        available: available !== 'false',
        merchantId,
      }
      // for thumnail, if the thumnailId is null, that mean the thumnail img is updated, so we need to delete the old thumnail img, and create a new thumnail img for that 
      // for galery, if the keptGalery is null that mean all the galery img is change , so we need to delete the old galery img, and create a new galery img for that, and if only the keptGalery is not null just chane from 3 galery to 1 galery taht mean user delete 2 images, so we need to delete the old galery img, and create a new galery img for that
      const dataImage = {

        keptGalleryIds,
        thumbnail,
        image,
        gallery,
      }


      console.log("✅ dataBody:", dataBody);
      console.log("✅ dataImage:", dataImage);
      const updatedItem = await menuService.update(menuItemId, dataBody, dataImage);





      // ✅ 4. Return updated with images
      const refreshed = await menuService.getById(menuItemId);
      const dataReturn = {
        ...refreshed,
        images: {
          logo: refreshed.images.find(i => i.type === 'logo'),
          gallery: refreshed.images.filter(i => i.type === 'gallery'),
        },
      }
      res.json({
        status: 'success',
        message: 'Menu item updated successfully',
        data: dataReturn
      });

    } catch (error) {
      console.error('Update menu item failed:', error);
      res.status(500).json({
        status: "error",
        message: 'Failed to update menu item' + error
      });
    }
  },

  async remove(req, res) {
    const menuItemId = req.params.id;

    try {

      // ✅ 2. Hapus menu item-nya
      await menuService.remove(menuItemId);

      res.status(204).send(); // No Content

    } catch (error) {
      console.error('Delete menu item failed:', error);
      res.status(500).json({ message: 'Failed to delete menu item' });
    }
  },
  async disableMenuItem(req, res) {
    const { menuId, available } = req.body;
    const dataBody = {
      id: menuId,
      available
    }
    console.log("✅ dataBody disableMenuItem:", dataBody);
    try {
      const updated = await menuService.disableMenuItem(dataBody);
      res.json({
        status: 'success',
        message: 'Menu item disabled successfully',
        data: updated
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = menuController;

