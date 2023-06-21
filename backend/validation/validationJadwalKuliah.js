const { body, check } = require('express-validator')

exports.validationJadwalKuliah = [
    check('code_mata_kuliah')
        .notEmpty()
        .withMessage(' mata kuliah tidak boleh kosong'),
    check('code_prodi')
        .notEmpty()
        .withMessage(' prodi tidak boleh kosong'),
    check('code_semester')
        .notEmpty()
        .withMessage(' semester tidak boleh kosong'),
    check('code_tahun_ajaran')
        .notEmpty()
        .withMessage(' tahun ajaran tidak boleh kosong'),
    check('code_kelas')
        .notEmpty()
        .withMessage(' kelas tidak boleh kosong'),
    check('kapasitas')
        .notEmpty()
        .withMessage(' kapasitas tidak boleh kosong'),
    check('tanggal_mulai')
        .notEmpty()
        .withMessage(' tanggal mulai tidak boleh kosong'),
    check('tanggal_selesai')
        .notEmpty()
        .withMessage(' tanggal selesai tidak boleh kosong'),
    check('jumlah_pertemuan')
        .notEmpty()
        .withMessage(' jumlah pertemuan selesai tidak boleh kosong'),
]