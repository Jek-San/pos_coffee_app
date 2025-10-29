const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'public/temp/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

/**
 * Accept dynamic file fields
 * @param {Array} fields - array of { name: string, maxCount: number }
 */
const uploadFields = (fields = []) => {
  return upload.fields(fields);
};

module.exports = uploadFields;
