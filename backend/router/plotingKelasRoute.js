const express = require('express')
const route = express.Router()
const plotingKelasController = require('../controllers/plotingKelasController.js')
// const { validationplotingKelas } = require('../validation/validationplotingKelas.js')
// const { validationRequest } = require('../validation/validationRequest.js')

route.get('/all', plotingKelasController.getAll)
route.get('/getById/:id', plotingKelasController.getById)
route.post('/create', plotingKelasController.post)
// route.put('/update/:id', validationplotingKelas, validationRequest, plotingKelasController.put)
// route.put('/delete/:id', plotingKelasController.delete)

module.exports = route