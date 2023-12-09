const express = require('express')
const router = express.Router()
const pengajuanStudiController = require('../controllers/pengajuanStudiController.js')
const { validationPengajuanStudi } = require('../validation/validationPengajuanStudi.js')
const { validationRequest } = require('../validation/validationRequest.js')

router.get('/getById/:id', pengajuanStudiController.getById)
router.put('/approveDosen/:id', pengajuanStudiController.approveDosen)

//  user mahasiswa
router.get('/allMahasiswa/:nim', pengajuanStudiController.allMahasiswa)
router.get('/getMahasiswaById/:id', pengajuanStudiController.getMahasiswaById)
router.post('/createMahasiswa', validationPengajuanStudi, validationRequest, pengajuanStudiController.postMahasiswa)
router.put('/updateMahasiswa/:id', validationPengajuanStudi, validationRequest, pengajuanStudiController.putMahasiswa)
router.put('/deleteMahasiswa/:id', pengajuanStudiController.deleteMahasiswa)

//  dosen
router.get('/pengajuanStudiByPemdik/:codeJnjPen/:codeFks/:codePrd/:nipy', pengajuanStudiController.pengajuanStudiByPemdik)



module.exports = router