const express = require('express')
const router = express.Router()
const registrasiController = require('../controllers/registrasiController.js')

router.get('/all', registrasiController.all)
router.get('/getById/:id', registrasiController.getById)
router.get('/post', registrasiController.post)

module.exports = router