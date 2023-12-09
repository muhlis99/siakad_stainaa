const express = require('express')
const router = express.Router()
const prodiController = require('../controllers/prodiController.js')

router.get('/all', prodiController.get)
router.get('/getById/:id', prodiController.getById)
router.get('/getProdiByFakultas/:code', prodiController.getProdiByFakultas)


module.exports = router