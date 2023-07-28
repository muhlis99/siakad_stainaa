const express = require('express')
const route = express.Router()
const dosenPengajarController = require('../controllers/dosenPengajarController.js')


route.get('/autocompleteDosenPengajar', dosenPengajarController.autocompleteDosenPengajar)
route.get('/getById/:id', dosenPengajarController.getById)
route.put('/create', dosenPengajarController.post)
route.put('/update/:id', dosenPengajarController.put)
route.put('/delete/:id', dosenPengajarController.delete)
route.put('/createPengganti', dosenPengajarController.postPengganti)
route.put('/updatePengganti/:id', dosenPengajarController.putPengganti)
route.put('/deletePengganti/:id', dosenPengajarController.deletePengganti)

module.exports = route