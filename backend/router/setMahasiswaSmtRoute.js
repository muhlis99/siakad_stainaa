const express = require('express')
const router = express.Router()
const setMahasiswaSmtController = require('../controllers/setMahasiswaSmtController.js')
// const { validationsetMahasiswaSmt } = require('../validation/validationsetMahasiswaSmt.js')
// const { validationRequest } = require('../validation/validationRequest.js')

router.get('/all/:codeSmt/:codeJnjPen/:codeFks/:codePrd', setMahasiswaSmtController.getAll)
router.post('/create', setMahasiswaSmtController.post)
// router.get('/all', setMahasiswaSmtController.getAll)
// router.get('/getById/:id', setMahasiswaSmtController.getById)
// router.put('/update/:id', validationsetMahasiswaSmt, validationRequest, setMahasiswaSmtController.put)
// router.put('/delete/:id', setMahasiswaSmtController.delete)

module.exports = router