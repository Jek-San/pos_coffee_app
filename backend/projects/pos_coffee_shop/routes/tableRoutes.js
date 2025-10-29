
const express = require('express');
const router = express.Router();
const { getTablesByMerchant, createTable, deleteTable, createMultipleTables } = require('../controllers/tableController');
router.get('/ping', (req, res) => {
  res.json({ message: 'Table Route is alive!' });
});
router.get('/:id', getTablesByMerchant);
router.post("/merchants/:id/tables", createTable)

router.delete("/merchants/:id/tables/:tableId", deleteTable)

module.exports = router;