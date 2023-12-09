const express = require('express')
const router = express.Router()
const pengajuanStudiController = require('../controllers/pengajuanStudiController.js')
const { validationPengajuanStudi } = require('../validation/validationPengajuanStudi.js')
const { validationRequest } = require('../validation/validationRequest.js')

router.get('/all', pengajuanStudiController.get)
router.get('/allAdmin', pengajuanStudiController.getAdmin)
router.get('/getById/:id', pengajuanStudiController.getById)
// router.post('/createMahasiswa', validationPengajuanStudi, validationRequest, pengajuanStudiController.postMahasiswa)
router.post('/createAdmin', validationPengajuanStudi, validationRequest, pengajuanStudiController.createAdmin)
router.put('/approveDosen/:id', pengajuanStudiController.approveDosen)
router.put('/approveBuak/:id', pengajuanStudiController.approveBuak)
router.put('/deleteStatus/:id', pengajuanStudiController.deleteStatus)
router.get('/autocomplete/:codeThnAjr/:codeSmt/:codeJnjPen/:codeFks/:codePrd/:status', pengajuanStudiController.autocomplete)

//  user mahasiswa
router.get('/allMahasiswa/:nim', pengajuanStudiController.allMahasiswa)
router.get('/getMahasiswaById/:id', pengajuanStudiController.getMahasiswaById)
router.post('/createMahasiswa', validationPengajuanStudi, validationRequest, pengajuanStudiController.postMahasiswa)
router.put('/updateMahasiswa/:id', validationPengajuanStudi, validationRequest, pengajuanStudiController.putMahasiswa)
router.put('/deleteMahasiswa/:id', pengajuanStudiController.deleteMahasiswa)

//  dosen
router.get('/pengajuanStudiByPemdik/:codeJnjPen/:codeFks/:codePrd/:nipy', pengajuanStudiController.pengajuanStudiByPemdik)



module.exports = router