const express = require('express')
const route = express.Router()
const contactController = require('../controllers/contactMahasiswaController.js')

route.get('/getContact', contactController.getContact)
route.get('/getContactByMahasiswa', contactController.getContactByMahasiswa)
route.get('/checkContactMahasiswa/:email', contactController.checkContactMahasiswa)
route.post('/registrasiContactMahasiswa', contactController.registrasiContactMahasiswa)
route.post('/memberContactMahasiswa', contactController.memberContactMahasiswa)

module.exports = route