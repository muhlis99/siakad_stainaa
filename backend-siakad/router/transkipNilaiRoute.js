const express = require('express')
const route = express.Router()
const transkipNilaiController = require('../controllers/transkipNilaiController.js')

route.get('/getMahasiswa/:thn/:smt/:jnj/:fks/:prd', transkipNilaiController.getMahasiswa)
route.get('/getTranskipNilai/:nim', transkipNilaiController.getTranskipNilai)
route.get('/getSingkronisasi/:nim', transkipNilaiController.getSingkronisasi)
route.post('/create', transkipNilaiController.post)

module.exports = route