const express = require('express')
const router = express.Router()
const setMahasiswaSmtController = require('../controllers/setMahasiswaSmtController.js')

router.get('/smtByThnAjr/:thnAjr', setMahasiswaSmtController.smtByThnAjr)

module.exports = router