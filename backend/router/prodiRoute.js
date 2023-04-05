const express = require('express')
const router  = express.Router()
const prodiController = require('../controllers/prodiController.js')
const {validationProdi} = require('../validation/validationProdi.js')
const {validationRequest} = require('../validation/validationRequest.js')

router.get('/all', prodiController.get)
router.get('/getById/:id', prodiController.getById)
router.post('/create',validationProdi,validationRequest ,prodiController.post)
router.put('/update/:id',validationProdi,validationRequest ,prodiController.put)
router.put('/deleteStatus/:id' ,prodiController.deleteStatus)


module.exports = router