const { pos: prisma } = require('../../../models/client');

exports.registerOrLogin = async (req, res) => {
  const { phone, name } = req.body;

  let customer = await prisma.customer.findUnique({ where: { phone } });

  if (!customer) {
    customer = await prisma.customer.create({ data: { phone, name } });
  } else {
    customer = await prisma.customer.update({
      where: { phone },
      data: { lastLogin: new Date() },
    });
  }

  res.json(customer);
};

exports.getOrderHistory = async (req, res) => {
  const { customerId } = req.params;
  const orders = await prisma.order.findMany({
    where: { customerId },
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  });

  res.json(orders);
};
