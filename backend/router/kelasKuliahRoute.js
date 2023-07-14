const express = require('express')
const route = express.Router()
const kelasKuliahController = require('../controllers/kelasKuliahController.js')
const { validationKelas } = require('../validation/validationKelas.js')
const { validationRequest } = require('../validation/validationRequest.js')

route.get('/allMatakuliah/:codeThnAjr/:codeSmt/:jnjPen/:codeFks/:codePrd', kelasKuliahController.getAllMatakuliah)
route.get('/getKelasByMakul/:codeMakul', kelasKuliahController.getKelasByMakul)
route.get('/getKelasById/:id', kelasKuliahController.getKelasById)
route.get('/jumlahMhs/:thnAjr/:smt/:jnjPen/:fkts/:prd', kelasKuliahController.jumlahMhs)
route.post('/create', kelasKuliahController.post)
route.put('/pindahKelas', kelasKuliahController.pindahKelas)

module.exports = route