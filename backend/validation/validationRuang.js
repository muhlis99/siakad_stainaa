const { body, check } = require('express-validator')

exports.validationRuang = [
    check('nama_ruang')
        .notEmpty()
        .withMessage('nama ruang tidak boleh kosong'),
    check('code_jenjang_pendidikan')
        .notEmpty()
        .withMessage('jenjang pendidikan tidak boleh kosong'),
    check('code_fakultas')
        .notEmpty()
        .withMessage('fakultas aktif tidak boleh kosong'),
    check('code_prodi')
        .notEmpty()
        .withMessage('prodi tidak boleh kosong')
]