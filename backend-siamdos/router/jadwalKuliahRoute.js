const express = require('express')
const router = express.Router()
const jadwalKuliahController = require('../controllers/jadwalKuliahController.js')

// user mahasiswa 
router.get('/getJadwalMahasiswa/:nim', jadwalKuliahController.getJadwalMahasiswa)

// user dosen 
router.get('/jadwalKuliahDosen/:thnAjr/:smt/:jenjPen/:fks/:prd/:nipy', jadwalKuliahController.jadwalKuliahDosen)
router.get('/JadwalPertemuanDosen/:thnAjr/:smt/:jenjPen/:fks/:prd/:nipy', jadwalKuliahController.JadwalPertemuanDosen)
router.put('/updateJadwalPertemuanDosen/:id', jadwalKuliahController.updateJadwalPertemuanDosen)


module.exports = router 