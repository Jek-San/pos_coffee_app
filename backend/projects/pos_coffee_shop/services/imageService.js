const { pos: prisma } = require('../../../models/client');
const { fileService } = require('./fileService');

// ✅ Save single image
async function saveImage({ file, type, storage = 'cloudinary', folder, merchantId, menuItemId, paymentMethodOptionId, orderId }) {
  const url = await fileService.save(file, {
    folder,
    storage,
    toWebp: true,
  });

  return prisma.image.create({
    data: {
      url,
      type,
      storage,
      ...(merchantId && { merchantId }),
      ...(menuItemId && { menuItemId }),
      ...(paymentMethodOptionId && { paymentMethodOptionId }),
      ...(orderId && { orderId }),
    },
  });
}

// ✅ Save multiple gallery images
async function saveGallery(images = [], merchantId, storage = 'local', menuItemId) {
  const urls = await fileService.saveMultiple(images, {
    folder: 'merchant_gallery',
    storage,
    toWebp: true,
  });

  return prisma.image.createMany({
    data: urls.map(url => ({
      url,
      type: 'gallery',
      storage,
      merchantId,
      menuItemId
    })),
  });
}

// ✅ Delete all images by type (logo, cover, gallery)
async function deleteImagesByType(targetId, type, target = 'merchant') {
  const where = {
    type,
    ...(target === 'merchant'
      ? { merchantId: targetId }
      : { menuItemId: targetId }),
  };

  const oldImages = await prisma.image.findMany({ where });

  for (const image of oldImages) {
    await fileService.delete(image.url, image.storage);
    console.log('🗑️ Deleted old image:', image.url);
  }

  await prisma.image.deleteMany({ where });
}



// ✅ Delete a single image by its ID
async function deleteImageById(imageId) {
  const image = await prisma.image.findUnique({ where: { id: imageId } });
  if (!image) return;

  await fileService.delete(image.url, image.storage);
  await prisma.image.delete({ where: { id: imageId } });
}

// ✅ Delete ALL images belonging to a merchant
async function deleteImagesByMerchant(merchantId) {
  const images = await prisma.image.findMany({
    where: { merchantId }
  });

  for (const image of images) {
    await fileService.delete(image.url, image.storage);
  }

  await prisma.image.deleteMany({
    where: { merchantId }
  });
}
async function deleteImagesByTarget(targetId, targetType = 'menuItem', type) {
  await prisma.image.deleteMany({
    where: {
      type,
      ...(targetType === 'merchant'
        ? { merchantId: targetId }
        : { menuItemId: targetId }),
    },
  });
}

async function deleteAllImagesByMenuItem(menuItemId) {

  const oldImages = await prisma.image.findMany({ where: { menuItemId } });

  for (const image of oldImages) {
    await fileService.delete(image.url, image.storage);
    console.log('🗑️ Deleted old image:', image.url);
  }
  await prisma.image.deleteMany({
    where: { menuItemId },
  });


}

module.exports = {
  imageService: {
    saveImage,
    saveGallery,
    deleteImagesByType,
    deleteImageById,
    deleteImagesByMerchant,
    deleteImagesByTarget,
    deleteAllImagesByMenuItem
  },
};
