// projects/pos_coffee_shop/features/paymentMethod/paymentMethod.route.js
const express = require("express");
const router = express.Router();
const paymentMethodController = require("./paymentMethod.controller");
const uploadFields = require("../../middleware/upload/universalUpload");

router.get("/ping", (req, res) => {
  res.json({ message: "Payment Method Route OK" });
})
router.post(
  "/:merchantId",
  uploadFields([
    { name: 'qr_1', maxCount: 1 },
    { name: 'qr_2', maxCount: 1 },
    { name: 'qr_3', maxCount: 1 },
    { name: 'qr_4', maxCount: 1 },
    { name: 'qr_5', maxCount: 1 },
  ]),
  paymentMethodController.createPaymentMethod
);
router.patch(
  "/:merchantId",
  uploadFields([
    { name: 'qr_1', maxCount: 1 },
    { name: 'qr_2', maxCount: 1 },
    { name: 'qr_3', maxCount: 1 },
    { name: 'qr_4', maxCount: 1 },
    { name: 'qr_5', maxCount: 1 },
  ]),
  paymentMethodController.updatePaymentMethod
);

router.get("/:merchantId", paymentMethodController.getPaymentMethods);
router.delete("/:id", paymentMethodController.deletePaymentMethod);

module.exports = router;