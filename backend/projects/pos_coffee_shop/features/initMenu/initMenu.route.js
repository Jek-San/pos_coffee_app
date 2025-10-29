const express = require('express');
const { getInitMenu, getInitMenuOwner, getInitMenuStall } = require('./initMenu.controller');

const router = express.Router();
router.get('/ping', (req, res) => res.json({ message: 'Init Menu Route OK' }));

router.get('/:merchantSlug/:tableId', getInitMenu);
router.get('/:merchantSlug', getInitMenuOwner);
router.get("/getMenuStall/:stallId", getInitMenuStall);

module.exports = router;
