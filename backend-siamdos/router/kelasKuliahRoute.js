const express = require('express')
const route = express.Router()
const kelasKuliahController = require('../controllers/kelasKuliahController.js')
const { validationKelas } = require('../validation/validationKelas.js')
const { validationRequest } = require('../validation/validationRequest.js')

route.get('/allMatakuliah/:codeThnAjr/:codeSmt/:jnjPen/:codeFks/:codePrd', kelasKuliahController.getAllMatakuliah)
route.get('/getKelasByMakul/:codeThnAjr/:codeSmt/:jnjPen/:codeFks/:codePrd/:codeMakul', kelasKuliahController.getKelasByMakul)
route.get('/getKelasById/:id', kelasKuliahController.getKelasById)
route.get('/jumlahMhs/:thnAjr/:smt/:jnjPen/:fkts/:prd/:jenkel', kelasKuliahController.jumlahMhs)
route.get('/getNamaKelasSelanjutnya/:thnAjr/:smt/:jnjPen/:fkts/:prd', kelasKuliahController.getNamaKelasSelanjutnya)
route.get('/getMhsByKelas/:codeKls', kelasKuliahController.getMhsByKelas)
route.post('/create', validationKelas, validationRequest, kelasKuliahController.post)
route.put('/pindahKelas', kelasKuliahController.pindahKelas)

module.exports = route