// projects/pos_coffee_shop/controllers/authController.js
const { pos: prisma } = require('../../../models/client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key'

exports.login = async (req, res) => {
  const { email, password } = req.body

  const admin = await prisma.adminUser.findUnique({
    where: { email },
    include: {
      merchants: {
        include: { merchant: true, stall: true }
      }
    }
  })

  if (!admin) return res.status(404).json({ message: 'Email not found' })

  const valid = await bcrypt.compare(password, admin.password)
  if (!valid) return res.status(401).json({ message: 'Wrong password' })

  const firstLink = admin.merchants[0]
  if (!firstLink) return res.status(403).json({ message: 'No merchant linked to this admin' })

  const token = jwt.sign(
    {
      id: admin.id,
      email: admin.email,
      merchantId: firstLink.merchant.id,
      role: firstLink.role,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
  // last Login on adminUser
  const updateLastLogin = await prisma.adminUser.update({
    where: {
      id: admin.id
    },
    data: {
      lastLogin: new Date()
    }
  })
  // updateLast login
  if (am.stall) {
    const updateLastLogin = await prisma.stall.update({
      where: {
        id: firstLink.stall.id
      },
      data: {
        lastLogin: new Date()
      }
    })
  }


  res.json({
    token,
    admin: {
      id: admin.id,
      email: admin.email,
      merchants: admin.merchants.map(am => ({
        merchantId: am.merchantId,
        merchantSlug: am.merchant.slug,
        merchantName: am.merchant.name,
        role: am.role,
        ...(am.stall
          ? {
            stallId: am.stall.id,
            stallName: am.stall.name,
            isOpen: am.stall.active === true
          }
          : {})
      }))
    },
    dataLogin: {

    }
  })
}


// 🔧 Generate unique slug
async function generateUniqueSlug(baseName, tx) {
  const baseSlug = baseName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '')
  let slug = baseSlug
  let counter = 1

  while (true) {
    const exists = await tx.merchant.findUnique({ where: { slug } })
    if (!exists) break
    slug = `${baseSlug}-${counter++}`
  }

  return slug
}

exports.signup = async (req, res) => {
  const { email, password, name } = req.body

  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Name, email, and password are required' })
  }

  const existingAdmin = await prisma.adminUser.findUnique({ where: { email } })
  if (existingAdmin) {
    return res.status(409).json({ message: 'Email already registered' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create AdminUser
      const admin = await tx.adminUser.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      })

      // 2. Generate unique slug
      const slug = await generateUniqueSlug(name, tx)

      // 3. Create Merchant
      const merchant = await tx.merchant.create({
        data: {
          name,
          slug,

        },
      })

      // 4. Link Admin to Merchant
      await tx.adminMerchant.create({
        data: {
          adminId: admin.id,
          merchantId: merchant.id,
          role: 'OWNER',
        },
      })

      return { admin, merchant }
    })

    // 5. Generate JWT
    const token = jwt.sign(
      {
        id: result.admin.id,
        email: result.admin.email,
        merchantId: result.merchant.id,
        role: 'OWNER',
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({
      token,
      admin: {
        id: result.admin.id,
        email: result.admin.email,
        name: result.admin.name,
        merchants: [
          {
            merchantId: result.merchant.id,
            merchantName: result.merchant.name,
            role: 'OWNER',
          },
        ],
      },
      merchant: result.merchant,
      role: 'OWNER',
    })
    console.log('Signup successful')

  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({ message: 'Failed to register', error })
  }
}

