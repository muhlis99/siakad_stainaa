const express = require('express')
const router = express.Router()
const krsController = require('../controllers/krsController.js')


// user mahasiswa
router.get('/getSemesterMhs/:nim', krsController.getSemesterMhs)
router.get('/viewKrsMahasiswaNow/:nim', krsController.viewKrsMahasiswaNow)
router.put('/pengajuanKrsMahasiswa/:nim', krsController.pengajuanKrsMahasiswa)
router.get('/viewKrsMahasiswaHistory/:nim/:tahunAjaran/:semester/:status', krsController.viewKrsMahasiswaHistory)

// user dosen
router.get('/viewKrsMahasiswaByPemdik/:nim/:tahunAjaran', krsController.viewKrsMahasiswaByPemdik)
router.put('/approveKrsMahasiswaByPemdik', krsController.approveKrsMahasiswaByPemdik)
module.exports = router