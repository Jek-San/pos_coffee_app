// projects/pos_coffee_shop/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const validate = require('../middleware/validate');
const { createOrderSchema } = require("../zodSchemas/orders.schema");
const uploadFields = require('../middleware/upload/universalUpload')

router.get('/ping', (req, res) => {
  res.json({ message: 'Order Route is alive!' });
});

router.post('/', validate(createOrderSchema), orderController.create);
router.get('/', orderController.getAllOrderByMerchant);
router.post("/multiple-get", orderController.getMultiple);
router.get('/:id', orderController.getById);
router.post('/:id/payment', orderController.updatePaymentStatus);
router.post('/:id/payment-proof', uploadFields([
  { name: 'paymentProof', maxCount: 1 }]), orderController.updatePaymentProof);


module.exports = router;
