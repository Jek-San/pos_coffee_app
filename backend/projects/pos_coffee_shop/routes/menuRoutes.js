// projects/pos_coffee_shop/routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const { createMenuItemSchema } = require("../zodSchemas/menuItem.schema");
const menuController = require('../controllers/menuController');
const uploadFields = require('../middleware/upload/universalUpload')


router.get('/ping', (req, res) => {
  res.json({ message: 'Menu Route is alive!' });
})
// Get all menu items for merchant
router.get('/merchant/:id', menuController.getAll);

// Get all menu items for merchant using slug
router.get('/merchant/slug/:slug', menuController.getAllBySlug);

// Get single menu item by ID
router.get('/:id', menuController.getById);

// Create new menu item
router.post('/', uploadFields([
  { name: 'gallery', maxCount: 5 },
  { name: 'thumbnail', maxCount: 1 }]), menuController.create);

// Update menu item
router.put('/:id', uploadFields([
  { name: 'gallery', maxCount: 5 },
  { name: 'thumbnail', maxCount: 1 }]), menuController.update);

// Delete menu item
router.patch('/delete/:id', menuController.remove);

// Disable menu item
router.patch('/availability', menuController.disableMenuItem);

module.exports = router;
