const { body, check } = require('express-validator')

exports.validationTahunAjaran = [
    check('dari_tahun')
        .notEmpty()
        .withMessage('dari_tahun tidak boleh kosong')
        .isInt()
        .withMessage('dari tahun harus berupa angka')
        .isLength({ min: 4, max: 4 })
        .withMessage('dari tahun yang anda masukkan harus  4 digit'),
    check('sampai_tahun')
        .notEmpty()
        .withMessage('sampai tahun tidak boleh kosong')
        .isInt()
        .withMessage('sampai tahun harus berupa angka')
        .isLength({ min: 4, max: 4 })
        .withMessage('sampai tahun yang anda masukkan harus  4 digit'),
    check('keterangan')
        .notEmpty()
        .withMessage('keterangan tidak boleh kosong')
]