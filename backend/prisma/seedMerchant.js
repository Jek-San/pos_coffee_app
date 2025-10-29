const { pos: prisma } = require('../models/client');
const bcrypt = require('bcrypt')



async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const merchant = await prisma.merchant.upsert({
    where: { email: 'admin@coffee.com' },
    update: {},
    create: {
      name: 'Coffee Admin',
      slug: 'coffee-admin',
      email: 'admin@coffee.com',
      password: hashedPassword,
      qrUrl: 'https://example.com/qr',
      themeColor: '#6B4226',
    },
  })

  console.log('✅ Seeded merchant:', merchant.email)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
