const express = require('express')
const route = express.Router()
const contactController = require('../controllers/contactDosenController.js')

route.get('/getContact', contactController.getContact)
route.get('/getContactByDosen', contactController.getContactByDosen)
route.post('/registrasiContactDosen', contactController.registrasiContactDosen)
route.post('/memberContactDosen', contactController.memberContactDosen)

module.exports = route