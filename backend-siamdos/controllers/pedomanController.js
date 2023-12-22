const { Op } = require('sequelize')
const path = require('path')
const fs = require('fs')
const pedomanModel = require('../models/pedomanModel.js')



module.exports = {
    getByLevel: async (req, res, next) => {
        const level = req.params.level
        const currentPage = parseInt(req.query.page) || 1
        const perPage = req.query.perPage || 10
        const search = req.query.search || ""
        await pedomanModel.findAndCountAll({
            where: {
                [Op.or]: [
                    {
                        id_pedoman: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_pedoman: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        judul_pedoman: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        pedoman: {
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
                return pedomanModel.findAll({
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
                                id_pedoman: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                code_pedoman: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                deskripsi_pedoman: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                pedoman: {
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
                        ["id_pedoman", "DESC"]
                    ]
                })
            }).
            then(result => {
                const totalPage = Math.ceil(totalItems / perPage)
                res.status(200).json({
                    message: "Get pedoman Success",
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
        await pedomanModel.findOne({
            where: {
                id_pedoman: id
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data pedoman Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data pedoman Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    post: async (req, res, next) => {
        const { code_jadwal_pertemuan, deskripsi_pedoman,
            pedoman, tanggal_akhir } = req.body

        let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)
        let file_pedoman = ""
        const file = req.files.file_pedoman
        const fileSize = file.data.length
        const ext = path.extname(file.name)
        file_pedoman = "lampiran_pedoman" + randomNumber + file.md5 + ext
        const allowedType = ['.rtf', '.doc', '.docx', '.pdf', '.xlsx', '.xls', '.pdf', '.pptx']
        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "lampiran materi yang anda upload tidak valid" })
        if (fileSize > 500000000) return res.status(422).json({ msg: "lampiran pedoman  yang anda upload tidak boleh lebih dari 500 mb" })
        file.mv(`../tmp_siakad/lampiranpedoman/${file_pedoman}`, (err) => {
            if (err) return res.status(500).json({ message: err.message })
        })

        await pedomanModel.create({
            code_pedoman: randomNumber,
            code_jadwal_pertemuan: code_jadwal_pertemuan,
            deskripsi_pedoman: deskripsi_pedoman,
            pedoman: pedoman,
            file_pedoman: file_pedoman,
            tanggal_akhir: tanggal_akhir,
            status: "belum"
        }).then(result => {
            res.status(201).json({
                message: "Data pedoman Ditambahkan",
            })
        }).catch(err => {
            console.log(err)
        })
    },

    put: async (req, res, next) => {
        const id = req.params.id
        const pedomanUse = await pedomanModel.findOne({
            where: {
                id_pedoman: id
            }
        })
        if (!pedomanUse) return res.status(500).json({ message: "data tidak ditemukan" })
        const { deskripsi_pedoman, pedoman, tanggal_akhir } = req.body

        let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)
        let file_pedoman = ""
        if (req.files != null) {
            if (pedomanUse.file_pedoman === "") {
                const file = req.files.file_pedoman
                const fileSize = file.data.length
                const ext = path.extname(file.name)
                file_pedoman = "lampiran_pedoman" + randomNumber + file.md5 + ext
                const allowedType = ['.rtf', '.doc', '.docx', '.pdf', '.xlsx', '.xls', '.pdf', '.pptx']
                if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "lampiran materi yang anda upload tidak valid" })
                if (fileSize > 500000000) return res.status(422).json({ msg: "lampiran pedoman  yang anda upload tidak boleh lebih dari 500 mb" })
                file.mv(`../tmp_siakad/lampiranpedoman/${file_pedoman}`, (err) => {
                    if (err) return res.status(500).json({ message: err.message })
                })
            } else {
                const file = req.files.file_pedoman
                const fileSize = file.data.length
                const ext = path.extname(file.name)
                file_pedoman = "lampiran_pedoman" + randomNumber + file.md5 + ext
                const allowedType = ['.rtf', '.doc', '.docx', '.pdf', '.xlsx', '.xls', '.pdf', '.pptx']
                if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "lampiran materi yang anda upload tidak valid" })
                if (fileSize > 500000000) return res.status(422).json({ msg: "lampiran pedoman  yang anda upload tidak boleh lebih dari 500 mb" })
                const filepath = `../tmp_siakad/lampiranpedoman/${pedomanUse.file_pedoman}`
                fs.unlinkSync(filepath)
                file.mv(`../tmp_siakad/lampiranpedoman/${file_pedoman}`, (err) => {
                    if (err) return res.status(500).json({ message: err.message })
                })
            }
        } else {
            file_pedoman = pedomanUse.file_pedoman
        }
        await pedomanModel.update({
            deskripsi_pedoman: deskripsi_pedoman,
            pedoman: pedoman,
            file_pedoman: file_pedoman,
            tanggal_akhir: tanggal_akhir,
        }, {
            where: {
                id_pedoman: id
            }
        }).then(result => {
            res.status(201).json({
                message: "Data pedoman Diupdate",
            })
        }).catch(err => {
            console.log(err)
        })
    },

    updateStatus: async (req, res, next) => {
        const id = req.params.id
        await pedomanModel.update({
            status: "selesai"
        }, {
            where: {
                id_pedoman: id
            }
        }).then(result => {
            res.status(201).json({
                message: "Data pedoman Diupdate selesai",
            })
        }).catch(err => {
            console.log(err)
        })
    },

    delete: async (req, res, next) => {
        const id = req.params.id
        const pedomanUse = await pedomanModel.findOne({
            where: {
                id_pedoman: id
            }
        })
        if (!pedomanUse) return res.status(500).json({ message: "data tidak ditemukan" })
        const filepath = `../tmp_siakad/lampiranpedoman/${pedomanUse.file_pedoman}`
        fs.unlinkSync(filepath)
        await pedomanModel.destroy({
            where: {
                id_pedoman: id
            }
        }).then(result => {
            res.status(201).json({
                message: "Data pedoman Dihapus",
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

        await pedomanModel.findAll({
            where: {
                code_jadwal_pertemuan: datacodePertemuanUse,
            }
        }).then(result => {
            res.status(201).json({
                message: "Data pedoman success",
                data: result
            })
        }).catch(err => {
            console.log(err)
        })
    },

    pedomanmhsbycode: async (req, res, next) => {
        const code = req.params.code
        await pedomanModel.findOne({
            where: {
                code_pedoman: code,
            }
        }).then(result => {
            res.status(201).json({
                message: "Data pedoman success",
                data: result
            })
        }).catch(err => {
            console.log(err)
        })
    }
}