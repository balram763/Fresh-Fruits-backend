const express = require("express");
const {
  getDashboardStats,
  getRecentOrders,
  acceptOrder,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getSingleOrder,
} = require("../Controllers/adminController");
const { upload } = require("../uploads/cloudinary");
const adminProtect = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/dashboard", adminProtect, getDashboardStats);
router.get("/orders/recent", adminProtect, getRecentOrders);
router.get("/order/:orderId", adminProtect, getSingleOrder);
router.post("/orders/accept/:orderId", adminProtect, acceptOrder);
router.get("/products", adminProtect, getAllProducts);
router.delete("/products/:id", adminProtect, deleteProduct);
router.put("/products/:id", adminProtect, upload.single("img"), updateProduct);

module.exports = router;
