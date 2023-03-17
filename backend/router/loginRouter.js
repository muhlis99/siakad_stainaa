const express = require('express')
const router = express.Router()
const loginController = require('../controllers/loginController.js')
const { validationLogin } = require('../validation/validationLogin.js')
const {validationRequest} = require('../validation/validationRequest.js')


router.get('/me', loginController.me)
router.post('/in',validationLogin,validationRequest,loginController.login)
router.delete('/out', loginController.logout)

module.exports = router