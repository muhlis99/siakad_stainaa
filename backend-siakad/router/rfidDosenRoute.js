const express = require('express')
const route = express.Router()
const rfidDosenController = require('../controllers/rfidDosenController.js')
// const { validationrfid } = require('../validation/validationrfid.js')
// const { validationRequest } = require('../validation/validationRequest.js')

route.get('/all', rfidDosenController.getAll)
route.get('/getById/:id', rfidDosenController.getById)
route.post('/create', rfidDosenController.post)
route.put('/update/:id', rfidDosenController.put)
route.put('/delete/:id', rfidDosenController.delete)
route.get('/autocompleteRfid/:nipy', rfidDosenController.autocompleteRfid)

module.exports = route