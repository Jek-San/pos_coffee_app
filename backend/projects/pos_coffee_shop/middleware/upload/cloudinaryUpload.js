// projects/pos_coffee_shop/middleware/upload/cloudinaryUpload.js
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 👇 function to return multer with custom folder
const createCloudinaryUploader = (folder = "general") => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder,
      allowed_formats: ["jpg", "png", "webp"],
    },
  });

  return multer({ storage });
};

module.exports = createCloudinaryUploader;
