const express = require('express')
const router = express.Router()
const semesterController = require('../controllers/semesterController.js')
const { validationSemester } = require('../validation/validationSemester.js')
const { validationRequest } = require('../validation/validationRequest.js')

router.get('/all', semesterController.getAll)
router.get('/getById/:id', semesterController.getById)
router.post('/create', validationSemester, validationRequest, semesterController.post)
router.put('/update/:id', validationSemester, validationRequest, semesterController.put)
router.put('/delete/:id', semesterController.delete)

module.exports = router