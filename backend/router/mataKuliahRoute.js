const express = require('express')
const route = express.Router()
const mataKuliahController = require('../controllers/mataKuliahController.js')
// const { validationmataKuliah } = require('../validation/validationmataKuliah.js')
// const { validationRequest } = require('../validation/validationRequest.js')

route.get('/all', mataKuliahController.getAll)
route.get('/getById/:id', mataKuliahController.getById)
// route.post('/create', mataKuliahController.post)
// route.put('/update/:id', mataKuliahController.put)
// route.put('/delete/:id', mataKuliahController.delete)

module.exports = route