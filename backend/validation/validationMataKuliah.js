const { body, check } = require('express-validator')

exports.validationMataKuliah = [
    check('nama_mata_kuliah')
        .notEmpty()
        .withMessage('nama mata kuliah tidak boleh kosong'),
    check('jenis_mata_kuliah')
        .notEmpty()
        .withMessage('jenis mata kuliah tidak boleh kosong'),
    check('code_jenjang_pendidikan')
        .notEmpty()
        .withMessage('jenjang pendidikan tidak boleh kosong'),
    check('code_prodi')
        .notEmpty()
        .withMessage('prodi tidak boleh kosong'),
    check('code_tahun_ajaran')
        .notEmpty()
        .withMessage('tahun ajaran tidak boleh kosong'),
    check('sks')
        .notEmpty()
        .withMessage('sks tidak boleh kosong'),
    check('tanggal_aktif')
        .notEmpty()
        .withMessage('tanggal aktif tidak boleh kosong'),
    check('tanggal_non_aktif')
        .notEmpty()
        .withMessage('tanggal non aktif tidak boleh kosong'),
]