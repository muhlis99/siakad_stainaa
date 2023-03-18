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

exports.validationForgot = [
    check('email')
        .notEmpty()
        .withMessage('email tidak boleh kosong')
        .isEmail()
        .normalizeEmail()
        .withMessage('email tidak valid')
]

exports.validationVerifyCode = [
    check('code')
    .notEmpty()
    .withMessage('code tidak boleh kosong')
    .isInt()
    .withMessage('code harus berupa angka')
    .isLength({min:6, max:6})
    .withMessage('code yang anda masukkan kurang dari 6 digit')
]