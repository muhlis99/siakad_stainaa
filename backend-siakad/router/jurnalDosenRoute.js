const express = require('express')
const route = express.Router()
const jurnalDosenController = require('../controllers/jurnalDosenController.js')
// const { validationjurnal } = require('../validation/validationjurnal.js')
// const { validationRequest } = require('../validation/validationRequest.js')

route.get('/all/:codeJadkul', jurnalDosenController.getAll)
route.get('/getById/:id', jurnalDosenController.getById)
route.get('/getMakul/:thn/:smt/:jnj/:fks/:prd', jurnalDosenController.getMakul)

module.exports = route