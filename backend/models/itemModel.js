const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
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
},
    {
        timestamps : true
    }
)

const Item = mongoose.model("Item",itemSchema)

module.exports = Item