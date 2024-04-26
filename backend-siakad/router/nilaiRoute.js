const express = require('express')
const route = express.Router()
const nilaiController = require('../controllers/nilaiController.js')

route.get('/sebaranMakulToNilai/:thn/:smt/:jnj/:fks/:prd', nilaiController.sebaranMakulToNilai)
route.get('/nilaiAllMhsPermakul/:thn/:smt/:jnj/:fks/:prd/:makul', nilaiController.nilaiAllMhsPermakul)

module.exports = route