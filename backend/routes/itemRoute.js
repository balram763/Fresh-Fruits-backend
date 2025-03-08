const express = require('express')
const { getItem, addItem, getbyId } = require('../Controllers/itemController')

const router = express.Router()

router.get('/',getItem)
router.post('/add',addItem)
router.get('/:id',getbyId)



module.exports = router 