const express = require('express')
const connectDB = require('./Config/connectDB')
require('dotenv').config()
const cors = require('cors')
const path = require("path");
const helmet = require("helmet")

const app = express()
const PORT = process.env.PORT || 5000

// Database Connection
connectDB()

// Bodyparser
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use(helmet())
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
app.use('/api/orders',require("./routes/orderRoutes"))
app.use('/api/admin', require('./routes/adminRoute'));

app.listen(PORT,()=>{
    console.log(`SERVER RUNNING AT PORT ${PORT}`)
})
