// projects/portfolio/routes/authRoutes.js
const express = require('express');
const router = express.Router();

// ✅ Fix the relative import path
const { login } = require('../controllers/authController');

router.post('/login', login);

module.exports = router;
