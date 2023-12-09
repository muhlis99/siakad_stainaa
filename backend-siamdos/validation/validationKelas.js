const { body, check } = require('express-validator')

exports.validationKelas = [
    check('nama_kelas')
        .notEmpty()
        .withMessage('nama kelas tidak boleh kosong'),
    check('code_jenjang_pendidikan')
        .notEmpty()
        .withMessage('jenjang pendidikan tidak boleh kosong'),
    check('code_fakultas')
        .notEmpty()
        .withMessage('fakultas aktif tidak boleh kosong'),
    check('code_prodi')
        .notEmpty()
        .withMessage('prodi tidak boleh kosong'),
]