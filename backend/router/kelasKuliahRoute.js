const express = require('express')
const route = express.Router()
const kelasKuliahController = require('../controllers/kelasKuliahController.js')
const { validationKelas } = require('../validation/validationKelas.js')
const { validationRequest } = require('../validation/validationRequest.js')

route.get('/all', kelasKuliahController.getAll)
route.get('/getById/:id', kelasKuliahController.getById)
route.get('/jumlahMhs/:smt/:jnjPen/:fkts/:prd', kelasKuliahController.jumlahMhs)
route.post('/create', kelasKuliahController.post)
route.put('/update/:id', validationKelas, validationRequest, kelasKuliahController.put)
route.put('/delete/:id', kelasKuliahController.delete)

module.exports = route