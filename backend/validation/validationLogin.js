const {body, check } = require('express-validator')
const registrasi = require('../models/loginModel.js')

exports.validationLogin = [
    check('name')
        .notEmpty()
        .withMessage('nama tidak boleh kosong'),
    check('password')
        .notEmpty()
        .withMessage('password tidak boleh kosong')
]