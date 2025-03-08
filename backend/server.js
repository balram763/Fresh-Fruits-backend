const express = require('express')
const connectDB = require('./Config/connectDB')
require('dotenv').config()
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 5000

// Database Connection
connectDB()

// Bodyparser
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors());

app.use(cors({
    origin: 'http://localhost:5174',  // Allow frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true  // Allow cookies/auth headers
}));

app.get('/',(req,res)=>{
    res.json("I'm WORKING")
})
app.use('/api/user',require("./routes/userRoute"))
app.use('/api/item',require("./routes/itemRoute"))

app.listen(PORT,()=>{
    console.log(`SERVER RUNNING AT PORT ${PORT}`)
})