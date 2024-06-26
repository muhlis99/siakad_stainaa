const express = require('express')
const router = express.Router()
const mahasiswaController = require('../controllers/mahsiswaController.js')
const { validationForm1, validationForm2, validationForm3, validationForm4 } = require('../validation/validationMahasiswa.js')
const { validationRequest } = require('../validation/validationRequest.js')
const path = require('path')

router.get('/all', mahasiswaController.get)
router.get('/getById/:id', mahasiswaController.getById)
router.get('/getByCreateFirst/:id', mahasiswaController.getByCreateFirst)
router.post('/createFirst', mahasiswaController.createFirst)
router.post('/importEcxel', mahasiswaController.importEcxel)
router.put('/createForm1/:id', validationForm1, validationRequest, mahasiswaController.createForm1)
router.put('/createForm2/:id', validationForm2, validationRequest, mahasiswaController.createForm2)
router.put('/createForm3/:id', validationForm3, validationRequest, mahasiswaController.createForm3)
router.put('/createForm4/:id', validationForm4, validationRequest, mahasiswaController.createForm4)
router.put('/createFile/:id', mahasiswaController.createFile)
router.get('/getIdLoginAndHistoryMhs/:email/:nim/:thn/:smt/:jnjpen/:fks/:prd', mahasiswaController.getIdLoginAndHistoryMhs)
router.put('/nonAktif/:id', mahasiswaController.nonAktif)
router.delete('/delete/:id', mahasiswaController.delete)
router.get('/validasiEmail/:email', mahasiswaController.validasiEmail)
router.use('/public/seeImage/mahasiswa/ijazah', express.static(path.join('../tmp_siakad/mahasiswa/ijazah')))
router.use('/public/seeImage/mahasiswa/kip', express.static(path.join('../tmp_siakad/mahasiswa/kip')))
router.use('/public/seeImage/mahasiswa/kk', express.static(path.join('../tmp_siakad/mahasiswa/kk')))
router.use('/public/seeImage/mahasiswa/ktp', express.static(path.join('../tmp_siakad/mahasiswa/ktp')))
router.use('/public/seeImage/mahasiswa/diri', express.static(path.join('../tmp_siakad/mahasiswa/diri')))
router.use('/public/seeImage/mahasiswa/ktm', express.static(path.join('../tmp_siakad/mahasiswa/ktm')))
router.use('/public/seeImage/mahasiswa/qrcode', express.static(path.join('../tmp_siakad/mahasiswa/qrcode')))
//  user 
router.get('/getByNim/:nim', mahasiswaController.getByNim)

// pmb
router.get('/qrcodepmb/:nim/:dataQrCode', mahasiswaController.qrcodepmb)


module.exports = router