const express = require('express')
const router = express.Router()
const dosenController = require('../controllers/dosenController.js')
router.get('/all', dosenController.getAll)

module.exports = router