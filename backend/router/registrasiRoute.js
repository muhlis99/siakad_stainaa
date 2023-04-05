const express = require('express')
const router = express.Router()
const registrasiController = require('../controllers/registrasiController.js')
const { validationRegistrasi } = require('../validation/validationRegister.js')
const {validationRequest} = require('../validation/validationRequest.js') 

router.get('/all', registrasiController.get)
router.get('/getById/:id', registrasiController.getById)
router.post('/create',validationRegistrasi,validationRequest,registrasiController.post)
router.put('/update/:id',validationRegistrasi,validationRequest,registrasiController.put)
router.delete('/delete/:id', registrasiController.delete)

module.exports = router