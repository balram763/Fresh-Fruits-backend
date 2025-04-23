const expressAsyncHandler = require("express-async-handler")
const Order = require("../models/orderModel")
const Cart = require("../models/cartModel")

const placeOrder = expressAsyncHandler(async(req,res)=>{
    const userId = req.user._id

    const cartItems =  await Cart.findOne({user : userId})
    if(!cartItems.cart && cartItems.cart.length){
        return res.status(400).json({error : "cart is empty"})
    }

    if(!req.user?.address){
        return res.status(400).json({error : "Choose order address"})
    }

    const order = new Order({
        items : cartItems.cart,
        user : userId,
        status : "pending",
        address : req.user?.address
    })

    cartItems.cart = []
    await cartItems.save()

    if(!order){
        return res.status(400).json({error : "facing some technical issue"})
    }

    await order.save()
    res.status(200).json({message : "order placed success"})

})

const getOrder = expressAsyncHandler(async(req,res)=>{
    const userId = req.user._id
    const orders = await Order.find({user : userId}).sort({createdAt : -1})


    res.status(200).json(orders || [])
})

module.exports = {getOrder,placeOrder}