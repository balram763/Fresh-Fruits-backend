const express = require("express");
const router = express.Router();
const { updateCart, getCart } = require("../Controllers/cardController");
const { protectAuthMiddleware } = require("../middleware/authMiddleware");

router.get("/", protectAuthMiddleware, getCart);
router.post("/update", protectAuthMiddleware, updateCart);

module.exports = router;
