const orderService = require('../services/orderService');

exports.getAllOrderByMerchant = async (req, res) => {
  try {
    const { merchantSlug } = req.query;
    const orders = await orderService.getAllOrderByMerchant(merchantSlug);
    return res.status(200).json(orders);
  } catch (error) {
    console.error('[OrderController][GetAllOrderByMerchant]', {
      message: error.message,
      stack: error.stack,
      query: req.query, // Optional: helpful for debugging
    });
    return res.status(500).json({
      success: false,
      message: 'Failed to get orders',
    })
  }
};
exports.create = async (req, res) => {
  try {
    const {
      merchantSlug,
      tableId,
      customerName = '',
      customerPhone = '',
      specialInstructions = '',
      total,
      items = []
    } = req.body;

    const data = {
      merchantSlug,
      tableId,
      customerName,
      customerPhone,
      specialInstructions,
      total,
      items
    };

    // Optional: Logging input during development
    if (process.env.NODE_ENV !== 'production') {
      console.log('[CreateOrder] Request:', JSON.stringify(data, null, 2));
    }

    const order = await orderService.create(data);

    return res.status(201).json({
      success: true,
      orderId: order.id,
      message: 'Order created successfully',
    });

  } catch (error) {
    console.error('[OrderController][Create]', {
      message: error.message,
      stack: error.stack,
      body: req.body, // Optional: helpful for debugging
    });

    return res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const order = await orderService.getById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    console.error('[OrderController]', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getMultiple = async (req, res) => {
  try {
    const orders = req.body
    console.log(orders.ids)
    const ordersResult = await orderService.getMultiple(orders)
    if (!ordersResult) return res.status(404).json({ message: 'Orders not found' });
    res.json(ordersResult);
  } catch (error) {
    console.error('[OrderController]', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.updatePaymentStatus = async (req, res) => {
  try {

    const { status, paid, paymentMethod, paymentMethodId, whatsappNumber } = req.body;
    const orderData = {
      status,
      paymentMethodId,
      paymentMethod,
      whatsappNumber: whatsappNumber ? whatsappNumber : null,
      paid
    }
    console.log("IN UPDATE PAYMENT", req.params.id, orderData);
    const updated = await orderService.updatePaymentStatus(req.params.id, orderData);
    res.json(updated);
  } catch (error) {
    console.error('[OrderController]', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.updatePaymentProof = async (req, res) => {
  try {

    const { orderId, paid } = req.body;
    const image = req.files?.paymentProof?.[0];

    const orderData = {
      orderId,
      paymentProof: image,
      paid
    }
    console.log("IN UPDATE PAYMENT PROOF Controller", req.params.id, orderData);
    const updated = await orderService.updatePaymentProof(req.params.id, orderData);
    res.json(updated);
  } catch (error) {
    console.error('[OrderController]', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.updatePaymentStatus = async (req, res) => {
  try {

    const { status, paid, paymentMethod, paymentMethodId, whatsappNumber } = req.body;
    const orderData = {
      status,
      paymentMethodId,
      paymentMethod,
      whatsappNumber: whatsappNumber ? whatsappNumber : null,
      paid
    }
    console.log("IN UPDATE PAYMENT", req.params.id, orderData);
    const updated = await orderService.updatePaymentStatus(req.params.id, orderData);
    res.json(updated);
  } catch (error) {
    console.error('[OrderController]', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
