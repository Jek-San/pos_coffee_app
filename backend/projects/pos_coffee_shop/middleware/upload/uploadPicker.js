// uploadPicker.js
const localUpload = require("./localUpload");
const createCloudinaryUploader = require("./cloudinaryUpload");

const uploadPicker = (
  type = "local",         // "local" or "cloudinary"
  folder = "general",     // folder name for Cloudinary
  mode = "single",        // "single" or "array"
  field = "logo",         // form-data field name
  maxCount = 5            // max files for array
) => {
  return (req, res, next) => {
    req.storageType = type;

    const uploader =
      type === "cloudinary"
        ? createCloudinaryUploader(folder)
        : localUpload;

    if (mode === "array") {
      return uploader.array(field, maxCount)(req, res, next);
    }

    return uploader.single(field)(req, res, next); // default single
  };
};

module.exports = uploadPicker;
