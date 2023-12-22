const express = require('express')
const router = express.Router()
const pedomanController = require('../controllers/pedomanController.js')


router.get('/getByLevel/:level', pedomanController.getByLevel)
// router.get('/getById/:id', pedomanController.getById)
// router.post('/create', pedomanController.post)
// router.put('/update/:id', pedomanController.put)
// router.put('/updateStatus/:id', pedomanController.updateStatus)
// router.delete('/delete/:id', pedomanController.delete)


module.exports = router