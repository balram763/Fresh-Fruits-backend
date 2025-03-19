const express = require('express')
const connectDB = require('./Config/connectDB')
require('dotenv').config()
const cors = require('cors')
const path = require("path");


const app = express()
const PORT = process.env.PORT || 5000

// Database Connection
connectDB()

// Bodyparser
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors());

app.use(cors({

    origin: '*',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true  

}));

app.get('/',(req,res)=>{
    res.json("I'm WORKING")
})

app.use('/api/user',require("./routes/userRoute"))
app.use('/api/item',require("./routes/itemRoute"))
app.use('/api/cart',require("./routes/cartRoutes"))


// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT,()=>{
    console.log(`SERVER RUNNING AT PORT ${PORT}`)
})
