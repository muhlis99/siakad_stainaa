const { body, check } = require('express-validator')

exports.validationPembimbingAkademik = [
    check('code_jenjang_pendidikan')
        .notEmpty()
        .withMessage(' jenjang pendidikan tidak boleh kosong'),
    check('code_fakultas')
        .notEmpty()
        .withMessage(' fakultas tidak boleh kosong'),
    check('code_prodi')
        .notEmpty()
        .withMessage(' prodi prodi tidak boleh kosong'),
    check('dosen')
        .notEmpty()
        .withMessage('dosen prodi tidak boleh kosong'),
    check('kouta_bimbingan')
        .isInt()
        .withMessage('harus berupa angka')
        .notEmpty()
        .withMessage('kouta bimbingan pengajuan prodi tidak boleh kosong'),
]