const tugasModel = require('../models/tugasModel.js')
const dosenModel = require('../models/dosenModel.js')
const jadwalKuliahModel = require('../models/jadwalKuliahModel.js')
const jadwalPertemuanModel = require('../models/jadwalPertemuanModel.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const { Op } = require('sequelize')
const path = require('path')
const fs = require('fs')
const sebaranMataKuliah = require('../models/sebaranMataKuliah.js')
const historyMahasiswa = require('../models/historyMahasiswaModel.js')
const krsModel = require('../models/krsModel.js')
const detailTugasModel = require('../models/detailTugasModel.js')

module.exports = {
    // dosen
    getAll: async (req, res, next) => {
        const { nipy, thnAjr, smt, jnjPen, fks, prd } = req.params
        const dosenUse = dosenModel.findOne({
            where: {
                nip_ynaa: nipy,
                status: "aktif"
            }
        })
        if (!dosenUse) return res.status(500).json({ message: "data dosen tidak ditemukan" })
        const jadwalKuliahUse = await jadwalKuliahModel.findAll({
            where: {
                dosen_pengajar: nipy,
                code_tahun_ajaran: thnAjr,
                code_semester: smt,
                code_jenjang_pendidikan: jnjPen,
                code_fakultas: fks,
                code_prodi: prd,
                status: "aktif"
            }
        })
        const VjadwalKuliahUse = jadwalKuliahUse.map(el => { return el.code_jadwal_kuliah })
        const jadwalPertemuanUse = await jadwalPertemuanModel.findAll({
            where: {
                code_jadwal_kuliah: VjadwalKuliahUse,
                status: "aktif"
            }
        })
        const dataValidasiJadwalPertemuan = jadwalPertemuanUse.map(al => { return al.code_jadwal_pertemuan })

        const currentPage = parseInt(req.query.page) || 1
        const perPage = req.query.perPage || 10
        const search = req.query.search || ""
        await tugasModel.findAndCountAll({
            where: {
                [Op.or]: [
                    {
                        id_tugas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_tugas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        deskripsi_tugas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        tugas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        status: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                code_jadwal_pertemuan: dataValidasiJadwalPertemuan,
            }
        }).
            then(all => {
                totalItems = all.count
                return tugasModel.findAll({
                    include: [
                        {
                            attributes: ['pertemuan', 'tanggal_pertemuan'],
                            model: jadwalPertemuanModel,
                            include: [{
                                attributes: ['hari', 'jam_mulai', 'jam_selesai', 'dosen_pengajar'],
                                model: jadwalKuliahModel,
                                include: [{
                                    attributes: ['status_makul', 'status_bobot_makul'],
                                    model: sebaranMataKuliah,
                                    where: {
                                        code_tahun_ajaran: thnAjr,
                                        code_semester: smt
                                    },
                                    include: [{
                                        attributes: ['code_mata_kuliah', 'nama_mata_kuliah', 'sks'],
                                        model: mataKuliahModel
                                    }]
                                }]
                            }]
                        }
                    ],
                    where: {
                        [Op.or]: [
                            {
                                id_tugas: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                code_tugas: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                deskripsi_tugas: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                tugas: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                status: {
                                    [Op.like]: `%${search}%`
                                }
                            }
                        ],
                        code_jadwal_pertemuan: dataValidasiJadwalPertemuan,
                    },
                    offset: (currentPage - 1) * parseInt(perPage),
                    limit: parseInt(perPage),
                    order: [
                        ["id_tugas", "DESC"]
                    ]
                })
            }).
            then(result => {
                const totalPage = Math.ceil(totalItems / perPage)
                res.status(200).json({
                    message: "Get tugas Success",
                    data: result,
                    total_data: totalItems,
                    per_page: perPage,
                    current_page: currentPage,
                    total_page: totalPage
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getById: async (req, res, next) => {
        const id = req.params.id
        await tugasModel.findOne({
            where: {
                id_tugas: id
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data Tugas Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data Tugas Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    post: async (req, res, next) => {
        const { code_jadwal_pertemuan, deskripsi_tugas,
            tugas, tanggal_akhir } = req.body

        let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)
        let file_tugas = ""
        const file = req.files.file_tugas
        const fileSize = file.data.length
        const ext = path.extname(file.name)
        file_tugas = "lampiran_tugas" + randomNumber + file.md5 + ext
        const allowedType = ['.rtf', '.doc', '.docx', '.pdf', '.xlsx', '.xls', '.pdf', '.pptx']
        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "lampiran materi yang anda upload tidak valid" })
        if (fileSize > 500000000) return res.status(422).json({ msg: "lampiran tugas  yang anda upload tidak boleh lebih dari 500 mb" })
        file.mv(`../tmp_siakad/lampiranTugas/${file_tugas}`, (err) => {
            if (err) return res.status(500).json({ message: err.message })
        })

        await tugasModel.create({
            code_tugas: randomNumber,
            code_jadwal_pertemuan: code_jadwal_pertemuan,
            deskripsi_tugas: deskripsi_tugas,
            tugas: tugas,
            file_tugas: file_tugas,
            tanggal_akhir: tanggal_akhir,
            status: "belum"
        }).then(result => {
            res.status(201).json({
                message: "Data Tugas Ditambahkan",
                data: result
            })
        }).catch(err => {
            console.log(err)
        })
    },

    postMhsTugas: async (req, res, next) => {
        const { code_tugas, nim } = req.body
        const datamhs = nim.map(i => {
            let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)
            let data = {
                nim: i,
                code_tugas: code_tugas,
                code_detail_tugas: randomNumber,
                jawaban: "",
                file_jawaban_word_pdf: "",
                file_jawaban_ppt: "",
                file_jawaban_video: "",
                status: "tidak"
            }
            return data
        })
        const insert = await detailTugasModel.bulkCreate(datamhs)
        if (insert) {
            return res.status(201).json({ message: "data berhasil ditambahkan" })
        } else {
            return res.status(403).json({ message: "data tidak berhasil ditambahkan" })
        }
    },

    put: async (req, res, next) => {
        const id = req.params.id
        const tugasUse = await tugasModel.findOne({
            where: {
                id_tugas: id
            }
        })
        if (!tugasUse) return res.status(500).json({ message: "data tidak ditemukan" })
        const { deskripsi_tugas, tugas, tanggal_akhir } = req.body

        let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)
        let file_tugas = ""
        if (req.files != null) {
            if (tugasUse.file_tugas === "") {
                const file = req.files.file_tugas
                const fileSize = file.data.length
                const ext = path.extname(file.name)
                file_tugas = "lampiran_tugas" + randomNumber + file.md5 + ext
                const allowedType = ['.rtf', '.doc', '.docx', '.pdf', '.xlsx', '.xls', '.pdf', '.pptx']
                if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "lampiran materi yang anda upload tidak valid" })
                if (fileSize > 500000000) return res.status(422).json({ msg: "lampiran tugas  yang anda upload tidak boleh lebih dari 500 mb" })
                file.mv(`../tmp_siakad/lampiranTugas/${file_tugas}`, (err) => {
                    if (err) return res.status(500).json({ message: err.message })
                })
            } else {
                const file = req.files.file_tugas
                const fileSize = file.data.length
                const ext = path.extname(file.name)
                file_tugas = "lampiran_tugas" + randomNumber + file.md5 + ext
                const allowedType = ['.rtf', '.doc', '.docx', '.pdf', '.xlsx', '.xls', '.pdf', '.pptx']
                if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "lampiran materi yang anda upload tidak valid" })
                if (fileSize > 500000000) return res.status(422).json({ msg: "lampiran tugas  yang anda upload tidak boleh lebih dari 500 mb" })
                const filepath = `../tmp_siakad/lampiranTugas/${tugasUse.file_tugas}`
                fs.unlinkSync(filepath)
                file.mv(`../tmp_siakad/lampiranTugas/${file_tugas}`, (err) => {
                    if (err) return res.status(500).json({ message: err.message })
                })
            }
        } else {
            file_tugas = tugasUse.file_tugas
        }
        await tugasModel.update({
            deskripsi_tugas: deskripsi_tugas,
            tugas: tugas,
            file_tugas: file_tugas,
            tanggal_akhir: tanggal_akhir,
        }, {
            where: {
                id_tugas: id
            }
        }).then(result => {
            res.status(201).json({
                message: "Data Tugas Diupdate",
            })
        }).catch(err => {
            console.log(err)
        })
    },

    updateStatus: async (req, res, next) => {
        const id = req.params.id
        await tugasModel.update({
            status: "selesai"
        }, {
            where: {
                id_tugas: id
            }
        }).then(result => {
            res.status(201).json({
                message: "Data Tugas Diupdate selesai",
            })
        }).catch(err => {
            console.log(err)
        })
    },

    delete: async (req, res, next) => {
        const id = req.params.id
        const tugasUse = await tugasModel.findOne({
            where: {
                id_tugas: id,
                status: "belum"
            }
        })
        if (!tugasUse) return res.status(500).json({ message: "data tidak ditemukan" })
        if (tugasUse.file_tugas) {
            const filepath = `../tmp_siakad/lampiranTugas/${tugasUse.file_tugas}`
            fs.unlinkSync(filepath)
        }
        const dataDetailTugas = await detailTugasModel.findAll({
            where: {
                code_tugas: tugasUse.code_tugas,
                status: "tidak"
            }
        })

        await tugasModel.destroy({
            where: {
                id_tugas: id
            }
        }).then(result => {
            const useDataDetailTugas = dataDetailTugas.map(async el => {
                await detailTugasModel.destroy({
                    where: {
                        code_detail_tugas: el.code_detail_tugas,
                        nim: el.nim,
                        code_tugas: el.code_tugas
                    }
                })
            })
            res.status(201).json({
                message: "Data Tugas Dihapus",
            })
        }).catch(err => {
            console.log(err)
        })
    },

    checkTugasByCodePertemuan: async (req, res, next) => {
        const { code_pertemuan } = req.params
        const codePertemuan = await jadwalPertemuanModel.findOne({
            where: {
                code_jadwal_pertemuan: code_pertemuan,
                status: "aktif"
            }
        })
        if (!codePertemuan) return res.status(404).json({ message: "data tidak ditemukan" })
        await tugasModel.findOne({
            where: {
                code_jadwal_pertemuan: code_pertemuan,
            }
        }).then(result => {
            if (!result) {
                return res.status(404).json({
                    message: "Data tidak ada",
                    data: "0"
                })
            }
            res.status(201).json({
                message: "Data sudah ada",
                data: "1"
            })
        }).catch(err => {
            console.log(err)
        })
    },

    // mahasiswa
    getAllmhs: async (req, res, next) => {
        const nim = req.params.nim
        const dataMahasiswa = await historyMahasiswa.findOne({
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
                code_jenjang_pendidikan: dataMahasiswa.code_jenjang_pendidikan,
                code_fakultas: dataMahasiswa.code_fakultas,
                code_prodi: dataMahasiswa.code_prodi,
                code_tahun_ajaran: dataMahasiswa.code_tahun_ajaran,
                code_semester: dataMahasiswa.code_semester,
                code_mata_kuliah: dataMakulMahasiswa,
                status: "aktif"
            }
        })
        if (!dataJadwalKuliah) return res.status(404).json({ message: "data tidak ditemukan" })
        const dataCodeJadwalKuliah = dataJadwalKuliah.map(t => { return t.code_jadwal_kuliah })
        const dataPertemuanUse = await jadwalPertemuanModel.findAll({
            where: {
                code_jadwal_kuliah: dataCodeJadwalKuliah,
                status: "aktif"
            }
        })
        const datacodePertemuanUse = dataPertemuanUse.map(o => { return o.code_jadwal_pertemuan })

        const dataTugas = await tugasModel.findAll({
            where: {
                code_jadwal_pertemuan: datacodePertemuanUse,
            }
        })
        const dataTugasUse = dataTugas.map(all => { return all.code_tugas })
        if (!dataTugas) return res.status(404).json({ message: "data tidak ditemukan" })
        await detailTugasModel.findAll({
            include: [{
                model: tugasModel,
                attributes: ["code_tugas", "deskripsi_tugas"]
            }],
            where: {
                code_tugas: dataTugasUse,
                nim: nim
            }
        }).then(result => {
            res.status(201).json({
                message: "Data get all success",
                data: result
            })
        }).catch(err => {
            console.log(err)
        })

    },

    tugasmhsbycode: async (req, res, next) => {
        const code = req.params.code
        await tugasModel.findOne({
            where: {
                code_tugas: code,
            }
        }).then(result => {
            res.status(201).json({
                message: "Data Tugas success",
                data: result
            })
        }).catch(err => {
            console.log(err)
        })
    }
}