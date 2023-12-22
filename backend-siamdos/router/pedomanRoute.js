const express = require('express')
const router = express.Router()
const pedomanController = require('../controllers/pedomanController.js')
const path = require('path')


router.get('/getByLevel/:level', pedomanController.getByLevel)
router.get('/getById/:id', pedomanController.getById)
router.post('/create', pedomanController.post)
router.put('/update/:id', pedomanController.put)
router.delete('/delete/:id', pedomanController.delete)
router.use('/public/seeLampiranPedoman/lampiranPedoman', express.static(path.join('../tmp_siakad/lampiranPedoman')))


module.exports = router