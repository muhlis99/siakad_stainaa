const express = require('express')
const router = express.Router()
const pengumumanController = require('../controllers/pengumumanController.js')


router.get('/getById/:id', pengumumanController.getById)
router.get('/getByLevel/:level/:dateFirst/:dateSecond', pengumumanController.getByLevel)


module.exports = router