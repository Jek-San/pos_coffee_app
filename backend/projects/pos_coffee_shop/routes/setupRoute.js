const express = require('express');
const router = express.Router();

const { getTablesByMerchant, createTable, deleteTable, createMultipleTables } = require('../controllers/tableController');

const menuController = require('../controllers/menuController');



router.get('/tables', getTablesByMerchant);
router.get('/menu-items', menuController.getAll);

router.post("/merchants/:id/tables", createTable)
router.post("/merchants/:id/tables/bulk", createMultipleTables);
router.delete("/merchants/:id/tables/:tableId", deleteTable)
router.get('/ping', (req, res) => {
  res.json({ message: 'POS Route is alive!' });
});

module.exports = router;
