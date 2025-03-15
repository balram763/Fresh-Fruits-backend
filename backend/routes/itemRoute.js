const express = require('express')
const { getItem, addItem, getbyId, getNewItem } = require('../Controllers/itemController')
const upload = require('../uploads/multerConfig')

const router = express.Router()

router.get('/',getItem)
router.get('/new',getNewItem)
router.post("/add", upload.single("img"), addItem);
// router.post('/add',addItem)
router.get('/:id',getbyId)



module.exports = router 