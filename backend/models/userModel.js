const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },

    address : {
        type : String,
    },
    
    isAdmin : {
        type : Boolean,
        required : true,
        default : false
    },
    
},
    {
        timestamps : true
    }
)

const User = mongoose.model('User',userSchema)

module.exports = User