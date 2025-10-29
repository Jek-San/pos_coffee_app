const { pos: prisma } = require('../../../models/client');

exports.postMessage = async (req, res) => {
  const { orderId } = req.params;
  const { sender, content, type } = req.body;

  const message = await prisma.chatMessage.create({
    data: {
      orderId,
      sender,
      content,
      type,
    },
  });

  res.status(201).json(message);
};

exports.getMessages = async (req, res) => {
  const { orderId } = req.params;
  const messages = await prisma.chatMessage.findMany({
    where: { orderId },
    orderBy: { timestamp: 'asc' },
  });

  res.json(messages);
};
