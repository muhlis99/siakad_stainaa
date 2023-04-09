const express = require('express')
const router = express.Router()
const mahasiswaController = require('../controllers/mahsiswaController.js')
const { validationForm1, validationForm2, validationForm3, validationForm4, validationCreateFile } = require('../validation/validationMahasiswa.js')
const { validationRequest } = require('../validation/validationRequest.js')

router.get('/all', mahasiswaController.get)
router.get('/getById/:id', mahasiswaController.getById)
router.post('/createFirst', mahasiswaController.createFirst)
router.put('/createForm1/:id', validationForm1, validationRequest, mahasiswaController.createForm1)
router.put('/createForm2/:id', validationForm2, validationRequest, mahasiswaController.createForm2)
router.put('/createForm3/:id', validationForm3, validationRequest, mahasiswaController.createForm3)
router.put('/createForm4/:id', validationForm4, validationRequest, mahasiswaController.createForm4)
router.put('/createFile/:id', validationCreateFile, validationRequest, mahasiswaController.createFile)
router.put('/nonAktif/:id', mahasiswaController.nonAktif)
router.delete('/delete/:id', mahasiswaController.delete)


module.exports = router