const { body, check } = require('express-validator')
const jadwalKuliahMingguanModel = require("../models/jadwalKuliahMingguan.js")

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
    check('dataMingguan')
        .custom(value => {
            const A = value.map(a => {
                return a.hari
            })
            return jadwalKuliahMingguanModel.findOne({
                where: {
                    hari: A
                }
            }).then(AA => {
                if (AA) {
                    return Promise.reject('hari yang anda masukkan sudah ada')
                }
            })
        }),
    check('dataMingguan')
        .custom(value => {
            const B = value.map(b => {
                return b.jam_mulai
            })
            return jadwalKuliahMingguanModel.findOne({
                where: {
                    jam_mulai: B
                }
            }).then(BB => {
                if (BB) {
                    return Promise.reject('jam mulai yang anda masukkan sudah ada')
                }
            })
        }),
    check('dataMingguan')
        .custom(value => {
            const C = value.map(c => {
                return c.jam_selesai
            })
            return jadwalKuliahMingguanModel.findOne({
                where: {
                    jam_selesai: C
                }
            }).then(CC => {
                if (CC) {
                    return Promise.reject('jam selesai yang anda masukkan sudah ada')
                }
            })
        }),
    check('dataMingguan')
        .custom(value => {
            const D = value.map(d => {
                return d.ruang
            })
            return jadwalKuliahMingguanModel.findOne({
                where: {
                    ruang: D
                }
            }).then(DDDD => {
                if (DDDD) {
                    return Promise.reject('ruang yang anda masukkan sudah ada')
                }
            })
        }),
]