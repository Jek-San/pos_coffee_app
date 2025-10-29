// pos_coffee_shop/services/merchantService.js
const { pos: prisma } = require("../../../models/client")


const { v2: cloudinary } = require("cloudinary");


exports.updateMerchantProfile = async (
  merchantId,
  { name, themeColor, paymentMethods, logoUrl, coverUrl, galleryUrls = [] }
) => {
  const dataToUpdate = {};
  if (name) dataToUpdate.name = name;
  if (themeColor) dataToUpdate.themeColor = themeColor;

  if (logoUrl) dataToUpdate.logoUrl = logoUrl;



  const dataToPaymentMethodOptions = {}
  if (paymentMethods) dataToUpdate.paymentMethods = JSON.parse(paymentMethods || "[]");


  const updatedMerchant = await prisma.merchant.update({
    where: { id: merchantId },
    data: dataToUpdate,
    include: {
      images: true,
    }
  });




  return updatedMerchant;
};

