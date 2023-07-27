const { body, check } = require('express-validator')
const registrasi = require('../models/loginModel.js')


exports.validationRegistrasi = [
    check('username')
        .notEmpty()
        .withMessage('username tidak boleh kosong'),
    check('email')
        .notEmpty()
        .withMessage('email tidak boleh kosong')
        .isEmail()
        .normalizeEmail()
        .withMessage('email tidak valid')
        .custom(value => {
            return registrasi.findOne({
                where: {
                    email: value
                }
            })
                .then(user => {
                    if (user) {
                        return Promise.reject('email yang anda masukkan sudah ada')
                    }
                })
        }),
    check('password')
        .notEmpty()
        .withMessage('password tidak boleh kosong')
        .isLength({ min: 8 })
        .withMessage('password tidak kuat'),
    check('confirmPassword')
        .notEmpty()
        .withMessage('conforirm password tidak boleh kosong')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('confirm password tidak sesuai dengan password')
            }
            return true
        }),
    check('role')
        .notEmpty()
        .withMessage('role tidak boleh kosong')
]