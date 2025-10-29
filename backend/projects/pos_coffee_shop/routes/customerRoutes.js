const express = require('express');
const router = express.Router();
const { registerOrLogin, getOrderHistory } = require('../controllers/customerController');

router.post('/login', registerOrLogin);
router.get('/:customerId/orders', getOrderHistory);

module.exports = router;
