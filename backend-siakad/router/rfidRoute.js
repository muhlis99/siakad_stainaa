const express = require('express')
const route = express.Router()
const rfidController = require('../controllers/rfidController.js')
// const { validationrfid } = require('../validation/validationrfid.js')
// const { validationRequest } = require('../validation/validationRequest.js')

route.get('/all', rfidController.getAll)
route.get('/getById/:id', rfidController.getById)
route.post('/create', rfidController.post)
route.put('/update/:id', rfidController.put)
route.put('/delete/:id', rfidController.delete)
route.get('/autocompleteRfid/:nim', rfidController.autocompleteRfid)

module.exports = route