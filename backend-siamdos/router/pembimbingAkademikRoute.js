const express = require('express')
const router = express.Router()
const pembimbingAkademikController = require('../controllers/pembimbingAkademikController.js')


// dosen
router.get('/mahasiswaByDosenPembimbing/:codeJnjPen/:codeFks/:codePrd/:nipy/:thnAngkatan', pembimbingAkademikController.mahasiswaByDosenPembimbing)
router.get('/verifikasiDosenPembimbing/:nipy', pembimbingAkademikController.verifikasiDosenPembimbing)

module.exports = router