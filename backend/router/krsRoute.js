const express = require('express')
const router = express.Router()
const krsController = require('../controllers/krsController.js')
// const { validationkrs } = require('../validation/validationkrs.js')
// const { validationRequest } = require('../validation/validationRequest.js')

router.get('/all', krsController.getAll)
router.get('/getById/:id', krsController.getById)
router.post('/create', krsController.post)
router.put('/update/:id', krsController.put)
router.put('/delete/:id', krsController.delete)

module.exports = router