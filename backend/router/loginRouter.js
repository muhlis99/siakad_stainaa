const express = require('express')
const router = express.Router()
const loginController = require('../controllers/loginController.js')
const { validationLogin, validationForgot, validationVerifyCode } = require('../validation/validationLogin.js')
const { validationRequest } = require('../validation/validationRequest.js')


router.get('/me', loginController.me)
router.post('/in', validationLogin, validationRequest, loginController.login)
router.delete('/out', loginController.logout)
router.post('/forgot', validationForgot, validationRequest, loginController.forgot)
router.post('/verify', validationVerifyCode, validationRequest, loginController.verifyCode)
router.put('/resetPasswordByForgot/:id', loginController.resetPasswordByForgot)

module.exports = router

