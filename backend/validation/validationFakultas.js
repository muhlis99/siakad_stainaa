const {body, check } = require('express-validator')

exports.validationFakultas = [
    check('code_jenjang_pendidikan')
        .notEmpty()
        .withMessage("code jenjang pendidikan tidak boleh kosong"),
    check('nama_fakultas')
        .notEmpty()
        .withMessage('nama  fakultas tidak boleh kosong')
]