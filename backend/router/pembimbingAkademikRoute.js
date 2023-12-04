const express = require('express')
const router = express.Router()
const pembimbingAkademikController = require('../controllers/pembimbingAkademikController.js')

router.get('/all', pembimbingAkademikController.get)
router.get('/getMhsByPembimbingAkademik/:codePendik', pembimbingAkademikController.getMhsByPembimbingAkademik)
router.get('/getMhsForInsert/:codePemdik/:jnjPen/:fks/:prd', pembimbingAkademikController.getMhsForInsert)


router.post('/create', pembimbingAkademikController.post)
router.put('/update/:id', pembimbingAkademikController.put)
router.put('/delete/:id', pembimbingAkademikController.delete)
router.post('/createDetail', pembimbingAkademikController.postDetail)
router.put('/updateDetail/:id', pembimbingAkademikController.putDetail)
router.put('/deleteDetail/:id', pembimbingAkademikController.deleteDetail)

// dosen
router.get('/mahasiswaByDosenPembimbing/:codeJnjPen/:codeFks/:codePrd/:nipy', pembimbingAkademikController.mahasiswaByDosenPembimbing)
router.get('/verifikasiDosenPembimbing/:nipy', pembimbingAkademikController.verifikasiDosenPembimbing)

module.exports = router