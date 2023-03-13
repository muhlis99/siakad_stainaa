const express = require('express')
const router = express.Router()
const registrasiController = require('../controllers/registrasiController.js')

router.get('/all', registrasiController.all)

module.exports = router