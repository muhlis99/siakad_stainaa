const express = require('express')
const router = express.Router()
const khsController = require('../controllers/khsController.js')
// const { validationkhs } = require('../validation/validationkhs.js')
// const { validationRequest } = require('../validation/validationRequest.js')

router.get('/all/:codeThnAjr/:codeSmt/:codeJnjPen/:codeFks/:codePrd', khsController.getAll)
router.get('/viewKhs/:codeThnAjr/:codeSmt/:codeJnjPen/:codeFks/:codePrd/:nim', khsController.viewKhs)


module.exports = router