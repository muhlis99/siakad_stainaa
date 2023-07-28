const express = require('express')
const route = express.Router()
const dosenController = require('../controllers/dosenController.js')
const { validationForm1, validationForm2 } = require('../validation/validationDosen.js')
const { validationRequest } = require('../validation/validationRequest.js')
const path = require('path')


route.get('/all', dosenController.getAll)
route.get('/getById/:id', dosenController.getById)
route.get('/getByCreateFirst/:id', dosenController.getByCreateFirst)
route.post('/createFirts', dosenController.createFirts)
route.put('/createForm1/:id', validationForm1, validationRequest, dosenController.createForm1)
route.put('/createForm2/:id', validationForm2, validationRequest, dosenController.createForm2)
route.put('/createFromUpload1/:id', dosenController.createFromUpload1)
route.put('/createFromUpload2/:id', dosenController.createFromUpload2)
route.put('/nonAktif/:id', dosenController.nonAktif)
route.delete('/delete/:id', dosenController.delete)
route.use('/public/seeImage/dosen/diri', express.static(path.join(__dirname, '../tmp/dosen/diri')))
route.use('/public/seeImage/dosen/ktp', express.static(path.join(__dirname, '../tmp/dosen/ktp')))
route.use('/public/seeImage/dosen/sehatRohani', express.static(path.join(__dirname, '../tmp/dosen/sehatRohani')))
route.use('/public/seeImage/dosen/sehatJasmani', express.static(path.join(__dirname, '../tmp/dosen/sehatJasmani')))
route.use('/public/seeImage/dosen/suratPerjanjianKerja', express.static(path.join(__dirname, '../tmp/dosen/suratPerjanjianKerja')))
route.use('/public/seeImage/dosen/skDosen', express.static(path.join(__dirname, '../tmp/dosen/skDosen')))
route.use('/public/seeImage/dosen/skBebasNarkotika', express.static(path.join(__dirname, '../tmp/dosen/skBebasNarkotika')))
route.use('/public/seeImage/dosen/skDariPimpinanPt', express.static(path.join(__dirname, '../tmp/dosen/skDariPimpinanPt')))
route.use('/public/seeImage/dosen/skAktifMelaksanakanTridmaPt', express.static(path.join(__dirname, '../tmp/dosen/skAktifMelaksanakanTridmaPt')))
route.use('/public/seeImage/dosen/qrCode', express.static(path.join(__dirname, '../tmp/dosen/qrcode')))



module.exports = route