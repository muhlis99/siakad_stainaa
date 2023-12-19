const express = require('express')
const router = express.Router()
const detailTugasController = require('../controllers/detailTugasController.js')

//
// mahasiswa
router.get('/getById/:id', detailTugasController.getById)
router.post('/create', detailTugasController.post)
router.put('/update/:id', detailTugasController.put)
router.delete('/delete/:id', detailTugasController.delete)

// dosen
router.get('/alldosen/:nipy/:thnAjr/:smt/:jnjPen/:fks/:prd/:codejadper', detailTugasController.getAlldosen)


module.exports = router