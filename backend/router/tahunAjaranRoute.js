const express = require('express')
const router = express.Router()
const tahunAjaranController = require('../controllers/tahunAjaranController.js')
const { validationTahunAjaran } = require('../validation/validationTahunAjaran.js')
const { validationRequest } = require('../validation/validationRequest.js')

router.get('/all', tahunAjaranController.getAll)
router.get('/getById/:id', tahunAjaranController.getById)
router.post('/create', validationTahunAjaran, validationRequest, tahunAjaranController.post)
router.put('/update/:id', validationTahunAjaran, validationRequest, tahunAjaranController.put)
router.put('/delete/:id', tahunAjaranController.delete)

module.exports = router