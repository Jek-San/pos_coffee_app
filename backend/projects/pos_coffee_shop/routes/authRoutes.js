// projects/pos_coffee_shop/routes/authRoutes.js
const express = require('express')
const router = express.Router()
const { login, signup } = require('../controllers/authController')
router.get('/ping', (req, res) => {
  res.json({ message: 'Auth Route is alive!' })
})
router.post('/login', login)
router.post('/signup', signup)
module.exports = router
