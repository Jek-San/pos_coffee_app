// projects/portfolio/routes/index.js
const express = require('express');
const router = express.Router();

router.use('/auth', require('./authRoutes'));
router.use('/projects', require('./projectRoutes'));
router.use('/views', require('./viewRoutes'));

module.exports = router;
