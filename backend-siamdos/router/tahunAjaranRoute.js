const express = require('express')
const router = express.Router()
const tahunAjaranController = require('../controllers/tahunAjaranController.js')

router.get('/all', tahunAjaranController.getAll)
router.get('/getById/:id', tahunAjaranController.getById)

module.exports = router