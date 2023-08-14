const { body, check } = require('express-validator')
const dosen = require('../models/dosenModel.js')

exports.validationForm1 = [
    check('nidn')
        .notEmpty()
        .withMessage('nidn tidak boleh kosong')
        .isInt()
        .withMessage('nidn harus berupa angka')
        .isLength({ min: 8, max: 8 })
        .withMessage('nidn yang anda masukkan harus  8 digit'),
    check('nip_ynaa')
        .notEmpty()
        .withMessage('nip ynaa tidak boleh kosong')
        .isInt()
        .withMessage('nip ynaa harus berupa angka')
        .isLength({ min: 8, max: 8 })
        .withMessage('nip ynaa yang anda masukkan harus  8 digit'),
    check('nama')
        .notEmpty()
        .withMessage('nama tidak boleh kosong'),
    check('jenis_kelamin')
        .notEmpty()
        .withMessage('jenis kelamin tidak boleh kosong'),
    check('tempat_lahir')
        .notEmpty()
        .withMessage('tempat lahir tidak boleh kosong'),
    check('tahun')
        .notEmpty()
        .withMessage('tahun tidak boleh kosong'),
    check('bulan')
        .notEmpty()
        .withMessage('bulan tidak boleh kosong'),
    check('tanggal')
        .notEmpty()
        .withMessage('tanggal tidak boleh kosong'),
    check('email')
        .notEmpty()
        .withMessage('email tidak boleh kosong')
        .isEmail()
        .normalizeEmail()
        .withMessage('email tidak valid'),
    check('no_hp')
        .notEmpty()
        .withMessage('no hp tidak boleh kosong')
        .isInt()
        .withMessage('no hp harus berupa angka')
        .isLength({ min: 12, max: 12 })
        .withMessage('no hp yang anda masukkan harus  12 digit'),
    check('no_telepon')
        .notEmpty()
        .withMessage('no telepon tidak boleh kosong')
        .isInt()
        .withMessage('no telepon harus berupa angka')
        .isLength({ min: 12, max: 12 })
        .withMessage('no telepon yang anda masukkan harus  12 digit'),
]

exports.validationForm2 = [
    check('alamat_lengkap')
        .notEmpty()
        .withMessage('alamat lengkap tidak boleh kosong'),
    check('kode_pos')
        .notEmpty()
        .withMessage('kode_pos tidak boleh kosong')
        .isInt()
        .withMessage('kode pos harus berupa angka')
        .isLength({ min: 5 })
        .withMessage('kode pos tidak boleh kurang dari 5 digit '),
    check('negara')
        .notEmpty()
        .withMessage('negara tidak boleh kosong'),
    check('provinsi')
        .notEmpty()
        .withMessage('provinsi tidak boleh kosong'),
    check('kabupaten')
        .notEmpty()
        .withMessage('kabupaten tidak boleh kosong'),
    check('kecamatan')
        .notEmpty()
        .withMessage('kecamatan tidak boleh kosong'),
    check('desa')
        .notEmpty()
        .withMessage('desa tidak boleh kosong'),
    check('pendidikan_terakhir')
        .notEmpty()
        .withMessage('pendidikan terakkhir tidak boleh kosong'),
    check('alat_transportasi')
        .notEmpty()
        .withMessage('alat transportasi tidak boleh kosong'),
    check('status_kepegawaian')
        .notEmpty()
        .withMessage('status kepegawaian tidak boleh kosong'),
]