const express = require('express')
const router = express.Router()
const mahasiswaController = require('../controllers/mahsiswaController.js')
const { validationForm1 } = require('../validation/validationMahasiswa.js')
const { validationRequest } = require('../validation/validationRequest.js')

router.get('/all', mahasiswaController.get)
router.get('/getById/:id', mahasiswaController.getById)
router.post('/createFirst', mahasiswaController.createFirst)
router.put('/createForm1/:id', validationForm1, validationRequest, mahasiswaController.createForm1)

module.exports = router