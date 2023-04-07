const { body, check } = require('express-validator')
const mahasiswa = require('../models/mahasiswaModel.js')

exports.validationForm1 = [
    check('nik')
        .notEmpty()
        .withMessage('nik tidak boleh kosong')
        .isInt()
        .withMessage('nik harus berupa angka')
        .isLength({ min: 16, max: 16 })
        .withMessage('nik yang anda masukkan kurang dari 16 digit'),
    check('nama')
        .notEmpty()
        .withMessage('nama tidak boleh kosong'),
    check('no_kk')
        .notEmpty()
        .withMessage('no kk tidak boleh kosong')
        .isInt()
        .withMessage('no kk harus berupa angka')
        .isLength({ min: 16, max: 16 })
        .withMessage('no kk yang anda masukkan kurang dari 16 digit'),
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
        .withMessage('email tidak valid')
        .custom(value => {
            return mahasiswa.findOne({
                where: {
                    email: value
                }
            })
                .then(user => {
                    if (user) {
                        return Promise.reject('email yang anda masukkan sudah ada')
                    }
                })
        }),
    check('no_hp')
        .notEmpty()
        .withMessage('no hp tidak boleh kosong')
        .isInt()
        .withMessage('no hp harus berupa angka')
        .isLength({ min: 12, max: 12 })
        .withMessage('no hp yang anda masukkan kurang dari 16 digit'),
    check('no_telepon')
        .notEmpty()
        .withMessage('no telepon tidak boleh kosong')
        .isInt()
        .withMessage('no telepon harus berupa angka')
        .isLength({ min: 12, max: 12 })
        .withMessage('no telepon yang anda masukkan kurang dari 16 digit'),
    check('nisn')
        .notEmpty()
        .withMessage('nisn tidak boleh kosong')
        .isInt()
        .withMessage('nisn harus berupa angka')
        .isLength({ min: 10, max: 10 })
        .withMessage('nisn yang anda masukkan kurang dari 16 digit'),
    check('penerima_kps')
        .notEmpty()
        .withMessage('penerima kps tidak boleh kosong'),
    check('npwp')
        .notEmpty()
        .withMessage('nisn tidak boleh kosong')
        .isInt()
        .withMessage('nisn harus berupa angka')
        .isLength({ min: 16, max: 16 })
        .withMessage('nisn yang anda masukkan kurang dari 16 digit'),
    check('jalur_pendaftaran')
        .notEmpty()
        .withMessage('jalur pendaftaran tidak boleh kosong'),
    check('jenis_pendaftaran')
        .notEmpty()
        .withMessage('jenis pendaftaran tidak boleh kosong'),
]