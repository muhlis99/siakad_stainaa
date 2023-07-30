const express = require('express')
const router = express.Router()
const pembimbingAkademikController = require('../controllers/pembimbingAkademikController.js')

router.get('/all', pembimbingAkademikController.get)
router.get('/getMhsByPembimbingAkademik/:codePendik', pembimbingAkademikController.getMhsByPembimbingAkademik)
router.get('/getById/:id', pembimbingAkademikController.getById)
router.post('/create', pembimbingAkademikController.post)
router.put('/update/:id', pembimbingAkademikController.put)
router.put('/delete/:id', pembimbingAkademikController.delete)
router.get('/autocompleteDosen', pembimbingAkademikController.autocompleteDosen)
router.get('/autocompleteMahasiswa/:codeJnjPen/:codeFks/:codePrd', pembimbingAkademikController.autocompleteMahasiswa)
router.post('/createDetail', pembimbingAkademikController.postDetail)
router.put('/updateDetail/:id', pembimbingAkademikController.putDetail)
router.put('/deleteDetail/:id', pembimbingAkademikController.deleteDetail)

module.exports = router