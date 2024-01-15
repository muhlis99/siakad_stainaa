const express = require('express')
const router = express.Router()
const detailTugasController = require('../controllers/detailTugasController.js')
const path = require('path')

router.use('/public/seeLampiranJawaban/lampiranJawaban/wordpdf', express.static(path.join('../tmp_siakad/lampiranJawaban/wordpdf')))
router.use('/public/seeLampiranJawaban/lampiranJawaban/ppt', express.static(path.join('../tmp_siakad/lampiranJawaban/ppt')))
router.use('/public/seeLampiranJawaban/lampiranJawaban/video', express.static(path.join('../tmp_siakad/lampiranJawaban/video')))

// mahasiswa
router.get('/getByCodeTugas/:code/:nim', detailTugasController.getByCodeTugas)
router.get('/getById/:id', detailTugasController.getById)
router.post('/create', detailTugasController.post)
// router.put('/update/:id', detailTugasController.put)
router.delete('/delete/:id', detailTugasController.delete)

// dosen
router.get('/alldosen/:nipy/:thnAjr/:smt/:jnjPen/:fks/:prd/:codejadper', detailTugasController.getAlldosen)


module.exports = router