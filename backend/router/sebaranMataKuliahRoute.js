const express = require('express')
const route = express.Router()
const sebaranMataKuliahController = require('../controllers/sebaranMataKuliahController.js')
// const { validationsebaranMataKuliah } = require('../validation/validationsebaranMataKuliah.js')
// const { validationRequest } = require('../validation/validationRequest.js')

route.get('/all', sebaranMataKuliahController.getAll)
route.get('/getById/:id', sebaranMataKuliahController.getById)
route.get('/smtByThnAjr/:thnAjr', sebaranMataKuliahController.smtByThnAjr)
route.get('/katNilaiByThnAjr/:thnAjr', sebaranMataKuliahController.katNilaiByThnAjr)
route.get('/autocompleteMakul/:codeThnAjr/:codeJnjPen/:codeFks/:codePrd', sebaranMataKuliahController.autocompleteMakul)
route.post('/create', sebaranMataKuliahController.post)
route.put('/update/:id', sebaranMataKuliahController.put)
route.put('/delete/:id', sebaranMataKuliahController.delete)

module.exports = route