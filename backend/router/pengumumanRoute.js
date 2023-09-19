const express = require('express')
const router = express.Router()
const pengumumanController = require('../controllers/pengumumanController.js')
const { validationPengumuman } = require('../validation/validationPengumuman.js')
const { validationRequest } = require('../validation/validationRequest.js')

router.get('/all', pengumumanController.get)
router.get('/getById/:id', pengumumanController.getById)
router.get('/getByLevel/:level/:dateFirst/:dateSecond', pengumumanController.getByLevel)
router.post('/create', validationPengumuman, validationRequest, pengumumanController.post)
router.put('/update/:id', validationPengumuman, validationRequest, pengumumanController.put)


module.exports = router