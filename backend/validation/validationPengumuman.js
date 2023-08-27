const { body, check } = require('express-validator')

exports.validationPengumuman = [
    check('tanggal_pengumuman')
        .notEmpty()
        .withMessage('tanggal pengumuman tidak boleh kosong'),
    check('judul_pengumuman')
        .notEmpty()
        .withMessage('judul pengumuman tidak boleh kosong'),
    check('pengumuman')
        .notEmpty()
        .withMessage('pengumumantidak boleh kosong'),
    check('level')
        .notEmpty()
        .withMessage(' level tidak boleh kosong'),
]