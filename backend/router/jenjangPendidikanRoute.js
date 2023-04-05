const express = require('express')
const router = express.Router()
const jenjangPendidikanController = require('../controllers/jenjangPendidikanController.js')
const {validationJenjangPendidikan} = require('../validation/validationJenjangPendidikan.js')
const {validationRequest} = require('../validation/validationRequest.js')

router.get('/all', jenjangPendidikanController.get)
router.get('/getById/:id', jenjangPendidikanController.getById)
router.post('/create',validationJenjangPendidikan, validationRequest, jenjangPendidikanController.post)
router.put('/update/:id',validationJenjangPendidikan, validationRequest, jenjangPendidikanController.put)
router.put('/deleteStatus/:id', jenjangPendidikanController.deleteStatus)

module.exports = router