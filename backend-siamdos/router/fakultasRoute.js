const express = require('express')
const route = express.Router()
const fakultasController = require('../controllers/fakultasController.js')


route.get('/all', fakultasController.get)
route.get('/getById/:id', fakultasController.getById)
route.get('/getFakulatsByJenjang/:code', fakultasController.getFakulatsByJenjang)

module.exports = route