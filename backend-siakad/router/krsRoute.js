const express = require('express')
const router = express.Router()
const krsController = require('../controllers/krsController.js')

router.get('/all', krsController.getAll)
router.get('/viewAll/:thnAjr/:smt/:jenjPen/:fks/:prd', krsController.viewAll)
router.post('/create/:thnAjr/:smt/:jenjPen/:fks/:prd', krsController.post)
router.delete('/create/:thnAjr/:smt/:jenjPen/:fks/:prd', krsController.delete)

// user mahasiswa
router.get('/getSemesterMhs/:nim', krsController.getSemesterMhs)
router.get('/viewKrsMahasiswaNow/:nim', krsController.viewKrsMahasiswaNow)
router.put('/pengajuanKrsMahasiswa/:nim', krsController.pengajuanKrsMahasiswa)
router.get('/viewKrsMahasiswaHistory/:nim/:tahunAjaran/:semester/:status', krsController.viewKrsMahasiswaHistory)

// user dosen
router.get('/viewKrsMahasiswaByPemdik/:nim/:tahunAjaran', krsController.viewKrsMahasiswaByPemdik)
router.put('/approveKrsMahasiswaByPemdik', krsController.approveKrsMahasiswaByPemdik)
module.exports = router