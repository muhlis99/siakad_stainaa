const express = require('express')
const route = express.Router()
const herRegistrasiController = require('../controllers/herRegistrasiController.js')



route.get('/all', herRegistrasiController.get)
route.get('/getById/:id', herRegistrasiController.getById)
route.post('/create', herRegistrasiController.post)
route.put('/update/:id', herRegistrasiController.put)
route.put('/aproveBuak/:id', herRegistrasiController.aproveBuak)

module.exports = route