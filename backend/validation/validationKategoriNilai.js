const { body, check } = require('express-validator')

exports.validationKategoriNilai = [
    check('angka')
        .notEmpty()
        .withMessage('angka tidak boleh kosong'),
    check('predikat')
        .notEmpty()
        .withMessage('predikat tidak boleh kosong'),
    check('keterangan')
        .notEmpty()
        .withMessage('keterangan tidak boleh kosong'),
]