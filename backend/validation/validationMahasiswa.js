const { body, check } = require('express-validator')
const mahasiswa = require('../models/mahasiswaModel.js')

exports.validationForm1 = [
    check('nik')
        .notEmpty()
        .withMessage('nik tidak boleh kosong')
        .isInt()
        .withMessage('nik harus berupa angka')
        .isLength({ min: 16, max: 16 })
        .withMessage('nik yang anda masukkan harus  16 digit'),
    check('nama')
        .notEmpty()
        .withMessage('nama tidak boleh kosong'),
    check('no_kk')
        .notEmpty()
        .withMessage('no kk tidak boleh kosong')
        .isInt()
        .withMessage('no kk harus berupa angka')
        .isLength({ min: 16, max: 16 })
        .withMessage('no kk yang anda masukkan harus  16 digit'),
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
        .withMessage('no hp yang anda masukkan harus  12 digit'),
    check('no_telepon')
        .notEmpty()
        .withMessage('no telepon tidak boleh kosong')
        .isInt()
        .withMessage('no telepon harus berupa angka')
        .isLength({ min: 12, max: 12 })
        .withMessage('no telepon yang anda masukkan harus  12 digit'),
    check('nisn')
        .notEmpty()
        .withMessage('nisn tidak boleh kosong')
        .isInt()
        .withMessage('nisn harus berupa angka')
        .isLength({ min: 10, max: 10 })
        .withMessage('nisn yang anda masukkan harus  10 digit'),
    check('penerima_kps')
        .notEmpty()
        .withMessage('penerima kps tidak boleh kosong'),
    check('npwp')
        .notEmpty()
        .withMessage('npwp tidak boleh kosong')
        .isInt()
        .withMessage('npwp harus berupa angka')
        .isLength({ min: 16, max: 16 })
        .withMessage('npwp yang anda masukkan harus  16 digit'),
    check('jalur_pendaftaran')
        .notEmpty()
        .withMessage('jalur pendaftaran tidak boleh kosong'),
    check('jenis_pendaftaran')
        .notEmpty()
        .withMessage('jenis pendaftaran tidak boleh kosong'),
]

exports.validationForm2 = [
    check('jalan')
        .notEmpty()
        .withMessage('jalan tidak boleh kosong'),
    check('dusun')
        .notEmpty()
        .withMessage('dusun tidak boleh kosong'),
    check('rt')
        .notEmpty()
        .withMessage('rt tidak boleh kosong'),
    check('rw')
        .notEmpty()
        .withMessage('rw tidak boleh kosong'),
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
    check('jenis_tinggal')
        .notEmpty()
        .withMessage('jenis tinggal tidak boleh kosong'),
    check('alat_transportasi')
        .notEmpty()
        .withMessage('alat transportasi tidak boleh kosong'),
]

exports.validationForm3 = [
    check('nik_ayah')
        .notEmpty()
        .withMessage('nik tidak boleh kosong')
        .isInt()
        .withMessage('nik harus berupa angka')
        .isLength({ min: 16, max: 16 })
        .withMessage('nik ayah  yang anda masukkan harus  16 digit'),
    check('nama_ayah')
        .notEmpty()
        .withMessage('nama ayah  tidak boleh kosong'),
    check('tahun_a')
        .notEmpty()
        .withMessage('tahun ayah tidak boleh kosong'),
    check('bulan_a')
        .notEmpty()
        .withMessage('bulan ayah tidak boleh kosong'),
    check('tanggal_a')
        .notEmpty()
        .withMessage('tanggal ayah tidak boleh kosong'),
    check('pekerjaan_ayah')
        .notEmpty()
        .withMessage('pekerjaan ayah tidak boleh kosong'),
    check('penghasilan_ayah')
        .notEmpty()
        .withMessage('penghasilan ayah tidak boleh kosong'),
    check('pendidikan_ayah')
        .notEmpty()
        .withMessage('pendidikan ayah tidak boleh kosong'),
    check('nik_ibu')
        .notEmpty()
        .withMessage('nik tidak boleh kosong')
        .isInt()
        .withMessage('nik harus berupa angka')
        .isLength({ min: 16, max: 16 })
        .withMessage('nik ibu  yang anda masukkan harus  16 digit'),
    check('nama_ibu')
        .notEmpty()
        .withMessage('nama ibu  tidak boleh kosong'),
    check('tahun_b')
        .notEmpty()
        .withMessage('tahun ibu tidak boleh kosong'),
    check('bulan_b')
        .notEmpty()
        .withMessage('bulan ibu tidak boleh kosong'),
    check('tanggal_b')
        .notEmpty()
        .withMessage('tanggal ibu tidak boleh kosong'),
    check('pekerjaan_ibu')
        .notEmpty()
        .withMessage('pekerjaan ibu tidak boleh kosong'),
    check('penghasilan_ibu')
        .notEmpty()
        .withMessage('penghasilan ayah tidak boleh kosong'),
    check('pendidikan_ayah')
        .notEmpty()
        .withMessage('pendidikan ayah tidak boleh kosong'),
]

exports.validationForm4 = [
    check('nik_wali')
        .notEmpty()
        .withMessage('nik tidak boleh kosong')
        .isInt()
        .withMessage('nik harus berupa angka')
        .isLength({ min: 16, max: 16 })
        .withMessage('nik wali  yang anda masukkan harus  16 digit'),
    check('nama_wali')
        .notEmpty()
        .withMessage('nama wali  tidak boleh kosong'),
    check('tahun_w')
        .notEmpty()
        .withMessage('tahun wali tidak boleh kosong'),
    check('bulan_w')
        .notEmpty()
        .withMessage('bulan wali tidak boleh kosong'),
    check('tanggal_w')
        .notEmpty()
        .withMessage('tanggal wali tidak boleh kosong'),
    check('pekerjaan_wali')
        .notEmpty()
        .withMessage('pekerjaan wali tidak boleh kosong'),
    check('penghasilan_wali')
        .notEmpty()
        .withMessage('penghasilan wali tidak boleh kosong'),
    check('pendidikan_wali')
        .notEmpty()
        .withMessage('pendidikan wali tidak boleh kosong'),
    check('mulai_semester')
        .notEmpty()
        .withMessage('mulai semester tidak boleh kosong'),
]