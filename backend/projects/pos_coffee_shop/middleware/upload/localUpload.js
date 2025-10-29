// projects/pos_coffee_shop/middleware/upload/localUpload.js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

module.exports = multer({ storage });
