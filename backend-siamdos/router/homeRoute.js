const express = require('express')
const route = express.Router()
const homeController = require('../controllers/homeController.js')

route.get('/jadwalKuliahNowMahasiswa/:nim', homeController.jadwalKuliahNowMahasiswa)
route.get('/totalSksDanProdi/:nim', homeController.totalSksDanProdi)


module.exports = route