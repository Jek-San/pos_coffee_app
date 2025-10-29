// projects/pos_coffee_shop/routes/merchantRoutes.js
const express = require('express');
const router = express.Router();
const merchantController = require('../controllers/merchantController')
const uploadPicker = require('../middleware/upload/uploadPicker')
// const convertToWebp = require('../middleware/upload/localToWebp')
const uploadFields = require('../middleware/upload/universalUpload')


router.get('/ping', (req, res) => {
  res.json({ message: 'Merchant Route is alive!' });
})
router.get('/', merchantController.getMerchants);
router.get('/id/:id', merchantController.getMerchantById)
router.get('/:slug', merchantController.getMerchantBySlug);

// Universal upload, accepts logo + cover + gallery
router.put(
  '/:id',
  uploadFields([
    { name: 'logo', maxCount: 1 },
    { name: 'cover', maxCount: 1 },
    { name: 'gallery', maxCount: 10 },
    { name: 'qrPayment', maxCount: 1 },
  ]),
  merchantController.updateMerchant
);


// multiple uploads
// router.put(
//   "/:id/gallery",
//   uploadPicker("local", "merchant_gallery", "array", "images", 10),
//   merchantController.uploadGallery
// );




module.exports = router;
