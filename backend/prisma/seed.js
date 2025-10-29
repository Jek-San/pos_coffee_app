// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create Merchant
  const merchant = await prisma.merchant.create({
    data: {
      name: 'Coffee Jungle',
      slug: 'coffee-jungle',
      qrUrl: 'https://qris.example.com/coffee-jungle',
      logoUrl: '/uploads/logo.webp',
      themeColor: '#6B4226',
    },
  });

  // Create Menu Items
  const menuItems = await prisma.menuItem.createMany({
    data: [
      {
        name: 'Americano',
        price: 25000,
        imageUrl: '/uploads/americano.webp',
        description: 'Classic black coffee',
        category: 'Coffee',
        merchantId: merchant.id,
      },
      {
        name: 'Latte',
        price: 30000,
        imageUrl: '/uploads/latte.webp',
        description: 'Milk with espresso',
        category: 'Coffee',
        merchantId: merchant.id,
      },
      {
        name: 'Croissant',
        price: 18000,
        imageUrl: '/uploads/croissant.webp',
        description: 'Buttery pastry',
        category: 'Food',
        merchantId: merchant.id,
      },
    ],
  });

  // Create Customer
  const customer = await prisma.customer.create({
    data: {
      phone: '08123456789',
      name: 'John Doe',
      points: 20,
    },
  });

  // Create Order
  const items = await prisma.menuItem.findMany({ where: { merchantId: merchant.id } });
  const order = await prisma.order.create({
    data: {
      merchantId: merchant.id,
      customerId: customer.id,
      customerName: customer.name,
      status: 'CONFIRMED',
      totalAmount: items[0].price + items[1].price,
      paymentMethod: 'QRIS',
      paid: true,
      items: {
        create: [
          {
            menuItemId: items[0].id,
            quantity: 1,
            price: items[0].price,
          },
          {
            menuItemId: items[1].id,
            quantity: 1,
            price: items[1].price,
          },
        ],
      },
    },
  });

  // Create Chat Messages
  await prisma.chatMessage.createMany({
    data: [
      {
        orderId: order.id,
        sender: 'CUSTOMER',
        content: 'Hi, can I add sugar to the latte?',
      },
      {
        orderId: order.id,
        sender: 'CASHIER',
        content: 'Sure! Noted.',
      },
    ],
  });

  console.log('✅ Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
