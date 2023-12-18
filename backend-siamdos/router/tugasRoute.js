const express = require('express')
const router = express.Router()
const tugasController = require('../controllers/tugasController.js')
//////////////////////

// dosen
router.get('/all/:nipy/:thnAjr/:smt/:jnjPen/:fks/:prd', tugasController.getAll)
router.get('/getById/:id', tugasController.getById)

// mahasiswa
module.exports = router