const express = require('express')
const route = express.Router()
const kelasController = require('../controllers/kelasController.js')
const { validationKelas } = require('../validation/validationKelas.js')
const { validationRequest } = require('../validation/validationRequest.js')

route.get('/all', kelasController.getAll)
route.get('/getById/:id', kelasController.getById)
route.post('/create', validationKelas, validationRequest, kelasController.post)
route.put('/update/:id', validationKelas, validationRequest, kelasController.put)
route.put('/delete/:id', kelasController.delete)

module.exports = route