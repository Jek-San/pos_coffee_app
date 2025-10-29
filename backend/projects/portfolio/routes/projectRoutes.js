// projects/portfolio/routes/projectRoutes.js
const express = require('express');
const router = express.Router();

// ✅ Adjust path to local prisma client
const { portfolio: prisma } = require('../../../models/client');


// ✅ Corrected controller imports (relative to `routes/`)
const {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

const { trackProjectView } = require('../controllers/viewController');

// ✅ Correct middleware imports
const { authenticate } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// 🚀 Upload standalone image (optional use)
router.post('/upload', authenticate, upload.single('image'), async (req, res) => {
  const sharp = require('sharp');
  const fs = require('fs');
  const path = require('path');

  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const extName = path.parse(req.file.originalname).name;
  const webpName = extName + '-' + Date.now() + '.webp';
  const outputPath = path.join(__dirname, '../../../public/uploads', webpName); // ⬅ adjust this line too!

  await sharp(req.file.path).webp({ quality: 70 }).toFile(outputPath);
  fs.unlinkSync(req.file.path); // delete temp

  const imageUrl = `/uploads/${webpName}`;
  res.json({ imageUrl });
});

// 🧠 Project CRUD
router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);

// ✅ Accepts cover + gallery files with compression
router.post(
  '/',
  authenticate,
  upload.fields([
    { name: 'cover', maxCount: 1 },
    { name: 'gallery', maxCount: 10 },
  ]),
  createProject
);

router.put(
  '/:slug',
  authenticate,
  upload.fields([
    { name: 'cover', maxCount: 1 },
    { name: 'gallery', maxCount: 10 },
  ]),
  updateProject
);

router.delete('/:id', authenticate, deleteProject);

router.get('/check-slug/:slug', async (req, res) => {
  const { slug } = req.params;
  const existing = await prisma.project.findUnique({ where: { slug } });
  res.json({ available: !existing });
});

module.exports = router;
