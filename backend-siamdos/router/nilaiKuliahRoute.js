const express = require('express')
const router = express.Router()
const nilaiKuliahController = require('../controllers/nilaiKuliahController.js')

router.get('/all', nilaiKuliahController.get)
router.get('/getById/:id/:codeThnAjr', nilaiKuliahController.getById)
router.get('/getMhsByKelas/:codeKls', nilaiKuliahController.getMhsByKelas)
router.get('/deteksiIndexNilai/:nilaiAkhir/:codeThnAjr', nilaiKuliahController.deteksiIndexNilai)
router.post('/create', nilaiKuliahController.post)
router.post('/createByOne', nilaiKuliahController.postByone)
router.put('/update/:id', nilaiKuliahController.put)




module.exports = router