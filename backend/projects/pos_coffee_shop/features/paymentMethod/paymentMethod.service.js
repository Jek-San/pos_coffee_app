// projects/pos_coffee_shop/features/paymentMethod/paymentMethod.service.js
const { pos: prisma } = require("../../../../models/client");
const { imageService } = require("../../services/imageService");

exports.createPaymentMethod = async (merchantId, paymentMethodOptions) => {
  const result = [];

  for (const option of paymentMethodOptions) {
    const { qrImage, name, type, accountNumber, accountName } = option;

    // 1. Create PaymentMethodOption
    const createdOption = await prisma.paymentMethodOption.create({
      data: {
        merchantId,
        name: name || (type === 'CASH' ? 'CASH Payment' : 'Unnamed'), // fallback,
        type,
        accountName: accountName,
        accountNumber,

      },
    });
    console.log("createdOption", createdOption);

    // 2. Upload image if provided
    if (qrImage) {
      await imageService.saveImage({
        file: qrImage,
        type: 'qrImage',
        folder: 'qrImage',
        storage: 'cloudinary',
        paymentMethodOptionId: createdOption.id,
      });
    }

    result.push(createdOption);
  }

  return result;
};

exports.updatePaymentMethod = async (merchantId, paymentMethodOptions) => {
  const result = [];
  const existingOptions = await prisma.paymentMethodOption.findMany({
    where: { merchantId },
    include: { images: true },
  });
  console.log("existingOptions", existingOptions);
  console.log("paymentMethodOptions", paymentMethodOptions);

  // DELETE options not in new list
  const toDelete = existingOptions.filter(
    (option) => !paymentMethodOptions.some((newOption) => newOption.id === option.id)
  );

  for (const option of toDelete) {
    // Delete associated images if needed
    if (option.images && option.images.length > 0) {
      for (const image of option.images) {
        await imageService.deleteImageById(image.id);
      }
    }

    await prisma.paymentMethodOption.delete({
      where: { id: option.id },
    });
  }

  for (const option of paymentMethodOptions) {
    const { id, qrImage, name, type, accountNumber, accountName } = option;

    if (id && existingOptions.some((eo) => eo.id === id)) {
      // UPDATE
      const updatedOption = await prisma.paymentMethodOption.update({
        where: { id },
        data: {
          name: name || (type === 'CASH' ? 'CASH Payment' : 'Unnamed'),
          type,
          accountNumber,
          accountName,
        },
      });

      // Check if image exists and needs to be replaced
      const existing = existingOptions.find((eo) => eo.id === id);
      const existingImage = existing.images?.[0];

      if (qrImage) {
        // If new image provided
        if (existingImage) {
          await imageService.deleteImageById(existingImage.id);
        }

        await imageService.saveImage({
          file: qrImage,
          type: 'qrImage',
          folder: 'qrImage',
          storage: 'cloudinary',
          paymentMethodOptionId: id,
        });
      }

      result.push(updatedOption);
    } else {
      // CREATE
      const createdOption = await prisma.paymentMethodOption.create({
        data: {
          merchantId,
          name: name || (type === 'CASH' ? 'CASH Payment' : 'Unnamed'),
          type,
          accountNumber,
          accountName,
        },
      });

      if (qrImage) {
        await imageService.saveImage({
          file: qrImage,
          type: 'qrImage',
          folder: 'qrImage',
          storage: 'cloudinary',
          paymentMethodOptionId: createdOption.id,
        });
      }

      result.push(createdOption);
    }
  }

  return result;
};


exports.getPaymentMethods = async (merchantId) => {
  return prisma.paymentMethodOption.findMany({
    where: { merchantId },
    include: { images: true },
  });
};

exports.deletePaymentMethod = async (id) => {
  // Cleanup related images first
  await imageService.deleteImagesByType({ type: "qrpayment", paymentMethodId: id });

  return prisma.paymentMethodOption.delete({
    where: { id },
  });
};  