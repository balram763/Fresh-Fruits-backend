const expressAsyncHandler = require("express-async-handler")
const Item = require("../models/itemModel")

const getItem = expressAsyncHandler(async(req,res) => {
    try{
        const Items = await Item.find()
    res.status(200).json(Items)
    }
    catch(error){
        res.status(400).json('FAILED TO GET')
    }
})

const addItem = expressAsyncHandler(async(req,res)=>{
    const {img,name,price,description,qty,category,id} = req.body

    try{
        if(!img || !name || !price || !description || !qty || !category){
            return res.status(400).json('please FILL ALL DETAILS')
        }
    
        const items = await Item.create({
            img,name,price,description,qty,category
        })
    
        if(!items){
            return res.status(400).json('UNABLE TO CREATE SERVER ERROR')
        }
    
        res.status(200).json(items)
    }
    catch(error){
        res.status(400).json('NO')
    }
})

const getbyId = expressAsyncHandler(async(req,res)=>{
    const { id } = req.params;
    console.log(id)

   try{
    const Items = await Item.findById(id)
   if(!Items){
    return res.status(404).json("NOT FOUND")
   }

   res.status(200).json(Items)
   }
   catch(error){
    res.status(400).json({ERROR : `NOT FOUND : ${error}`})
   }
})

module.exports = {getItem,addItem,getbyId}