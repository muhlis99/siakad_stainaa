const express = require('express')
const route = express.Router()
const kontakController = require('../controllers/kontakController.js')
const path = require('path')

route.get('/getKontak', kontakController.getKontak)
route.get('/getMemberByKontak', kontakController.getMemberByKontak)
route.get('/checkKontak/:email', kontakController.checkKontak)
route.post('/registrasiKontak', kontakController.registrasiKontak)
route.post('/createMemberKontak', kontakController.createMemberKontak)
route.use('/public/seeImage/kontak', express.static(path.join('../tmp_siakad/kontak')))

module.exports = route