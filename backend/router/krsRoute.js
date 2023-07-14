const express = require('express')
const router = express.Router()
const krsController = require('../controllers/krsController.js')
// const { validationkrs } = require('../validation/validationkrs.js')
// const { validationRequest } = require('../validation/validationRequest.js')

router.get('/all', krsController.getAll)
router.get('/viewAll/:thnAjr/:smt/:jenjPen/:fks/:prd', krsController.viewAll)
router.post('/create/:thnAjr/:smt/:jenjPen/:fks/:prd', krsController.post)

module.exports = router