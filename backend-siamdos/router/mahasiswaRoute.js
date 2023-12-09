const express = require('express')
const router = express.Router()
const mahasiswaController = require('../controllers/mahsiswaController.js')
const path = require('path')

router.get('/getById/:id', mahasiswaController.getById)
router.use('/public/seeImage/mahasiswa/ijazah', express.static(path.join('../tmp_siakad/mahasiswa/ijazah')))
router.use('/public/seeImage/mahasiswa/kip', express.static(path.join('../tmp_siakad/mahasiswa/kip')))
router.use('/public/seeImage/mahasiswa/kk', express.static(path.join('../tmp_siakad/mahasiswa/kk')))
router.use('/public/seeImage/mahasiswa/ktp', express.static(path.join('../tmp_siakad/mahasiswa/ktp')))
router.use('/public/seeImage/mahasiswa/diri', express.static(path.join('../tmp_siakad/mahasiswa/diri')))
router.use('/public/seeImage/mahasiswa/ktm', express.static(path.join('../tmp_siakad/mahasiswa/ktm')))
router.use('/public/seeImage/mahasiswa/qrcode', express.static(path.join('../tmp_siakad/mahasiswa/qrcode')))
//  user 
router.get('/getByNim/:nim', mahasiswaController.getByNim)

module.exports = router