const { body, check } = require('express-validator')

exports.validationKelas = [
    check('nama_kelas')
        .notEmpty()
        .withMessage('nama kelas tidak boleh kosong'),
    check('code_ruang')
        .notEmpty()
        .withMessage('code ruang tidak boleh kosong'),
    check('code_jenjang_pendidikan')
        .notEmpty()
        .withMessage('jenjang pendidikan tidak boleh kosong'),
    check('code_fakultas')
        .notEmpty()
        .withMessage('fakultas aktif tidak boleh kosong'),
    check('code_prodi')
        .notEmpty()
        .withMessage('prodi tidak boleh kosong'),
    check('dosen_wali')
        .notEmpty()
        .withMessage('dosen wali tidak boleh kosong'),
]