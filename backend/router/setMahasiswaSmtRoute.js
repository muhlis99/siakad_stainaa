const express = require('express')
const router = express.Router()
const setMahasiswaSmtController = require('../controllers/setMahasiswaSmtController.js')

router.get('/all/:codeThnAjr/:codeSmt/:codeJnjPen/:codeFks/:codePrd', setMahasiswaSmtController.getAll)
router.get('/smtByThnAjr/:thnAjr', setMahasiswaSmtController.smtByThnAjr)
router.post('/create', setMahasiswaSmtController.post)

module.exports = router