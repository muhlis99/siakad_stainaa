const express = require('express')
const router = express.Router()
const setMahasiswaSmtController = require('../controllers/setMahasiswaSmtController.js')

router.get('/all/:codeSmt/:codeJnjPen/:codeFks/:codePrd', setMahasiswaSmtController.getAll)
router.post('/create', setMahasiswaSmtController.post)

module.exports = router