const { Op } = require("sequelize")
const jadwalKuliahModel = require('../models/jadwalKuliahModel.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const prodiModel = require('../models/prodiModel.js')
const semesterModel = require('../models/semesterModel.js')
const tahunAjaranModel = require('../models/tahunAjaranModel.js')
const kelasModel = require('../models/kelasKuliahModel.js')
const ruangModel = require('../models/ruangModel.js')
const fakultasModel = require("../models/fakultasModel.js")
const jenjangPendidikanModel = require("../models/jenjangPendidikanModel.js")
const dosenModel = require("../models/dosenModel.js")
const historyMahasiswa = require("../models/historyMahasiswaModel.js")
const krsModel = require("../models/krsModel.js")
const mahasiswaModel = require("../models/mahasiswaModel.js")
const jadwalPertemuanModel = require("../models/jadwalPertemuanModel.js")
const sebaranMataKuliah = require('../models/sebaranMataKuliah.js')
const path = require('path')
const fs = require('fs')


module.exports = {
    // user mahasiswa
    getJadwalMahasiswa: async (req, res, next) => {
        const nim = req.params.nim
        const dataMahasiswa = await historyMahasiswa.findOne({
            include: [{
                model: mahasiswaModel,
                attributes: ["nama"]
            }, {
                model: semesterModel,
                attributes: ['semester']
            }, {
                model: tahunAjaranModel,
                attributes: ["tahun_ajaran"]
            }, {
                model: fakultasModel,
                attributes: ["nama_fakultas"]
            }, {
                model: prodiModel,
                attributes: ["nama_prodi"]
            }],
            where: {
                nim: nim,
                status: "aktif"
            }
        })
        if (!dataMahasiswa) return res.status(404).json({ message: "mahasiswa tidak ditemukan" })
        const dataKrsMahasiswa = await krsModel.findAll({
            where: {
                nim: nim,
                code_jenjang_pendidikan: dataMahasiswa.code_jenjang_pendidikan,
                code_fakultas: dataMahasiswa.code_fakultas,
                code_prodi: dataMahasiswa.code_prodi,
                code_tahun_ajaran: dataMahasiswa.code_tahun_ajaran,
                code_semester: dataMahasiswa.code_semester,
                status_krs: "setuju",
                status: "aktif"
            }
        })
        if (!dataKrsMahasiswa) return res.status(404).json({ message: "data tidak ditemukan" })
        const dataMakulMahasiswa = dataKrsMahasiswa.map(i => { return i.code_mata_kuliah })
        const dataJadwalKuliah = await jadwalKuliahModel.findAll({
            where: {
                code_mata_kuliah: dataMakulMahasiswa,
                status: "aktif"
            }
        })
        if (!dataJadwalKuliah) return res.status(404).json({ message: "data tidak ditemukan" })
        const dataCodeJadwalKuliah = dataJadwalKuliah.map(t => { return t.code_jadwal_kuliah })
        let dataDate = []
        for (let index = 1; index <= 7; index++) {
            const date = new Date()
            let nextDay = new Date(date.setDate(date.getDate() + index)).toISOString().substring(0, 10)
            dataDate.push(nextDay)
        }
        await jadwalPertemuanModel.findAll({
            include: [
                {
                    attributes: ['hari', 'jam_mulai', 'jam_selesai', 'dosen_pengajar'],
                    model: jadwalKuliahModel,
                    status: "aktif",
                    order: [
                        ['hari', 'ASC']
                    ],
                    include: [
                        {
                            attributes: ['status_makul', 'status_bobot_makul'],
                            model: sebaranMataKuliah,
                            status: "aktif",
                            include: [
                                {
                                    attributes: ['nama_mata_kuliah'],
                                    model: mataKuliahModel
                                }
                            ]
                        }, {
                            attributes: ['nama_ruang', 'lokasi'],
                            model: ruangModel,
                            status: "aktif"
                        }, {
                            attributes: ['nama'],
                            model: dosenModel,
                            as: "dosenPengajar"
                        }, {
                            attributes: ['nama_kelas'],
                            model: kelasModel
                        }
                    ]
                }
            ],
            attributes: ['id_jadwal_pertemuan', 'code_jadwal_pertemuan',
                'pertemuan', 'tanggal_pertemuan', 'jenis_pertemuan',
                'metode_pembelajaran', 'url_online'],
            where: {
                code_jadwal_kuliah: dataCodeJadwalKuliah,
                tanggal_pertemuan: dataDate,
                status: "aktif"
            },
            order: [
                ['tanggal_pertemuan', 'ASC']
            ]
        }).then(result => {
            res.status(201).json({
                message: "Data jadwal kuliah mahasiswa successfuly",
                identitas: {
                    nim: nim,
                    nama: dataMahasiswa.mahasiswas[0].nama,
                    semester: dataMahasiswa.semesters[0].semester,
                    tahun_ajaran: dataMahasiswa.tahunAjarans[0].tahun_ajaran,
                    fakultas: dataMahasiswa.fakultas[0].nama_fakultas,
                    prodi: dataMahasiswa.prodis[0].nama_prodi
                },
                data: result
            })
        }).then(err => {
            next(err)
        })
    },

    // user dosen
    jadwalKuliahDosen: async (req, res, next) => {
        const { thnAjr, smt, jenjPen, fks, prd, nipy } = req.params
        const dataDosenUse = await dosenModel.findOne({
            where: {
                nip_ynaa: nipy,
                status: "aktif"
            }
        })
        if (!dataDosenUse) return res.status(404).json({ message: "data tidak ditemukan" })
        await jadwalKuliahModel.findAll({
            attributes: ["id_jadwal_kuliah", "code_jadwal_kuliah", "code_mata_kuliah", "code_jenjang_pendidikan",
                "code_fakultas", "code_prodi", "code_semester", "code_tahun_ajaran", "code_kelas", "code_ruang", "status"],
            where: {
                dosen_pengajar: nipy,
                code_tahun_ajaran: thnAjr,
                code_semester: smt,
                code_jenjang_pendidikan: jenjPen,
                code_fakultas: fks,
                code_prodi: prd,
                status: "aktif"
            }
        }).then(result => {
            res.status(201).json({
                message: "Data jadwal kuliah Dosen successfuly",
                data: result
            })
        }).catch(err => {
            next(err)
        })
    },

    JadwalPertemuanDosen: async (req, res, next) => {
        const { thnAjr, smt, jenjPen, fks, prd, nipy } = req.params
        const dataDosen = await dosenModel.findOne({
            where: {
                nip_ynaa: nipy,
                status: "aktif"
            }
        })
        if (!dataDosen) return res.status(404).json({ message: "dsoen tidak ditemukan" })
        const dataJadwalKuliah = await jadwalKuliahModel.findAll({
            where: {
                code_tahun_ajaran: thnAjr,
                code_semester: smt,
                code_jenjang_pendidikan: jenjPen,
                code_fakultas: fks,
                code_prodi: prd,
                dosen_pengajar: nipy,
                status: "aktif"
            }
        })
        if (!dataJadwalKuliah) return res.status(404).json({ message: "data tidak ditemukan" })
        const dataCodeJadwalKuliah = dataJadwalKuliah.map(t => { return t.code_jadwal_kuliah })
        let dataDate = []
        for (let index = 1; index <= 7; index++) {
            const date = new Date()
            let nextDay = new Date(date.setDate(date.getDate() + index)).toISOString().substring(0, 10)
            dataDate.push(nextDay)
        }
        await jadwalPertemuanModel.findAll({
            include: [
                {
                    attributes: ['hari', 'jam_mulai', 'jam_selesai', 'dosen_pengajar', 'dosen_pengganti'],
                    model: jadwalKuliahModel,
                    status: "aktif",
                    include: [{
                        attributes: ['status_makul', 'status_bobot_makul'],
                        model: sebaranMataKuliah,
                        status: "aktif",
                        include: [{
                            attributes: ['code_mata_kuliah', 'nama_mata_kuliah', 'jenis_mata_kuliah', 'sks'],
                            model: mataKuliahModel
                        }]
                    }, {
                        model: ruangModel,
                        status: "aktif"
                    }]
                }

            ],
            where: {
                code_jadwal_kuliah: dataCodeJadwalKuliah,
                tanggal_pertemuan: dataDate,
                status: "aktif"
            }
        }).then(result => {
            res.status(201).json({
                message: "Data jadwal kuliah Dosen successfuly",
                identitas: {
                    nipy: dataDosen.nip_ynaa,
                    nama: dataDosen.nama,
                },
                data: result
            })
        }).then(err => {
            next(err)
        })
    },

    updateJadwalPertemuanDosen: async (req, res, next) => {
        const id = req.params.id
        const jadawalPertemuanUse = await jadwalPertemuanModel.findOne({
            include: [{
                model: jadwalKuliahModel,
                where: { status: "aktif" }
            }],
            where: {
                id_jadwal_pertemuan: id,
                status: "aktif"
            }
        })
        if (!jadawalPertemuanUse) return res.status(401).json({ message: "Data jadwal pertemuan tidak ditemukan" })

        let fileNameLampiranMateri = ""
        if (req.files != null) {
            if (jadawalPertemuanUse.lampiran_materi === "") {
                const file = req.files.lampiran_materi
                const fileSize = file.data.length
                const ext = path.extname(file.name)
                fileNameLampiranMateri = "lampiran_materi" + id + file.md5 + ext
                const allowedType = ['.rtf', '.doc', '.docx', '.pdf', '.xlsx', '.xls']
                if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "lampiran materi yang anda upload tidak valid" })
                if (fileSize > 5000000) return res.status(422).json({ msg: "lampiran materi diri yang anda upload tidak boleh lebih dari 5 mb" })
                file.mv(`../tmp_siakad/lampiranMateri/${fileNameLampiranMateri}`, (err) => {
                    if (err) return res.status(500).json({ message: err.message })
                })
            } else {
                const file = req.files.lampiran_materi
                const fileSize = file.data.length
                const ext = path.extname(file.name)
                fileNameLampiranMateri = "lampiran_materi" + id + file.md5 + ext
                const allowedType = ['.rtf', '.doc', '.docx', '.pdf', '.xlsx', '.xls']
                if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "lampiran materi yang anda upload tidak valid" })
                if (fileSize > 5000000) return res.status(422).json({ message: "lampiran materi yang anda upload tidak boleh lebih dari 5 mb" })
                const filepath = `../tmp_siakad/lampiranMateri/${jadawalPertemuanUse.lampiran_materi}`
                fs.unlinkSync(filepath)
                file.mv(`../tmp_siakad/lampiranMateri/${fileNameLampiranMateri}`, (err) => {
                    if (err) return res.status(500).json({ message: err.message })
                })
            }
        } else {
            fileNameLampiranMateri = ""
        }

        const { metode_pembelajaran, url_online, rencana_materi, status_pertemuan } = req.body

        try {
            await jadwalPertemuanModel.update({
                metode_pembelajaran: metode_pembelajaran,
                url_online: url_online,
                rencana_materi: rencana_materi,
                lampiran_materi: fileNameLampiranMateri,
                status_pertemuan: status_pertemuan,
            }, {
                where: {
                    id_jadwal_pertemuan: id
                }
            })
                .then(result => {
                    res.status(200).json({
                        message: "data jadwal pertemuan berhasil diupdate",
                    })
                })
        } catch (error) {
            next(error)
        }
    }
}