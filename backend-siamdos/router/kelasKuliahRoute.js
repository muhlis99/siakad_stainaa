const express = require('express')
const route = express.Router()
const kelasKuliahController = require('../controllers/kelasKuliahController.js')

route.get('/getKelasById/:id', kelasKuliahController.getKelasById)
route.get('/getKelasByMakul/:codeThnAjr/:codeSmt/:jnjPen/:codeFks/:codePrd/:codeMakul', kelasKuliahController.getKelasByMakul)
route.get('/getMhsByKelas/:codeKls', kelasKuliahController.getMhsByKelas)
module.exports = route