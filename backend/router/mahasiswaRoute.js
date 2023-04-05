const express = require('express')
const router = express.Router()
const mahasiswaController = require('../controllers/mahsiswaController.js')

router.get('/all', mahasiswaController.get)
router.get('/getById/:id', mahasiswaController.getById)
router.post('/createFirst', mahasiswaController.createFirst)

module.exports = router