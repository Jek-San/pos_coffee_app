const jwt = require("jsonwebtoken")
const { pos: prisma } = require("../../models/client")

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key"

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const token = authHeader.split(" ")[1]

  try {
    const payload = jwt.verify(token, JWT_SECRET)

    const admin = await prisma.adminUser.findUnique({
      where: { id: payload.id },
      include: {
        merchants: true,
      },
    })

    if (!admin) {
      return res.status(401).json({ message: "Admin not found" })
    }

    // Validate if the admin is connected to the requested merchant
    const { merchantId } = req.params.merchantId ? req.params : req.query
    if (!merchantId) {
      return res.status(400).json({ message: "merchantId is required" })
    }

    const isLinked = admin.merchants.some((m) => m.merchantId === merchantId)
    if (!isLinked) {
      return res.status(403).json({ message: "Access denied to this merchant" })
    }

    req.admin = admin
    req.merchantId = merchantId
    next()
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}
