const mongoose = require("mongoose")
const User = require("./userModel")
const orderSchema = new mongoose.Schema({
    items : {
        type : Array,
        required : true
    },
    status : {
        type : String
    },
    address : {
        type : String
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
},{
    timestamps : true
})

module.exports = mongoose.model("Order",orderSchema)