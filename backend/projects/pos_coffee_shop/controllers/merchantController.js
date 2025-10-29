// projects/pos_coffee_shop/controllers/merchantController.js
const { pos: prisma } = require('../../../models/client');
const merchantService = require("../services/merchantService")


const { imageService } = require("../services/imageService");
const fs = require('fs')


exports.getMerchants = async (req, res) => {
  const merchants = await prisma.merchant.findMany({ include: { menuItems: true, images: true } });
  res.json(merchants);
};

exports.getMerchantBySlug = async (req, res) => {
  const { slug } = req.params;
  console.log('Merchant slug at getMerchantBySlugdd:', slug);
  const merchant = await prisma.merchant.findUnique({
    where: { slug },
    include: { menuItems: true },
  });
  if (!merchant) return res.status(404).json({ message: 'Merchant not found' });
  res.json(merchant);
};

exports.getMerchantById = async (req, res) => {
  const { id } = req.params;
  console.log('Merchant ID at getMerchantById:', id);

  const merchant = await prisma.merchant.findUnique({
    where: { id },
    include: {
      images: {
        where: { type: 'logo' } // ✅ Filter logo only
      },
      tables: true,
      menuItems: true,
      orders: {
        select: { id: true }
      }
    }
  });

  if (!merchant) return res.status(404).json({ message: 'Merchant not found' });

  res.json(merchant);
};


exports.updateMerchant = async (req, res) => {
  const { id } = req.params;
  const merchantId = id
  const logo = req.files?.logo?.[0];
  const cover = req.files?.cover?.[0];
  const gallery = req.files?.gallery || [];
  const qrPayment = req.files?.qrPayment?.[0];
  const paymentMethods = req.body.paymentMethodOptions
  console.log(paymentMethods)

  // const storage = req.body.storage ? req.body.storage : 'local'
  const storage = req.body.storage ? req.body.storage : 'cloudinary'
  console.log(storage)
  console.log('Files:', logo, cover, gallery);
  try {
    const relationId = {
      merchantId: id
    }
    if (logo) {
      await imageService.deleteImagesByType(merchantId, 'logo');
      await imageService.saveImage({
        file: logo,
        type: 'logo',
        folder: 'merchant_logos',
        storage,
        relationId: relationId,
      });
    }
    if (qrPayment) {
      await imageService.deleteImagesByType(merchantId, 'qrPayment');
      await imageService.saveImage({
        file: qrPayment,
        type: 'qrPayment',
        folder: 'qrPayment_photo',
        storage,
        merchantId: id,
      });
    }

    if (cover) {

      await imageService.saveImage({
        file: cover,
        type: 'cover',
        folder: 'merchant_covers',
        storage,
        merchantId: id,
      });
    }

    // if (gallery.length > 0) {
    //   await imageService.saveGallery(gallery, id, storage);
    // }
    const updated = await merchantService.updateMerchantProfile(id, {
      name: req.body.name,
      themeColor: req.body.themeColor,
      paymentMethods: paymentMethods,

    });


    res.json({
      id: updated.id,
      name: updated.name,
      themeColor: updated.themeColor,
      paymentMethods: updated.paymentMethods,
      images: {
        logo: updated.images.find(i => i.type === 'logo'),
        qrPayment: updated.images.find(i => i.type === 'qrPayment'),
        cover: updated.images.find(i => i.type === 'cover'),
        gallery: updated.images.filter(i => i.type === 'gallery'),
      }
    });


  } catch (err) {
    console.error('Update merchant failed:', err);
    res.status(500).json({ message: 'Failed to update merchant' });
  }
};


