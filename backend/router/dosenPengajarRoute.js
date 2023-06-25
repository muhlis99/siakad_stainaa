const express = require('express')
const route = express.Router()
const dosenPengajarController = require('../controllers/dosenPengajarCotroller.js')
// const { validationdosenPengajar } = require('../validation/validationdosenPengajar.js')
// const { validationRequest } = require('../validation/validationRequest.js')


route.get('/all', dosenPengajarController.get)
// route.get('/getById/:id', dosenPengajarController.getById)
// route.get('/getFakulatsByJenjang/:code', dosenPengajarController.getFakulatsByJenjang)
// route.post('/create', validationdosenPengajar, validationRequest, dosenPengajarController.post)
// route.put('/update/:id', validationdosenPengajar, validationRequest, dosenPengajarController.put)
// route.put('/deleteStatus/:id', dosenPengajarController.deleteStatus)

module.exports = route