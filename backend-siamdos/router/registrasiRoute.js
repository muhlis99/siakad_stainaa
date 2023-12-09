const express = require('express')
const router = express.Router()
const registrasiController = require('../controllers/registrasiController.js')
const { validationRegistrasi } = require('../validation/validationRegister.js')
const { validationRequest } = require('../validation/validationRequest.js')

router.get('/getById/:id', registrasiController.getById)
router.put('/update/:id', validationRegistrasi, validationRequest, registrasiController.put)

module.exports = router