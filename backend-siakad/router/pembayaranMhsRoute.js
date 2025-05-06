const express = require('express')
const route = express.Router()
const pembayaranMhsController = require('../controllers/pembayaranMhsController.js')

route.get('/allMahasiswa', pembayaranMhsController.getAllMahasiswa)
route.get('/detailMhs/:nim', pembayaranMhsController.getDetailMhs)
route.put('/updatePembayaran/:id', pembayaranMhsController.updatePembayaran)

module.exports = route