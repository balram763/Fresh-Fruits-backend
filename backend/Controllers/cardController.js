const Cart = require("../models/cartModel");

const updateCart = async (req, res) => {
    try {
        const { cart } = req.body;
        let userCart = await Cart.findOne({ user: req.user.id });

        if (!userCart) {
            userCart = new Cart({ user: req.user.id, cart: [] });
        }

        userCart.cart = cart;
        await userCart.save();

        res.status(200).json(userCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getCart = async (req, res) => {
    try {
        const userCart = await Cart.findOne({ user: req.user.id });
        res.status(200).json(userCart ? userCart.cart : []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { updateCart, getCart };
