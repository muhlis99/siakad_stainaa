const { body, check } = require('express-validator')

exports.validationJadwalKuliah = [
    check('code_mata_kuliah')
        .notEmpty()
        .withMessage(' mata kuliah tidak boleh kosong'),
    check('code_fakultas')
        .notEmpty()
        .withMessage(' fakultas tidak boleh kosong'),
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
    check('code_ruang')
        .notEmpty()
        .withMessage(' ruang tidak boleh kosong'),
    check('tanggal_mulai')
        .notEmpty()
        .withMessage(' tanggal mulai tidak boleh kosong'),
    check('tanggal_selesai')
        .notEmpty()
        .withMessage(' tanggal selesai tidak boleh kosong'),
    check('jumlah_pertemuan')
        .notEmpty()
        .withMessage(' jumlah pertemuan  tidak boleh kosong'),
    check('hari')
        .notEmpty()
        .withMessage(' hari  tidak boleh kosong'),
    check('jam_mulai')
        .notEmpty()
        .withMessage(' jam mulai  tidak boleh kosong'),
    check('jam_selesai',)
        .notEmpty()
        .withMessage(' jam selesai tidak boleh kosong'),
    check('metode_pembelajaran',)
        .notEmpty()
        .withMessage('metode_pembelajaran tidak boleh kosong'),


]