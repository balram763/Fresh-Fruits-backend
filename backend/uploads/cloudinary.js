// // const multer = require("multer");
// // const path = require("path");


// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         cb(null, "backend/uploads/");
// //     },
// //     filename: (req, file, cb) => {
// //         cb(null, Date.now() + "-" + file.originalname);
// //     },
// // });



// // const fileFilter = (req, file, cb) => {
// //     if (file.mimetype.startsWith("image/")) {
// //         cb(null, true);
// //     } else {
// //         cb(new Error("Only image files are allowed!"), false);
// //     }
// // };

// // const upload = multer({ storage, fileFilter });

// // module.exports = upload;

// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const multer = require("multer");
// require("dotenv").config();

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
    
// });


// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: async (req, file) => ({
//       folder: "uploads",
//       format: file.mimetype.split("/")[1],
//       public_id: Date.now() + "-" + file.originalname,
//     }),
//   });

// const upload = multer({ storage });


// module.exports = { cloudinary, upload };


const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: "uploads",
            format: file.mimetype.split("/")[1],
            public_id: Date.now() + "-" + file.originalname,
            context: { description: file.originalname }
        };
    },
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };
