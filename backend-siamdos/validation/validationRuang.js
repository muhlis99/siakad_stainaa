const { body, check } = require('express-validator')

exports.validationRuang = [
    check('nama_ruang')
        .notEmpty()
        .withMessage('nama ruang tidak boleh kosong'),
    check('lokasi')
        .notEmpty()
        .withMessage('lokasi tidak boleh kosong'),
]