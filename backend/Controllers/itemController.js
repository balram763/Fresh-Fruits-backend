const expressAsyncHandler = require("express-async-handler")
const Item = require("../models/itemModel")
const { cloudinary,upload } = require("../uploads/cloudinary")



const getItem = expressAsyncHandler(async(req,res) => {
    try{
        const Items = await Item.find()
    res.status(200).json(Items)
    }
    catch(error){
        res.status(400).json('FAILED TO GET')
    }
})

const getNewItem = expressAsyncHandler(async(req,res) => {
    try{
        const lastFiveDays = Date.now() - (5*24*60*60*1000)
        
        // const Items = await Item.find().skip(25).limit(5)
        const Items = await Item.find({ createdAt : { $gte : lastFiveDays}})
        res.status(200).json(Items)
    }
    catch(error){
        res.status(400).json('FAILED TO GET')
    }
})


    




const addItem = async (req, res) => {
  try {
    const { name, price, description, qty, category } = req.body;
    console.log("Uploaded File:", JSON.stringify(req.file, null, 2));
    
    
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }
    const imgUrl = req.file.path;

    if (!name || !price || !description || !qty || !category) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const newItem = await Item.create({
      img : imgUrl,
      name,
      price,
      description,
      qty,
      category,
    });

    res.status(201).json(newItem);
    // console.log(newItem)
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};





const getbyId = expressAsyncHandler(async(req,res)=>{
    const { id } = req.params;
    // console.log(id)

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

module.exports = {getItem,addItem,getbyId,getNewItem}