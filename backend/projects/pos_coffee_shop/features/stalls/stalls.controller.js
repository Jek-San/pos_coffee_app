// projects/pos_coffee_shop/features/stalls/stalls.controller.js
const { success } = require("zod");
const toCaps = require('../../../../utils/toCaps');
const stallsService = require("./stalls.service");

// create menu in stalls
exports.createMenuStalls = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      subCategoryName,
      available,
      merchantId,
      stallId,
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
      stallId
    };

    console.log("✅ dataBody:", dataBody);

    // Create menu item (with transaction handling variants)
    const createdMenuItem = await stallsService.createMenuStall(dataBody);
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
    const updatedMenu = await stallsService.getByIdMenu(menuItemId);

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


  // get menu stalls
  exports.initMenuStalls = async (req, res) => {
    try {
      const stallId = req.params.stallId;
      const result = await stallsService.initMenuStalls(stallId);
      res.json({ status: "success", data: result });
    } catch (err) {
      console.error("Init Menu Stalls Method Error:", err);
      res.status(500).json({ error: "Failed to init menu stalls method" });
    }
  };

// stall-settings
exports.updateSettingsStall = async (req, res) => {

  try {
    const stallId = req.params.stallId;
    const {
      nameStall,
      description,
      nameUser,
      emailUser,
      password,
      schedules,
      overrides
    } = req.body;

    // Parse JSON strings if they exist

    let parsedSchedules = [];
    let parsedOverrides = [];


    if (schedules) {
      try {
        parsedSchedules = typeof schedules === 'string' ? JSON.parse(schedules) : schedules;
      } catch (e) {
        return res.status(400).json({ error: "Invalid schedules format" });
      }
    }

    if (overrides) {
      try {
        parsedOverrides = typeof overrides === 'string' ? JSON.parse(overrides) : overrides;
      } catch (e) {
        return res.status(400).json({ error: "Invalid overrides format" });
      }
    }


    // Validate required fields
    if (!nameStall?.trim()) {
      return res.status(400).json({ error: "Nama toko wajib diisi" });
    }

    if (!nameUser?.trim()) {
      return res.status(400).json({ error: "Nama user wajib diisi" });
    }

    if (!emailUser?.trim()) {
      return res.status(400).json({ error: "Email user wajib diisi" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailUser)) {
      return res.status(400).json({ error: "Format email tidak valid" });
    }

    // Validate schedules format
    if (parsedSchedules.length > 0) {
      for (const schedule of parsedSchedules) {
        if (typeof schedule.dayOfWeek !== 'number' ||
          schedule.dayOfWeek < 0 ||
          schedule.dayOfWeek > 6) {
          return res.status(400).json({ error: "Format jadwal tidak valid" });
        }
      }
    }

    // Validate overrides format
    if (parsedOverrides.length > 0) {
      for (const override of parsedOverrides) {
        if (!override.date || isNaN(Date.parse(override.date))) {
          return res.status(400).json({ error: "Format tanggal override tidak valid" });
        }
      }
    }

    const updateData = {
      nameStall: nameStall.trim(),
      description: description?.trim() || '',
      nameUser: nameUser.trim(),
      emailUser: emailUser.trim(),
      password: password?.trim() || null,
      schedules: parsedSchedules,
      overrides: parsedOverrides,
      logo: req.file || null
    };
    const dataImages = req.file ? { logo: req.file } : {};

    const result = await stallsService.updateSettingsStall(stallId, updateData, dataImages);
    res.json({
      status: "success",
      message: "Pengaturan stall berhasil diperbarui",
      data: result
    });

  } catch (err) {
    console.error("Update Stalls Settings Method Error:", err);

    // Handle specific error types
    if (err.code === 'P2002') {
      return res.status(400).json({ error: "Email sudah digunakan oleh user lain" });
    }

    if (err.code === 'P2025') {
      return res.status(404).json({ error: "Stall tidak ditemukan" });
    }

    res.status(500).json({
      error: "Gagal memperbarui pengaturan stall",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};
exports.initSettingsStalls = async (req, res) => {
  try {
    const stallId = req.params.stallId;
    const result = await stallsService.initSettingsStalls(stallId);
    res.json({ status: "success", data: result });
  } catch (err) {
    console.error("Init Stalls Setings Method Error:", err);
    res.status(500).json({ error: "Failed to init stalls settings method" });
  }
}
exports.initUserStalls = async (req, res) => {
  try {
    const merchantId = req.params.merchantId;
    const result = await stallsService.initUserStalls(merchantId);
    res.json({ status: "success", data: result });
  } catch (err) {
    console.error("Init Stalls Method Error:", err);
    res.status(500).json({ error: "Failed to init stalls method" });
  }
};
exports.initStalls = async (req, res) => {
  try {
    const merchantId = req.params.merchantId;
    const result = await stallsService.initStalls(merchantId);
    res.json({ status: "success", data: result });
  } catch (err) {
    console.error("Init Stalls Method Error:", err);
    res.status(500).json({ error: "Failed to init stalls method" });
  }
};
exports.resetPassword = async (req, res) => {
  try {
    const stallId = req.params.stallId;
    const { password } = req.body;
    const result = await stallsService.resetPassword(stallId, password);
    res.json({ success: true, data: result });
  } catch (err) {
    console.error("Reset Password Method Error:", err);
    res.status(500).json({ status: false, error: "Failed to reset password method", message: "Failed to reset password method" });
  }
}

exports.toggleStatus = async (req, res) => {
  try {
    const stallId = req.params.stallId;
    const result = await stallsService.toggleStatus(stallId);
    res.json({ success: true, message: "Status updated successfully", data: result });
  } catch (err) {
    console.error("Toogle Status Method Error:", err);
    res.status(500).json({ status: false, error: "Failed to toogle status method", message: "Failed to toogle status method" });
  }
}

exports.createUserStall = async (req, res) => {
  try {
    const merchantId = req.params.merchantId
    const { name, email, category, password } = req.body
    const dataBody = {
      name,
      email,
      category,
      password,
      merchantId: merchantId
    }
    const result = await stallsService.createUserStall(dataBody);

    res.status(201).json(
      { status: "success", message: "Stall And User created successfully", data: result }
    );
  } catch (err) {
    console.error("Create Stall And User Method Error:", err);
    res.status(500).json({ error: "Failed to create Stall And User method" });
  }
};

exports.createBulkUserStalls = async (req, res) => {
  try {
    const merchantId = req.params.merchantId;
    const { stalls } = req.body; // Expecting an array of stalls
    console.log("Merchant ID:", merchantId);
    console.log("Stalls:", stalls);
    // Validate that stalls is an array
    if (!Array.isArray(stalls) || stalls.length === 0) {
      return res.status(400).json({
        error: "Invalid input: 'stalls' must be a non-empty array"
      });
    }

    // Add merchantId to each stall data
    const stallsWithMerchantId = stalls.map(stall => ({
      ...stall,
      merchantId: merchantId
    }));

    const result = await stallsService.createBulkUserStalls(stallsWithMerchantId);

    res.status(201).json({
      status: "success",
      message: `${result.created.length} Stalls and Users created successfully`,
      data: {
        created: result.created,
        failed: result.failed,
        summary: {
          total: stalls.length,
          successful: result.created.length,
          failed: result.failed.length
        }
      }
    });
  } catch (err) {
    console.error("Bulk Create Stalls And Users Method Error:", err);
    res.status(500).json({
      error: "Failed to create bulk Stalls And Users",
      details: err.message
    });
  }
};