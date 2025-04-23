const express = require("express")
const { protectAuthMiddleware } = require("../middleware/authMiddleware")
const { placeOrder, getOrder } = require("../Controllers/orderCotroller")

const router = express.Router()


router.post("/",protectAuthMiddleware,placeOrder)
router.get("/",protectAuthMiddleware,getOrder)

module.exports = router