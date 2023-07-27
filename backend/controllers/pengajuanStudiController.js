const { Op } = require('sequelize')
const pengajuanStudi = require('../models/pengajuanStudiModel')
const tahunAjaranModel = require('../models/tahunAjaranModel')
const semesterModel = require('../models/semesterModel')
const jenjangPendidikanModel = require('../models/jenjangPendidikanModel')
const fakultasModel = require('../models/fakultasModel')
const prodiModel = require('../models/prodiModel')
const mahasiswaModel = require('../models/mahasiswaModel')
const historyMahasiswa = require('../models/historyMahasiswaModel')
const detailStudi = require('../models/detailStudiModel')


module.exports = {
    get: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = (currentPage - 1) * perPage
        const totalPage = await pengajuanStudi.count({
            include: [{
                attributes: ['nim', 'nama'],
                model: mahasiswaModel,
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: semesterModel,
                where: { status: "aktif" }
            }, {
                model: jenjangPendidikanModel,
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }],
            where: {
                [Op.or]: [
                    {
                        id_pengajuan_studi: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nim: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        tanggal_pengajuan: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        pengajuan: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        alasan: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            }
        })
        const totalItems = Math.ceil(totalPage / perPage)
        await pengajuanStudi.findAll({
            include: [{
                attributes: ['nim', 'nama'],
                model: mahasiswaModel,
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: semesterModel,
                where: { status: "aktif" }
            }, {
                model: jenjangPendidikanModel,
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }],
            where: {
                [Op.or]: [
                    {
                        id_pengajuan_studi: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nim: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        tanggal_pengajuan: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        pengajuan: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        alasan: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            },
            offset: offset,
            limit: perPage,
            order: [
                ["id_pengajuan_studi", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All pengajun studi Success",
                    data: result,
                    total_data: totalPage,
                    per_page: perPage,
                    current_page: currentPage,
                    total_page: totalItems
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getById: async (req, res, next) => {
        const id = req.params.id
        const prodiUse = await pengajuanStudi.findOne({
            include: [{
                attributes: ['nim', 'nama'],
                model: mahasiswaModel,
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: semesterModel,
                where: { status: "aktif" }
            }, {
                model: jenjangPendidikanModel,
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }],
            where: {
                id_pengajuan_studi: id,
            }
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data pengajuan studi Tidak Ditemukan",
                        data: []
                    })
                }
                res.status(201).json({
                    message: "Data pengajuan studi Ditemukan",
                    data: result
                })
            }).
            catch(err => {
                next(err)
            })
    },


    postMahasiswa: async (req, res, next) => {
        const { code_tahun_ajaran, code_semester, code_jenjang_pendidikan, code_fakultas, code_prodi,
            nim, tanggal_pengajuan, pengajuan, alasan } = req.body

        let randomNumber = Math.floor(100000 + Math.random() * 900000)
        await pengajuanStudi.create({
            code_pengajuan_studi: randomNumber,
            code_tahun_ajaran: code_tahun_ajaran,
            code_semester: code_semester,
            code_jenjang_pendidikan: code_jenjang_pendidikan,
            code_fakultas: code_fakultas,
            code_prodi: code_prodi,
            nim: nim,
            tanggal_pengajuan: tanggal_pengajuan,
            pengajuan: pengajuan,
            alasan: alasan,
            status: "proses"
        }).
            then(result => {
                res.status(201).json({
                    message: "Data pengajuan succes Ditambahkan",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    approveDosen: async (req, res, next) => {
        const id = req.params.id
        const pengajuanStudiUse = await pengajuanStudi.findOne({
            include: [{
                attributes: ['nim', 'nama'],
                model: mahasiswaModel,
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: semesterModel,
                where: { status: "aktif" }
            }, {
                model: jenjangPendidikanModel,
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }],
            where: {
                id_pengajuan_studi: id,
                status: "proses"
            }
        })
        if (!pengajuanStudiUse) return res.status(401).json({ message: "Data Pengajuan Studi tidak ditemukan" })

        await pengajuanStudi.update({
            status: "disetujui1"
        }, {
            where: {
                id_pengajuan_studi: id,
                status: "proses"
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data pengajuan studi success di approve"
                })
            }).
            catch(err => {
                next(err)
            })
    },


    approveBuak: async (req, res, next) => {
        const id = req.params.id
        const pengajuanStudiUse = await pengajuanStudi.findOne({
            include: [{
                attributes: ['nim', 'nama'],
                model: mahasiswaModel,
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: semesterModel,
                where: { status: "aktif" }
            }, {
                model: jenjangPendidikanModel,
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }],
            where: {
                id_pengajuan_studi: id,
                status: "disetujui1"
            }
        })
        if (!pengajuanStudiUse) return res.status(401).json({ message: "Data Pengajuan Studi tidak ditemukan" })

        await pengajuanStudi.update({
            status: "disetujui2"
        }, {
            where: {
                id_pengajuan_studi: id,
                status: "disetujui1"
            }
        })

        try {
            const dataHistoryMhsUse = await historyMahasiswa.findOne({
                where: {
                    nim: pengajuanStudiUse.nim,
                    code_jenjang_pendidikan: pengajuanStudiUse.code_jenjang_pendidikan,
                    code_fakultas: pengajuanStudiUse.code_fakultas,
                    code_prodi: pengajuanStudiUse.code_prodi,
                    code_semester: pengajuanStudiUse.code_semester,
                    code_tahun_ajaran: pengajuanStudiUse.code_tahun_ajaran,
                    status: "aktif"
                }
            })

            if (!dataHistoryMhsUse) return res.status(401).json({ message: "Data history mahsiswa tidak ditemukan" })
            let randomNumber = Math.floor(100000 + Math.random() * 900000)

            await historyMahasiswa.update({
                status: pengajuanStudiUse.pengajuan
            }, {
                where: {
                    id_history: dataHistoryMhsUse.id_history,
                    status: "aktif"
                }
            })

            await detailStudi.create({
                code_detail_studi: randomNumber,
                code_history: dataHistoryMhsUse.code_history,
                status_studi: pengajuanStudiUse.pengajuan,
                tanggal: pengajuanStudiUse.tanggal_pengajuan,
                alasan: pengajuanStudiUse.alasan
            }).then(all => {
                res.status(201).json({
                    message: "Data pengajuan studi success di approve"
                })
            })
        } catch (error) {
            next(error)
        }
    },

    deleteStatus: async (req, res, next) => {
        const id = req.params.id
        const prodiUse = await prodi.findOne({
            include: [{
                model: jenjangPendidikanModel,
                attributes: ["id_jenjang_pendidikan", "code_jenjang_pendidikan", "nama_jenjang_pendidikan"],
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                attributes: ["id_fakultas", "code_jenjang_pendidikan", "code_fakultas", "nama_fakultas"],
                where: { status: "aktif" }
            }],
            where: {
                id_prodi: id,
                status: "aktif"
            }
        })
        if (!prodiUse) return res.status(401).json({ message: "Data prodi tidak ditemukan" })
        await prodi.update({
            status: "tidak"
        }, {
            where: {
                id_prodi: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "data prodi succes dihapus"
                })
            }).
            catch(err => {
                next(err)
            })
    }
}