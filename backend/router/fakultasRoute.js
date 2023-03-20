const express = require('express')
const route = express.Router()
const fakultasController = require('../controllers/fakultasController.js')
const {validationFakultas} = require('../validation/validationFakultas.js')
const {validationRequest} = require('../validation/validationRequest.js')


route.get('/all', fakultasController.get)
route.get('/getById/:id', fakultasController.getById)
route.post('/create',validationFakultas,validationRequest, fakultasController.post)
route.put('/update/:id',validationFakultas,validationRequest, fakultasController.put)
route.put('/deleteStatus/:id', fakultasController.deleteStatus)

module.exports = route