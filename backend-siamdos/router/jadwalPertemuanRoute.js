const express = require('express')
const router = express.Router()
const jadwalPertemuanController = require('../controllers/jadwalPertemuanController.js')
// const { validationjadwalPertemuan } = require('../validation/validationjadwalPertemuan.js')
// const { validationRequest } = require('../validation/validationRequest.js')

router.get('/getById/:id', jadwalPertemuanController.getById)
// router.put('/update/:id', jadwalPertemuanController.put)

module.exports = router