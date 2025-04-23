const express = require('express')
const { login, register, privateController, addressUpdate, getAddress } = require('../Controllers/userControllers')
const { protectAuthMiddleware } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/login',login)
router.post('/register',register)
router.get('/private',protectAuthMiddleware,privateController)
router.post('/address',protectAuthMiddleware,addressUpdate)
router.get('/address',protectAuthMiddleware,getAddress)

module.exports = router