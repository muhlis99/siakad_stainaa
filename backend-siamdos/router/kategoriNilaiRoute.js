const express = require('express')
const router = express.Router()
const kategoriNilaiController = require('../controllers/kategoriNilaiController.js')

router.get('/all', kategoriNilaiController.getAll)
router.get('/getById/:id', kategoriNilaiController.getById)

module.exports = router