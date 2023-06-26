const { Op } = require("sequelize")
const jadwalKuliahModel = require('../models/jadwalKuliahModel.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const prodiModel = require('../models/prodiModel.js')
const semesterModel = require('../models/semesterModel.js')
const tahunAjaranModel = require('../models/tahunAjaranModel.js')
const kelasModel = require('../models/kelasKuliahModel.js')
const ruangModel = require('../models/ruangModel.js')
const fakultasModel = require("../models/fakultasModel.js")


module.exports = {
    get: async (req, res, next) => {
        const { thnAjr, smt, fks, prd } = req.params
        await mataKuliahModel.findAll({
            include: [{
                model: semesterModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                where: { status: "aktif" }
            },],
            where: {
                code_tahun_ajaran: thnAjr,
                code_semester: smt,
                code_fakultas: fks,
                code_prodi: prd,
                status: "aktif"
            }
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All jadwal kuliah Success",
                    data: result,
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getByKelas: async (req, res, next) => {
        const { thnAjr, smt, fks, prd, makul, kls } = req.params
        await jadwalKuliahModel.findOne({
            include: [{
                model: semesterModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }, {
                model: kelasModel,
                where: { status: "aktif" }
            }, {
                model: mataKuliahModel,
                where: { status: "aktif" }
            }],
            where: {
                code_tahun_ajaran: thnAjr,
                code_semester: smt,
                code_fakultas: fks,
                code_prodi: prd,
                code_mata_kuliah: makul,
                code_kelas: kls,
                status: "aktif"
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data jadwal Kuliah Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data jadwal Kuliah Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    post: async (req, res, next) => {
        const { code_mata_kuliah, code_fakultas, code_prodi, code_semester, code_tahun_ajaran,
            code_kelas, code_ruang, tanggal_mulai, tanggal_selesai, jumlah_pertemuan,
            hari, jam_mulai, jam_selesai } = req.body

        const duplicateData = await jadwalKuliahModel.findAll({
            where: {
                code_fakultas: code_fakultas,
                code_prodi: code_prodi,
                code_tahun_ajaran: code_tahun_ajaran,
                code_semester: code_semester,
                status: 'aktif'
            }
        })

        const start = duplicateData.map(el => {
            let jamMulai = el.jam_mulai
            let AjamMulai = jamMulai.split(':')
            return (+AjamMulai[0]) * 60 + (+AjamMulai[1])
        })

        const end = duplicateData.map(el => {
            let jamselesai = el.jam_selesai
            let Ajamselesai = jamselesai.split(':')
            return (+Ajamselesai[0]) * 60 + (+Ajamselesai[1])
        })

        let jam = jam_mulai
        let ajam = jam.split(':')
        let i = (+ajam[0]) * 60 + (+ajam[1])

        const validasiJamMulai = start.map(e => {
            end.map(le => {
                return i >= e && i < le
            })
        })

        let jams = jam_selesai
        let ajams = jams.split(':')
        let s = (+ajams[0]) * 60 + (+ajams[1])
        const validasiJamSelesai = start.map(e => {
            end.map(le => {
                return s >= e && i < le
            })
        })

        const daysRoom = await jadwalKuliahModel.findOne({
            where: {
                code_fakultas: code_fakultas,
                code_prodi: code_prodi,
                code_tahun_ajaran: code_tahun_ajaran,
                code_semester: code_semester,
                hari: hari,
                code_ruang: code_ruang,
                jam_mulai: jam_mulai,
                jam_selesai: jam_selesai,
                status: 'aktif'
            }
        })

        if (daysRoom && validasiJamMulai && validasiJamSelesai) return res.status(401).json({ message: "Jadwal kuliah bentrok" })

        function randomAngka(params) {
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var charLength = chars.length;
            var result = ''
            for (var i = 0; i < params; i++) {
                result += chars.charAt(Math.floor(Math.random() * charLength))
            }
            return result
        }
        let randomNumber = Math.floor(10000 + Math.random() * 90000)
        const codeJadwalKuliah = randomAngka(2) + randomNumber
        await jadwalKuliahModel.create({
            code_jadwal_kuliah: codeJadwalKuliah,
            code_mata_kuliah: code_mata_kuliah,
            code_fakultas: code_fakultas,
            code_prodi: code_prodi,
            code_semester: code_semester,
            code_tahun_ajaran: code_tahun_ajaran,
            code_kelas: code_kelas,
            code_ruang: code_ruang,
            tanggal_mulai: tanggal_mulai,
            tanggal_selesai: tanggal_selesai,
            jumlah_pertemuan: jumlah_pertemuan,
            hari: hari,
            jam_mulai: jam_mulai,
            jam_selesai: jam_selesai,
            dose_pengajar: "",
            dose_pengganti: "",
            status: "aktif"
        }).then(result => {
            res.status(201).json({
                message: "Data jadwal Kuliah success Ditambahkan",
            })
        }).catch(err => {
            next(err)
        })

    },

    put: async (req, res, next) => {
        const id = req.params.id
        const { code_mata_kuliah, code_fakultas, code_prodi, code_semester, code_tahun_ajaran,
            code_kelas, code_ruang, tanggal_mulai, tanggal_selesai, jumlah_pertemuan,
            hari, jam_mulai, jam_selesai } = req.body
        const jadwalKuliahModelUse = await jadwalKuliahModel.findOne({
            include: [{
                model: semesterModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }, {
                model: kelasModel,
                where: { status: "aktif" }
            }, {
                model: mataKuliahModel,
                where: { status: "aktif" }
            }],
            where: {
                id_jadwal_kuliah: id,
                status: "aktif"
            }
        })

        if (!jadwalKuliahModelUse) return res.status(401).json({ message: "Data jadwal kuliah tidak ditemukan" })
        const duplicateData = await jadwalKuliahModel.findAll({
            where: {
                code_fakultas: code_fakultas,
                code_prodi: code_prodi,
                code_tahun_ajaran: code_tahun_ajaran,
                code_semester: code_semester,
                status: 'aktif'
            }
        })

        const start = duplicateData.map(el => {
            let jamMulai = el.jam_mulai
            let AjamMulai = jamMulai.split(':')
            return (+AjamMulai[0]) * 60 + (+AjamMulai[1])
        })

        const end = duplicateData.map(el => {
            let jamselesai = el.jam_selesai
            let Ajamselesai = jamselesai.split(':')
            return (+Ajamselesai[0]) * 60 + (+Ajamselesai[1])
        })
        let jam = jam_mulai
        let ajam = jam.split(':')
        let i = (+ajam[0]) * 60 + (+ajam[1])

        const validasiJamMulai = start.map(e => {
            end.map(le => {
                return i >= e && i < le
            })
        })

        let jams = jam_selesai
        let ajams = jams.split(':')
        let s = (+ajams[0]) * 60 + (+ajams[1])
        const validasiJamSelesai = start.map(e => {
            end.map(le => {
                return s >= e && i < le
            })
        })

        const daysRoom = await jadwalKuliahModel.findOne({
            where: {
                code_fakultas: code_fakultas,
                code_prodi: code_prodi,
                code_tahun_ajaran: code_tahun_ajaran,
                code_semester: code_semester,
                hari: hari,
                code_ruang: code_ruang,
                jam_mulai: jam_mulai,
                jam_selesai: jam_selesai,
                status: 'aktif'
            }
        })

        if (daysRoom && validasiJamMulai && validasiJamSelesai) return res.status(401).json({ message: "Jadwal kuliah bentrok" })
        await jadwalKuliahModel.update({
            code_mata_kuliah: code_mata_kuliah,
            code_fakultas: code_fakultas,
            code_prodi: code_prodi,
            code_semester: code_semester,
            code_tahun_ajaran: code_tahun_ajaran,
            code_kelas: code_kelas,
            code_ruang: code_ruang,
            tanggal_mulai: tanggal_mulai,
            tanggal_selesai: tanggal_selesai,
            jumlah_pertemuan: jumlah_pertemuan,
            hari: hari,
            jam_mulai: jam_mulai,
            jam_selesai: jam_selesai,
            dose_pengajar: "",
            dose_pengganti: "",
            status: "aktif"
        }, {
            where: {
                id_jadwal_kuliah: id
            }
        }).then(result => {
            res.status(201).json({
                message: "Data jadwal Kuliah success Diupdate",
            })
        }).catch(err => {
            next(err)
        })
    },

    deleteStatus: async (req, res, next) => {
        const id = req.params.id
        const jadwalKuliahModelUse = await jadwalKuliahModel.findOne({
            include: [{
                model: semesterModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }, {
                model: kelasModel,
                where: { status: "aktif" }
            }, {
                model: mataKuliahModel,
                where: { status: "aktif" }
            }],
            where: {
                id_jadwal_kuliah: id,
                status: "aktif"
            }
        })
        if (!jadwalKuliahModelUse) return res.status(401).json({ message: "Data jadwal kuliah tidak ditemukan" })
        const jadwalKuliah = await jadwalKuliahModel.update({
            status: "tidak"
        }, {
            where: {
                id_jadwal_kuliah: id
            }
        })
            .then(result => {
                res.status(201).json({
                    message: "Data jadwal kuliah success Dihapus",
                })
            }).
            catch(err => {
                next(err)
            })

    }
}