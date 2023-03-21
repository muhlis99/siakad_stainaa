const {body, check } = require('express-validator')

exports.validationProdi = [
    check('code_jenjang_pendidikan')
        .notEmpty()
        .withMessage('code jenjang pendidikan boleh kosong'),
    check('code_fakultas')
        .notEmpty()
        .withMessage('code fakultas tidak boleh kosong'),
    check('nama_prodi')
        .notEmpty()
        .withMessage('nama prodi tidak boleh kosong')
]