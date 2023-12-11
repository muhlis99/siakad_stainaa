const express = require('express')
const route = express.Router()
const dosenController = require('../controllers/dosenController.js')
const { validationForm1, validationForm2 } = require('../validation/validationDosen.js')
const { validationRequest } = require('../validation/validationRequest.js')
const path = require('path')


route.get('/getById/:id', dosenController.getById)
route.use('/public/seeImage/dosen/diri', express.static(path.join('../tmp_siakad/dosen/diri')))
route.use('/public/seeImage/dosen/ktp', express.static(path.join('../tmp_siakad/dosen/ktp')))
route.use('/public/seeImage/dosen/sehatRohani', express.static(path.join('../tmp_siakad/dosen/sehatRohani')))
route.use('/public/seeImage/dosen/sehatJasmani', express.static(path.join('../tmp_siakad/dosen/sehatJasmani')))
route.use('/public/seeImage/dosen/suratPerjanjianKerja', express.static(path.join('../tmp_siakad/dosen/suratPerjanjianKerja')))
route.use('/public/seeImage/dosen/skDosen', express.static(path.join('../tmp_siakad/dosen/skDosen')))
route.use('/public/seeImage/dosen/skBebasNarkotika', express.static(path.join('../tmp_siakad/dosen/skBebasNarkotika')))
route.use('/public/seeImage/dosen/skDariPimpinanPt', express.static(path.join('../tmp_siakad/dosen/skDariPimpinanPt')))
route.use('/public/seeImage/dosen/skAktifMelaksanakanTridmaPt', express.static(path.join('../tmp_siakad/dosen/skAktifMelaksanakanTridmaPt')))
route.use('/public/seeImage/dosen/qrCode', express.static(path.join('../tmp_siakad/dosen/qrcode')))

// user dosen
route.get('/getByNipy/:nipy', dosenController.getByNipy)


module.exports = route