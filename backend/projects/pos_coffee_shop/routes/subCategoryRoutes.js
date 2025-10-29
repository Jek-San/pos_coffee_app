const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/subCategoryController');

// Ping
router.get('/ping', (req, res) => res.json({ message: 'SubCategory Route OK' }));

// 🔍 Get all subcategories by merchant
router.get('/:merchantId', subCategoryController.getAllByMerchant);

// 🔍 Get by merchantId + category (optional for dropdown filter)
router.get('/:merchantId/:category', subCategoryController.getByMerchantAndCategory);

// ➕ Create new subcategory
router.post('/', subCategoryController.create);

// ✏️ Update
router.put('/:id', subCategoryController.update);

// 🗑️ Delete
router.delete('/:id', subCategoryController.remove);

module.exports = router;
