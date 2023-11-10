const express = require('express')
const router = express.Router()
const jadwalKuliahController = require('../controllers/jadwalKuliahController.js')
const { validationJadwalKuliah } = require('../validation/validationJadwalKuliah.js')
const { validationRequest } = require('../validation/validationRequest.js')

router.get('/all/:thnAjr/:smt/:jenjPen/:fks/:prd', jadwalKuliahController.get)
router.get('/getByKelas/:thnAjr/:smt/:jenjPen/:fks/:prd/:makul/:kls', jadwalKuliahController.getByKelas)
router.post('/create', validationJadwalKuliah, validationRequest, jadwalKuliahController.post)
router.put('/update/:id', validationJadwalKuliah, validationRequest, jadwalKuliahController.put)
router.put('/deleteStatus/:id', jadwalKuliahController.deleteStatus)

// user mahasiswa 
router.get('/getJadwalMahasiswa/:nim', jadwalKuliahController.getJadwalMahasiswa)

// user dosen 
router.get('/jadwalKuliahDosen/:thnAjr/:smt/:jenjPen/:fks/:prd/:nipy', jadwalKuliahController.jadwalKuliahDosen)
router.get('/JadwalPertemuanDosen/:thnAjr/:smt/:jenjPen/:fks/:prd/:nipy', jadwalKuliahController.JadwalPertemuanDosen)
router.put('/updateJadwalPertemuanDosen/:id', jadwalKuliahController.updateJadwalPertemuanDosen)


module.exports = router 