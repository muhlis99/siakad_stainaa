const express = require('express')
const router = express.Router()
const tugasController = require('../controllers/tugasController.js')


// dosen
router.get('/all/:nipy/:thnAjr/:smt/:jnjPen/:fks/:prd', tugasController.getAll)
router.get('/getById/:id', tugasController.getById)
router.post('/create', tugasController.post)
router.put('/update/:id', tugasController.put)
router.put('/updateStatus/:id', tugasController.updateStatus)
router.delete('/delete/:id', tugasController.delete)

// mahasiswa
router.get('/allmhs/:nim', tugasController.getAllmhs)


module.exports = router