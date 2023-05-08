const express = require('express')
const route = express.Router()
const dosenController = require('../controllers/dosenController.js')

route.get('/all', dosenController.getAll)
route.get('/getById/:id', dosenController.getById)

module.exports = route