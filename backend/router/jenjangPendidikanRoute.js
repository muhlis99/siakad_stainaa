const express = require('express')
const router = express.Router()
const jenjangPendidikanController = require('../controllers/jenjangPendidikanController.js')

router.get('/all', jenjangPendidikanController.get)
router.get('/getById/:id', jenjangPendidikanController.getById)

module.exports = router