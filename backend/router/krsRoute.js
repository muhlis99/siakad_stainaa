const express = require('express')
const router = express.Router()
const krsController = require('../controllers/krsController.js')
// const { validationkrs } = require('../validation/validationkrs.js')
// const { validationRequest } = require('../validation/validationRequest.js')

router.get('/all/:thnAjr/:prd/:smt', krsController.getAll)
router.get('/viewAll/:thnAjr/:prd/:smt', krsController.viewAll)
router.post('/create/:thnAjr/:prd/:smt', krsController.post)

module.exports = router