const express = require('express')
const route = express.Router()
const dosenPengajarController = require('../controllers/dosenPengajarController.js')


route.get('/getAllDosen', dosenPengajarController.getAllDosen)
route.get('/getById/:id', dosenPengajarController.getById)
route.put('/create', dosenPengajarController.post)
route.put('/update/:id', dosenPengajarController.put)
route.put('/deleteStatus/:id', dosenPengajarController.deleteStatus)

module.exports = route