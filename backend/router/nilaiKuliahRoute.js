const express = require('express')
const router = express.Router()
const nilaiKuliahController = require('../controllers/nilaiKuliahController.js')

router.get('/all', nilaiKuliahController.get)
router.get('/getById/:id/:codeThnAjr', nilaiKuliahController.getById)
router.get('/getMhsByKelas/:codeKls', nilaiKuliahController.getMhsByKelas)
router.get('/deteksiIndexNilai/:nilaiAkhir/:codeThnAjr', nilaiKuliahController.deteksiIndexNilai)
router.post('/create', nilaiKuliahController.post)
router.put('/update', nilaiKuliahController.put)




module.exports = router