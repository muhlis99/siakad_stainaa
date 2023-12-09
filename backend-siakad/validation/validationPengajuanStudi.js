const { body, check } = require('express-validator')

exports.validationPengajuanStudi = [
    check('code_tahun_ajaran')
        .notEmpty()
        .withMessage('tahun ajaran tidak boleh kosong'),
    check('code_semester')
        .notEmpty()
        .withMessage('semester tidak boleh kosong'),
    check('code_jenjang_pendidikan')
        .notEmpty()
        .withMessage(' jenjang pendidikan tidak boleh kosong'),
    check('code_fakultas')
        .notEmpty()
        .withMessage(' fakultas tidak boleh kosong'),
    check('code_prodi')
        .notEmpty()
        .withMessage(' prodi prodi tidak boleh kosong'),
    check('nim')
        .notEmpty()
        .withMessage('mahasiswa prodi tidak boleh kosong'),
    check('tanggal_pengajuan')
        .notEmpty()
        .withMessage('tanggal pengajuan prodi tidak boleh kosong'),
    check('pengajuan')
        .notEmpty()
        .withMessage(' pengajuan prodi tidak boleh kosong'),
    check('alasan')
        .notEmpty()
        .withMessage(' alasan prodi tidak boleh kosong')
]