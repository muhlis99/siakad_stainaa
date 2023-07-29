const express = require('express')
const route = express.Router()
const homeController = require('../controllers/homeController.js')


route.get('/totalMahasiswaPutera', homeController.totalMahasiswaPutera)
route.get('/totalMahasiswaPuteri', homeController.totalMahasiswaPuteri)
route.get('/totalDosen', homeController.totalDosen)
route.get('/totalProdi', homeController.totalProdi)
route.get('/diagramMahasiswa', homeController.diagramMahasiswa)
route.get('/diagramDosen', homeController.diagramDosen)

module.exports = route