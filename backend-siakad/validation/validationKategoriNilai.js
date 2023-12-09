const { body, check } = require('express-validator')

exports.validationKategoriNilai = [
    check('nilai_atas')
        .isInt()
        .withMessage('nilai atas harus berupa atas')
        .notEmpty()
        .withMessage('nilai atas tidak boleh kosong'),
    check('nilai_bawah')
        .isInt()
        .withMessage('nilai bawah harus berupa bawah')
        .notEmpty()
        .withMessage('nilai bawah tidak boleh kosong'),
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