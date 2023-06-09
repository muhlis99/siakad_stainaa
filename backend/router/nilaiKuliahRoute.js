const express = require('express')
const router = express.Router()
const nilaiKuliahController = require('../controllers/nilaiKuliahController.js')
// const { validationnilaiKuliah } = require('../validation/validationnilaiKuliah.js')
// const { validationRequest } = require('../validation/validationRequest.js')

router.get('/all', nilaiKuliahController.get)
router.get('/getMhsByKelas/:codeSmt/:codeMakul/:codeKls', nilaiKuliahController.getMhsByKelas)
router.get('/deteksiIndexNilai/:nilaiAkhir/:codeThnAjr', nilaiKuliahController.deteksiIndexNilai)
router.post('/create', nilaiKuliahController.post)
// router.put('/update/:id', nilaiKuliahController.put)
// router.put('/deleteStatus/:id', nilaiKuliahController.deleteStatus)


module.exports = router