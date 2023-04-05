const {body, check } = require('express-validator')

exports.validationJenjangPendidikan = [
    check('nama_jenjang_pendidikan')
        .notEmpty()
        .withMessage('nama tidak boleh kosong'),
]