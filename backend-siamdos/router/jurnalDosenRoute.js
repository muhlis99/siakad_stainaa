const express = require('express')
const route = express.Router()
const jurnalDosenController = require('../controllers/jurnalDosenController.js')
// const { validationjurnal } = require('../validation/validationjurnal.js')
// const { validationRequest } = require('../validation/validationRequest.js')

route.get('/all/:codeJadkul', jurnalDosenController.getAll)
route.get('/getByCodeJadper/:codeJadper', jurnalDosenController.getByCodeJadper)
route.post('/create', jurnalDosenController.post)
route.put('/update/:id', jurnalDosenController.put)
route.put('/delete/:id', jurnalDosenController.delete)
route.get('/getMakulByDosen/:nipy/:thn/:smt/:jnj/:fks/:prd', jurnalDosenController.getMakulByDosen)
route.get('/getPertemuanByDosen/:codeJadkul', jurnalDosenController.getPertemuanByDosen)
route.get('/getStatusJurnal/:codeJadper', jurnalDosenController.getStatusJurnal)

module.exports = route