const expressAsyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const protectAuthMiddleware = expressAsyncHandler(async(req,res,next)=>{
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(" ")[1]
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            const user = await User.findById(decode.id).select("-password")
            
            if(!user){
                res.status(400).json({message : 'INVALID USER'})
            }
            req.user = user
    
            next()
        }
    
        else{
            res.status(400)
                throw new Error("No token Found , Unauthorised access")
        }
    } catch (error) {
        res.status(400)
        throw new Error({message : 'NO TOKEN  FOUND , UNAUTHORISED ACCESS', error})
    }

})

module.exports = {protectAuthMiddleware}