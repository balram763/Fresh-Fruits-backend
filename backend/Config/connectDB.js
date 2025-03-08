const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`server is connected with ${conn.connection.host}`)
    } catch (error) {
        console.log(`Connect Failed : ${error}`)
    }
}

module.exports = connectDB