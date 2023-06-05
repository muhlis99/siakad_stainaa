const { body, check } = require('express-validator')

exports.validationKategoriNilai = [
    check('nilai_angka')
        .isInt()
        .withMessage('nilai angka harus berupa angka')
        .notEmpty()
        .withMessage('nilai angka tidak boleh kosong'),
    check('nilai_huruf')
        .notEmpty()
        .withMessage('nilai huruf tidak boleh kosong'),
    check('interfal_skor')
        .notEmpty()
        .withMessage('interfal skor tidak boleh kosong'),
    check('kategori')
        .notEmpty()
        .withMessage('kategori tidak boleh kosong'),
    check('keterangan')
        .notEmpty()
        .withMessage('keterangan tidak boleh kosong'),
]