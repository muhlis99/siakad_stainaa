const express = require('express')
const route = express.Router()
const kontakController = require('../controllers/kontakController.js')

route.get('/getKontak', kontakController.getKontak)
route.get('/getMemberByKontak', kontakController.getMemberByKontak)
route.get('/checkKontak/:email', kontakController.checkKontak)
route.post('/registrasiKontak', kontakController.registrasiKontak)
route.post('/createMemberKontak', kontakController.createMemberKontak)

module.exports = route