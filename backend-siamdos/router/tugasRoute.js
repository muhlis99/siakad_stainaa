const express = require('express')
const router = express.Router()
const tugasController = require('../controllers/tugasController.js')
const path = require('path')

router.use('/public/seeLampiranTugas/lampiranTugas', express.static(path.join('../tmp_siakad/lampiranTugas')))

// dosen
router.get('/all/:nipy/:thnAjr/:smt/:jnjPen/:fks/:prd', tugasController.getAll)
router.get('/getById/:id', tugasController.getById)
router.post('/create', tugasController.post)
router.put('/update/:id', tugasController.put)
router.put('/updateStatus/:id', tugasController.updateStatus)
router.delete('/delete/:id', tugasController.delete)

// mahasiswa
router.get('/allmhs/:nim', tugasController.getAllmhs)
router.get('/tugasmhsbycode/:code', tugasController.tugasmhsbycode)


module.exports = router