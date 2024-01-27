const express = require('express')
const route = express.Router()
const rfidMahasiswaController = require('../controllers/rfidMahasiswaController.js')
// const { validationrfid } = require('../validation/validationrfid.js')
// const { validationRequest } = require('../validation/validationRequest.js')

route.get('/all', rfidMahasiswaController.getAll)
route.get('/getById/:id', rfidMahasiswaController.getById)
route.post('/create', rfidMahasiswaController.post)
route.put('/update/:id', rfidMahasiswaController.put)
route.put('/delete/:id', rfidMahasiswaController.delete)
route.get('/autocompleteRfid/:nim', rfidMahasiswaController.autocompleteRfid)

module.exports = route