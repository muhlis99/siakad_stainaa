const express = require('express')
const route = express.Router()
const ruangController = require('../controllers/ruangController.js')
const { validationRuang } = require('../validation/validationRuang.js')
const { validationRequest } = require('../validation/validationRequest.js')

route.get('/all', ruangController.getAll)
route.get('/getById/:id', ruangController.getById)
route.post('/create', validationRuang, validationRequest, ruangController.post)
route.put('/update/:id', validationRuang, validationRequest, ruangController.put)
route.put('/delete/:id', ruangController.delete)

module.exports = route