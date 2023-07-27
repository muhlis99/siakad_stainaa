const express = require('express')
const router = express.Router()
const pengajuanStudiController = require('../controllers/pengajuanStudiController.js')
const { validationPengajuanStudi } = require('../validation/validationPengajuanStudi.js')
const { validationRequest } = require('../validation/validationRequest.js')

router.get('/all', pengajuanStudiController.get)
router.get('/getById/:id', pengajuanStudiController.getById)
router.post('/createMahasiswa', validationPengajuanStudi, validationRequest, pengajuanStudiController.postMahasiswa)
router.put('/approveDosen/:id', pengajuanStudiController.approveDosen)
router.put('/approveBuak/:id', pengajuanStudiController.approveBuak)
router.put('/deleteStatus/:id', pengajuanStudiController.deleteStatus)


module.exports = router