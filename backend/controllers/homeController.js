const { Op, Sequelize } = require("sequelize")
const dosenModel = require("../models/dosenModel")
const mahasiswaModel = require("../models/mahasiswaModel")
const prodiModel = require("../models/prodiModel")
const jadwalPertemuanModel = require("../models/jadwalPertemuanModel")
const jadwalKuliahModel = require("../models/jadwalKuliahModel")
const krsModel = require('../models/krsModel')
const mataKuliahModel = require("../models/mataKuliahModel")
const historyMahasiswa = require("../models/historyMahasiswaModel")

module.exports = {
    totalMahasiswaPutera: async (req, res, next) => {
        await mahasiswaModel.count({
            where: {
                jenis_kelamin: "l",
                status: "aktif"
            }
        }).then(result => {
            res.status(200).json({
                message: "total mahasisawa putera succes",
                data: result,
            })
        }).catch(err => {
            next(err)
        })
    },

    totalMahasiswaPuteri: async (req, res, next) => {
        await mahasiswaModel.count({
            where: {
                jenis_kelamin: "p",
                status: "aktif"
            }
        }).then(result => {
            res.status(200).json({
                message: "total mahasisawa puteri succes",
                data: result,
            })
        }).catch(err => {
            next(err)
        })
    },

    totalDosen: async (req, res, next) => {
        await dosenModel.count({
            where: {
                status: "aktif"
            }
        }).then(result => {
            res.status(200).json({
                message: "total dosen  succes",
                data: result,
            })
        }).catch(err => {
            next(err)
        })
    },

    totalProdi: async (req, res, next) => {
        await prodiModel.count({
            where: {
                status: "aktif"
            }
        }).then(result => {
            res.status(200).json({
                message: "total prodi  succes",
                data: result,
            })
        }).catch(err => {
            next(err)
        })
    },

    diagramMahasiswa: async (req, res, next) => {
        await mahasiswaModel.findAll({
            attributes: [
                [Sequelize.literal('YEAR(tanggal_masuk_kuliah)'), 'tahun'],
                [Sequelize.literal('COUNT(id_mahasiswa)'), 'jumlahMahasiswa']
            ],
            where: {
                nim: { [Op.ne]: null },
                tanggal_masuk_kuliah: { [Op.ne]: null },
                status: "aktif",
            },
            group: [[Sequelize.literal('YEAR(tanggal_masuk_kuliah)')]]
        }).then(result => {
            res.status(200).json({
                message: "total mahasiswa  succes",
                data: result,
            })
        }).catch(err => {
            console.log(err);
        })
    },

    diagramDosen: async (req, res, next) => {
        await dosenModel.findAll({
            attributes: [
                [Sequelize.literal('YEAR(tanggal_mulai)'), 'tahun'],
                [Sequelize.literal('COUNT(id_dosen)'), 'jumlahDosen']
            ],
            where: {
                tanggal_mulai: { [Op.ne]: null },
                status: "aktif",
            },
            group: [[Sequelize.literal('YEAR(tanggal_mulai)')]]
        }).then(result => {
            res.status(200).json({
                message: "total dosen  succes",
                data: result,
            })
        }).catch(err => {
            console.log(err);
        })
    },

    jadwalKuliahNowMahasiswa: async (req, res, next) => {
        const date = new Date().toISOString().substring(0, 10)
        const nim = req.params.nim
        const dataKrsMahasiswa = await krsModel.findAll({
            where: {
                nim: nim,
                status_krs: "setuju",
                status: "aktif"
            }
        })
        if (!dataKrsMahasiswa) return res.status(404).json({ message: "data tidak ditemukan" })
        const dataCodeMataKuliah = dataKrsMahasiswa.map(i => { return i.code_mata_kuliah })
        const dataJadwalKuliah = await jadwalKuliahModel.findAll({
            where: {
                code_mata_kuliah: dataCodeMataKuliah,
                status: "aktif"
            }
        })
        if (!dataJadwalKuliah) return res.status(404).json({ message: "data tidak ditemukan" })
        const dataCodeJadwalKuliah = dataJadwalKuliah.map(n => { return n.code_jadwal_kuliah })
        await jadwalPertemuanModel.findAll({
            include: [{
                model: jadwalKuliahModel,
                include: [{
                    model: mataKuliahModel
                }]
            }],
            where: {
                tanggal_pertemuan: date,
                code_jadwal_kuliah: dataCodeJadwalKuliah,
                status: "aktif"
            }
        }).then(result => {
            res.status(200).json({
                message: "data jadwal kuliah now mahasiswa",
                data: result,
            })
        }).catch(err => {
            next(err)
        })
    },

    totalSksDanProdi: async (req, res, next) => {
        const nim = req.params.nim
        const dataProdiMahasiswa = await historyMahasiswa.findOne({
            include: [{
                model: prodiModel
            }],
            where: {
                nim: nim,
                status: "aktif"
            }
        })
        if (!dataProdiMahasiswa) return res.status(404).json({ message: "data mahsiswa tidak ditemukan" })
        const dataKrsMahasiswa = await krsModel.findAll({
            where: {
                nim: nim,
                status_krs: "setuju",
                status: "aktif"
            }
        })
        if (!dataKrsMahasiswa) return res.status(404).json({ message: "data tidak ditemukan" })
        const dataCodeMataKuliah = dataKrsMahasiswa.map(i => { return i.code_mata_kuliah })
        await mataKuliahModel.sum('sks', {
            where: {
                code_mata_kuliah: dataCodeMataKuliah,
                status: "aktif",
                status_makul: "paket"
            }
        }).then(result => {
            res.status(201).json({
                message: "data total sks dan prodi successfuly",
                data: {
                    totalSks: result,
                    prodi: dataProdiMahasiswa.prodis[0].nama_prodi
                }
            })
        }).catch(err => {
            next(err)
        })
    }
}