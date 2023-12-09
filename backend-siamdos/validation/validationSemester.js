const { body, check } = require('express-validator')

exports.validationSemester = [
    check('code_tahun_ajaran')
        .notEmpty()
        .withMessage('tahun ajaran tidak boleh kosong'),
    check('semester')
        .notEmpty()
        .withMessage('semester tidak boleh kosong'),
    check('tanggal_aktif')
        .notEmpty()
        .withMessage('tanggal aktif tidak boleh kosong'),
    check('keterangan')
        .notEmpty()
        .withMessage('keterangan tidak boleh kosong')
]