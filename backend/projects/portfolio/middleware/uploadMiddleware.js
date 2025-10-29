const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');
const sharp = require('sharp');
const mime = require('mime-types');

// --- Helper: Delay utility
const wait = (ms) => new Promise((res) => setTimeout(res, ms));

// --- Helper: Convert to WebP with timeout + safe delete
const convertToWebP = async (filePath) => {
  const ext = path.extname(filePath);
  const dir = path.dirname(filePath);
  const base = path.basename(filePath, ext);
  const outputPath = path.join(dir, base + '.webp');

  try {
    // Race timeout (5s max processing)
    await Promise.race([
      sharp(filePath).webp({ quality: 80 }).toFile(outputPath),
      wait(5000).then(() => {
        throw new Error('Sharp timeout on image: ' + filePath);
      }),
    ]);

    // Delay 100ms to release file handles on Windows
    await wait(100);

    // Safe delete with access check
    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
    } catch (unlinkErr) {
      console.warn('Skip unlink, file may be missing or locked:', unlinkErr.code);
    }

    return outputPath;
  } catch (err) {
    console.error('❌ Error converting to WebP:', err);
    return filePath; // fallback to original
  }
};

// --- Validate MIME (only image/*)
const validateImage = (file) => {
  return file.mimetype && file.mimetype.startsWith('image/');
};

// --- Multer Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../../public/uploads');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const multerUpload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!validateImage(file)) {
      return cb(new Error('Only image uploads are allowed'), false);
    }
    cb(null, true);
  },
});

// --- Convert files and rename .filename/.path accordingly
const handleWebPConversion = async (req, res, next) => {
  const convertAndReplace = async (file) => {
    const newPath = await convertToWebP(file.path);
    file.filename = path.basename(newPath);
    file.path = newPath;
  };

  try {
    if (!req.file && (!req.files || Object.keys(req.files).length === 0)) {
      return res.status(400).json({ message: 'No file uploaded or upload failed' });
    }

    if (req.file) {
      await convertAndReplace(req.file);
    }

    if (req.files) {
      for (const key in req.files) {
        await Promise.all(req.files[key].map(convertAndReplace));
      }
    }

    next();
  } catch (err) {
    console.error('❌ Image processing failed:', err);
    res.status(500).json({ message: 'Image processing failed' });
  }
};

// --- Final Middleware Export
const uploadWithWebP = {
  single: (field) => [multerUpload.single(field), handleWebPConversion],
  fields: (fieldsArray) => [multerUpload.fields(fieldsArray), handleWebPConversion],
};

module.exports = uploadWithWebP;
