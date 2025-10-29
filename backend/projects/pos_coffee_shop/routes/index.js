// projects/pos_coffee_shop/routes/index.js
const express = require('express');
const router = express.Router();

// Endpoint test awal
// router.get('/ping', (req, res) => {
//   res.json({ message: 'POS Coffee Shop API is alive!' });
// });


// Semua route POS
router.use('/merchants', require('./merchantRoutes'));
router.use('/menus', require('./menuRoutes'));
router.use('/orders', require('./orderRoutes'));
router.use('/customers', require('./customerRoutes'));
router.use('/chat', require('./chatRoutes'));
router.use('/', require('./authRoutes')) // 🔥 atau bisa /auth
router.use('/pos-setup', require('./setupRoute'));
router.use('/tables', require('./tableRoutes'));
router.use('/subcategories', require('./subCategoryRoutes'));

// Route POS / Features / Init Menu
router.use('/init-menu', require('../features/initMenu/initMenu.route'));

// Route POS / Features / Payment Method
router.use('/payment-method', require('../features/paymentMethod/paymentMethod.route'));

// Route POS / Features / Stalls
router.use('/stalls', require('../features/stalls/stalls.route'));

module.exports = router;
