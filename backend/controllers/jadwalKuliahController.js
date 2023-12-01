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
    get: async (req, res, next) => {
        const { thnAjr, smt, jenjPen, fks, prd, } = req.params
        await sebaranMataKuliah.findAll({
            include: [{
                model: semesterModel,
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: mataKuliahModel,
                where: {
                    code_jenjang_pendidikan: jenjPen,
                    code_fakultas: fks,
                    code_prodi: prd,
                },
                include: [
                    {
                        model: prodiModel,
                        where: { status: "aktif" }
                    }, {
                        model: fakultasModel,
                        where: { status: "aktif" }
                    }, {
                        model: jenjangPendidikanModel,
                        where: { status: "aktif" }
                    }
                ]
            }],
            where: {
                code_tahun_ajaran: thnAjr,
                code_semester: smt,
                status_makul: "paket",
                status_bobot_makul: "wajib",
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
        const { thnAjr, smt, jenjPen, fks, prd, makul, kls } = req.params
        await jadwalKuliahModel.findOne({
            include: [{
                attributes: ['code_semester', 'semester'],
                model: semesterModel,
                where: { status: "aktif" }
            }, {
                attributes: ['code_tahun_ajaran', 'tahun_ajaran'],
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                attributes: ['code_jenjang_pendidikan', 'nama_jenjang_pendidikan'],
                model: jenjangPendidikanModel,
                where: { status: "aktif" }
            }, {
                attributes: ['code_fakultas', 'nama_fakultas'],
                model: fakultasModel,
                where: { status: "aktif" }
            }, {
                attributes: ['code_prodi', 'nama_prodi'],
                model: prodiModel,
                where: { status: "aktif" }
            }, {
                attributes: ['code_kelas', 'nama_kelas', 'kapasitas'],
                model: kelasModel,
                where: { status: "aktif" }
            }, {
                attributes: ['code_ruang', 'nama_ruang', 'lokasi'],
                model: ruangModel,
                where: { status: "aktif" }
            }, {
                model: sebaranMataKuliah,
                where: {
                    code_tahun_ajaran: thnAjr,
                    code_semester: smt,
                    status_makul: "paket",
                    status_bobot_makul: "wajib",
                    status: "aktif"
                },
                include: [
                    {
                        model: mataKuliahModel,
                        where: {
                            code_jenjang_pendidikan: jenjPen,
                            code_fakultas: fks,
                            code_prodi: prd,
                        }
                    }
                ]
            }, {
                model: dosenModel,
                as: "dosenPengajar"
            }, {
                model: dosenModel,
                as: "dosenPengganti"
            }],
            where: {
                code_tahun_ajaran: thnAjr,
                code_semester: smt,
                code_jenjang_pendidikan: jenjPen,
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
        const { code_mata_kuliah, code_jenjang_pendidikan, code_fakultas, code_prodi, code_semester, code_tahun_ajaran,
            code_kelas, code_ruang, tanggal_mulai, tanggal_selesai, jumlah_pertemuan,
            hari, jam_mulai, jam_selesai } = req.body

        const duplicateData = await jadwalKuliahModel.findAll({
            where: {
                code_jenjang_pendidikan: code_jenjang_pendidikan,
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
                code_jenjang_pendidikan: code_jenjang_pendidikan,
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
            code_jenjang_pendidikan: code_jenjang_pendidikan,
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
        const { code_mata_kuliah, code_jenjang_pendidikan, code_fakultas, code_prodi, code_semester, code_tahun_ajaran,
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
                model: jenjangPendidikanModel,
                where: { status: "aktif" }
            }, {
                model: kelasModel,
                where: { status: "aktif" }
            },
            {
                model: sebaranMataKuliah,
                where: { status: "aktif" }
            }
            ],
            where: {
                id_jadwal_kuliah: id,
                status: "aktif"
            }
        })

        if (!jadwalKuliahModelUse) return res.status(401).json({ message: "Data jadwal kuliah tidak ditemukan" })
        const duplicateData = await jadwalKuliahModel.findAll({
            where: {
                code_jenjang_pendidikan: code_jenjang_pendidikan,
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
                code_jenjang_pendidikan: code_jenjang_pendidikan,
                code_fakultas: code_fakultas,
                code_prodi: code_prodi,
                code_tahun_ajaran: code_tahun_ajaran,
                code_semester: code_semester,
                hari: hari,
                code_ruang: code_ruang,
                jam_mulai: jam_mulai,
                jam_selesai: jam_selesai,
                jumlah_pertemuan: jumlah_pertemuan,
                status: 'aktif'
            }
        })

        if (daysRoom && validasiJamMulai && validasiJamSelesai) return res.status(401).json({ message: "Jadwal kuliah bentrok" })
        await jadwalKuliahModel.update({
            code_mata_kuliah: code_mata_kuliah,
            code_jenjang_pendidikan: code_jenjang_pendidikan,
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
            console.log(err)
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
                model: jenjangPendidikanModel,
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
    },

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
        for (let index = 0; index <= 6; index++) {
            const date = new Date()
            // const timeElapsed = Date.now()
            let days = date.getDate() + index;
            let nextDay = new Date(date.setDate(date.getDate() + days)).toISOString().substring(0, 10)
            dataDate.push(nextDay)
        }
        console.log(dataDate);
        await jadwalPertemuanModel.findAll({
            include: [
                {
                    attributes: ['id_jadwal_kuliah',
                        'code_jadwal_kuliah', 'code_kelas',
                        'code_ruang', 'hari', 'jam_mulai', 'jam_selesai',
                        'dosen_pengajar', 'dosen_pengganti'],
                    model: jadwalKuliahModel,
                    status: "aktif",
                    include: [{
                        attributes: ['id_sebaran',
                            'code_sebaran', 'status_makul',
                            'status_bobot_makul'],
                        model: sebaranMataKuliah,
                        status: "aktif",
                        include: [{
                            model: mataKuliahModel
                        }]
                    }, {
                        model: ruangModel,
                        status: "aktif"
                    }]
                },

            ],
            attributes: ['id_jadwal_pertemuan', 'code_jadwal_pertemuan',
                'pertemuan', 'tanggal_pertemuan', 'jenis_pertemuan',
                'metode_pembelajaran', 'url_online'],
            where: {
                code_jadwal_kuliah: dataCodeJadwalKuliah,
                tanggal_pertemuan: dataDate,
                status: "aktif"
            }
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
                status: "aktif"
            }
        })
        if (!dataJadwalKuliah) return res.status(404).json({ message: "data tidak ditemukan" })
        const dataCodeJadwalKuliah = dataJadwalKuliah.map(t => { return t.code_jadwal_kuliah })
        let dataDate = []
        for (let index = 1; index <= 7; index++) {
            // const timeElapsed = Date.now()
            const date = new Date()
            let days = 7 - date.getDate() + index;
            let nextDay = new Date(date.setDate(date.getDate() + days)).toISOString().substring(0, 10)
            dataDate.push(nextDay)
        }
        await jadwalPertemuanModel.findAll({
            include: [
                {
                    model: jadwalKuliahModel,
                    status: "aktif",
                    include: [{
                        model: mataKuliahModel,
                        status: "aktif"
                    }, {
                        model: ruangModel,
                        status: "aktif"
                    }]
                },

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