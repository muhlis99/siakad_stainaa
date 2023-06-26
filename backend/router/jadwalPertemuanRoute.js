const express = require('express')
const router = express.Router()
const jadwalPertemuanController = require('../controllers/jadwalPertemuanController.js')
// const { validationjadwalPertemuan } = require('../validation/validationjadwalPertemuan.js')
// const { validationRequest } = require('../validation/validationRequest.js')

router.get('/all/:codeJadkul', jadwalPertemuanController.get)
router.get('/getById/:id', jadwalPertemuanController.getById)
router.post('/create/:codeJadkul', jadwalPertemuanController.post)
router.put('/update/:id', jadwalPertemuanController.put)
// router.put('/deleteStatus/:id', jadwalPertemuanController.deleteStatus)

module.exports = router