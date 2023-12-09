const express = require('express')
const router = express.Router()
const khsController = require('../controllers/khsController.js')

// user mahasiswa
router.get('/viewKhsMahasiswa/:codeThnAjr/:nim', khsController.viewKhsMahasiswa)



module.exports = router