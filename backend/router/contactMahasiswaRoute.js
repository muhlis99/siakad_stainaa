const express = require('express')
const route = express.Router()
const contactController = require('../controllers/contactMahasiswaController.js')

route.get('/getContact', contactController.getContact)
route.get('/getContactByMahasiswa', contactController.getContactByMahasiswa)
route.post('/registrasiContactMahasiswa', contactController.registrasiContactMahasiswa)
route.post('/memberContactMahasiswa', contactController.memberContactMahasiswa)

module.exports = route