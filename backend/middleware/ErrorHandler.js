const {stack} = require('../routes/userRoute')

const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode < 400 ? 500 : res.statusCode

    res.json({
        error : err.message,
        stack : process.env.NODE_ENV == 'PRODUCTION' ? null : err.stack
    })
}




module.exports = errorHandler