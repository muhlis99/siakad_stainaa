const express = require('express')
const route = express.Router()
const rpsController = require('../controllers/rpsController.js')

// DOSEN
route.get('/all/:codeDosen', rpsController.getAll)
route.get('/getMakulByDosen/:nipy/:thn/:smt/:jnj/:fks/:prd', rpsController.getMakulByDosen)
route.post('/create', rpsController.post)
route.put('/update/:id', rpsController.put)
route.put('/delete/:id', rpsController.delete)
// MAHASISWA
route.get('/getMakul/:thn/:smt/:jnj/:fks/:prd', rpsController.getMakul)
route.get('/getbyId/:id', rpsController.getbyId)


module.exports = route