const Order = require("../models/orderModel");
const Item = require("../models/itemModel");
const User = require("../models/userModel");

// Get dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.find({}).countDocuments();
    const customers = await User.countDocuments({ isAdmin: false });
    const inventory = await Item.countDocuments();

    res.status(200).json({
      totalOrders,
      customers,
      inventory,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get recent orders
const getRecentOrders = async (req, res) => {
  try {
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("user", "email");
    res.status(200).json(recentOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Accept an order
const acceptOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: "accepted" },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Item.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Item.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      qty: req.body.qty,
      category: req.body.category,
      bestSeller: req.body.bestSeller ,
    };

    if (req.file) {
      updatedFields.img = req.file.path;
    }

    const updatedProduct = await Item.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


const getSingleOrder = async(req,res) => {
  const { orderId } = req.params;
  console.log(orderId)
  const order = await Order.findById(orderId)
  res.status(200).json(order)
}

module.exports = {
  getDashboardStats,
  getRecentOrders,
  acceptOrder,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getSingleOrder
};
