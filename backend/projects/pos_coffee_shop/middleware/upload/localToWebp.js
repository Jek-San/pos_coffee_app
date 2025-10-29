const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

module.exports = async (req, res, next) => {
  if (!req.file) return next();

  const filePath = req.file.path; // original file path
  const webpFilePath = filePath.replace(path.extname(filePath), ".webp");

  try {
    await sharp(filePath)
      .webp({ quality: 80 }) // compress + convert
      .toFile(webpFilePath);

    fs.unlinkSync(filePath); // delete original file

    // overwrite the multer file object
    req.file.filename = path.basename(webpFilePath);
    req.file.path = webpFilePath;
    req.file.mimetype = "image/webp";

    next();
  } catch (error) {
    console.error("Error converting to WebP:", error);
    next(error);
  }
};
