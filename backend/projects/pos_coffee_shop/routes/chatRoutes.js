const express = require('express');
const router = express.Router();
const { postMessage, getMessages } = require('../controllers/chatController');

router.post('/:orderId', postMessage);
router.get('/:orderId', getMessages);

module.exports = router;
