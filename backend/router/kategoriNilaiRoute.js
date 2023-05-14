const express = require('express')
const router = express.Router()
const kategoriNilaiController = require('../controllers/kategoriNilaiController.js')
const { validationKategoriNilai } = require('../validation/validationKategoriNilai.js')
const { validationRequest } = require('../validation/validationRequest.js')

router.get('/all', kategoriNilaiController.getAll)
router.get('/getById/:id', kategoriNilaiController.getById)
router.post('/create', validationKategoriNilai, validationRequest, kategoriNilaiController.post)
router.put('/update/:id', validationKategoriNilai, validationRequest, kategoriNilaiController.put)
router.put('/delete/:id', kategoriNilaiController.delete)

module.exports = router