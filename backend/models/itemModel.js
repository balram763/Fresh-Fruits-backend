const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    // id : {
    //     type : String,
    //     required : true
    // },
    img : {
        type : String,
    },
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    qty : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true
    }
})

const Item = mongoose.model("Item",itemSchema)

module.exports = Item