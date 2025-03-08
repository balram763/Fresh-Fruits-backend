const expressAsyncHandler = require('express-async-handler')
const JWT = require('jsonwebtoken')
const User = require('../models/userModel')

const adminProtect = exprssAsyncHandler(async(req,res)=>{
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1]
            const decode = JWT.verify(token,process.env.JWT_SECRET)
            const user = await User.findById(decode.id).select("-password")
            
    
            if(!user){
                res.status(400)
                throw new Error('INVALID USER')
            }
    
            if(user.isAdmin){
                req.user = user
                next()
            }
        }
        else{
            res.status(400)
            throw new Error('UNAUTHORISED ACCESS')
        }
    } catch (error) {
        res.status(400)
        throw new Error({Error : 'AUTHORISED ACCESS ' ,error})
    }
})

module.exports = adminProtect