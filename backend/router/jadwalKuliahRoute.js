const express = require('express')
const router = express.Router()
const jadwalKuliahController = require('../controllers/jadwalKuliahController.js')
const { validationJadwalKuliah } = require('../validation/validationJadwalKuliah.js')
const { validationRequest } = require('../validation/validationRequest.js')

router.get('/all', jadwalKuliahController.get)
router.get('/getById/:id', jadwalKuliahController.getById)
router.post('/create', validationJadwalKuliah, validationRequest, jadwalKuliahController.post)
router.put('/update/:id', validationJadwalKuliah, validationRequest, jadwalKuliahController.put)
router.put('/deleteStatus/:id', jadwalKuliahController.deleteStatus)

module.exports = router