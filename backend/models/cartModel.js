const mongoose = require('mongoose')
const User = require('./userModel')

const cartSchema = new mongoose.Schema({
    cart : {
        type : Array,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
})

const Cart = mongoose.model('Cart',cartSchema)

module.exports = Cart;
