const express = require('express')
const router = express.Router()
const semesterController = require('../controllers/semesterController.js')

router.get('/all', semesterController.getAll)
router.get('/getById/:id', semesterController.getById)

module.exports = router