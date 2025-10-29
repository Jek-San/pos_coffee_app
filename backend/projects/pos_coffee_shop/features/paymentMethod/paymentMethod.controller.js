// projects/pos_coffee_shop/features/paymentMethod/paymentMethod.controller.js
const paymentMethodService = require("./paymentMethod.service");

exports.createPaymentMethod = async (req, res) => {
  try {
    const rawOptions = JSON.parse(req.body.paymentMethodOptions);
    const files = req.files;

    // Align files into each option
    const optionsWithImage = rawOptions.map((option, index) => {
      const qrKey = `qr_${index}`;
      const qrImage = files?.[qrKey]?.[0] ?? null;

      return {
        ...option,
        qrImage,
      };
    });
    console.log(optionsWithImage);
    const result = await paymentMethodService.createPaymentMethod(req.params.merchantId, optionsWithImage);
    res.status(201).json(result);
  } catch (err) {
    console.error("Create Payment Method Error:", err);
    res.status(500).json({ error: "Failed to create payment method" });
  }
};

exports.updatePaymentMethod = async (req, res) => {
  try {
    const rawOptions = JSON.parse(req.body.paymentMethodOptions);
    const files = req.files;

    // Align files into each option
    const optionsWithImage = rawOptions.map((option, index) => {
      const qrKey = `qr_${index}`;
      const qrImage = files?.[qrKey]?.[0] ?? null;

      return {
        ...option,
        qrImage,
      };
    });
    console.log(optionsWithImage);
    const result = await paymentMethodService.updatePaymentMethod(req.params.merchantId, optionsWithImage);
    res.status(201).json(result);
  } catch (err) {
    console.error("Create Payment Method Error:", err);
    res.status(500).json({ error: "Failed to create payment method" });
  }
};


exports.getPaymentMethods = async (req, res) => {
  try {
    const result = await paymentMethodService.getPaymentMethods(req.params.merchantId);
    res.status(200).json(result);
  } catch (err) {
    console.error("Get Payment Methods Error:", err);
    res.status(500).json({ error: "Failed to get payment methods" });
  }
};

exports.deletePaymentMethod = async (req, res) => {
  try {
    await paymentMethodService.deletePaymentMethod(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error("Delete Payment Method Error:", err);
    res.status(500).json({ error: "Failed to delete payment method" });
  }
};