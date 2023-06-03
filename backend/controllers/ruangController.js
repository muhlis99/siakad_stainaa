const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const fakultasModel = require('../models/fakultasModel.js')
const prodiModel = require('../models/prodiModel.js')
const ruangModel = require('../models/ruangModel.js')
const kelasModel = require('../models/kelasModel.js')
const { Op } = require('sequelize')

module.exports = {
    getAll: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = (currentPage - 1) * perPage
        const totalPage = await ruangModel.count({
            include: [{
                model: jenjangPendidikanModel,
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
            }],
            where: {
                [Op.or]: [
                    {
                        id_ruang: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_ruang: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nama_ruang: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_jenjang_pendidikan: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_fakultas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_prodi: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_kelas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        status: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: "aktif"
            }
        })
        const totalItems = Math.ceil(totalPage / perPage)
        await ruangModel.findAll({
            include: [{
                model: jenjangPendidikanModel,
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
            }],
            where: {
                [Op.or]: [
                    {
                        id_ruang: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_ruang: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nama_ruang: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_jenjang_pendidikan: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_fakultas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_prodi: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_kelas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        status: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: "aktif"
            },
            offset: offset,
            limit: perPage,
            order: [
                ["id_ruang", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All Ruang Success",
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
        await ruangModel.findOne({
            include: [{
                model: jenjangPendidikanModel,
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
            }],
            where: {
                id_ruang: id,
                status: "aktif"
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data Ruang Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data Ruang Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    post: async (req, res, next) => {
        const { nama_ruang, identy_ruang, code_jenjang_pendidikan, code_fakultas, code_prodi, code_kelas } = req.body
        const codeRuang = code_kelas + identy_ruang.replace(/ /g, '')
        const namaRuang = nama_ruang + identy_ruang
        const ruangUse = await ruangModel.findOne({
            where: {
                code_ruang: codeRuang,
                nama_ruang: namaRuang
            }
        })
        if (ruangUse) return res.status(401).json({ message: "data ruang sudah ada" })
        await ruangModel.create({
            nama_ruang: namaRuang,
            code_jenjang_pendidikan: code_jenjang_pendidikan,
            code_fakultas: code_fakultas,
            code_prodi: code_prodi,
            code_ruang: codeRuang,
            code_kelas: code_kelas,
            status: "aktif",
        }).
            then(result => {
                res.status(201).json({
                    message: "Data Ruang success Ditambahkan",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    put: async (req, res, next) => {
        const id = req.params.id
        const ruangUseOne = await ruangModel.findOne({
            include: [{
                model: jenjangPendidikanModel,
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
            }],
            where: {
                id_ruang: id,
                status: "aktif"
            }
        })
        if (!ruangUseOne) return res.status(401).json({ message: "data ruang tidak ditemukan" })
        const { nama_ruang, identy_ruang, code_jenjang_pendidikan, code_fakultas, code_prodi, code_kelas } = req.body
        const codeRuang = code_kelas + identy_ruang.replace(/ /g, '')
        const namaRuang = nama_ruang + identy_ruang
        const ruangUse = await ruangModel.findOne({
            where: {
                code_ruang: codeRuang,
                nama_ruang: namaRuang
            }
        })
        if (ruangUse) return res.status(401).json({ message: "data ruang sudah ada" })
        await ruangModel.update({
            nama_ruang: namaRuang,
            code_jenjang_pendidikan: code_jenjang_pendidikan,
            code_fakultas: code_fakultas,
            code_prodi: code_prodi,
            code_kelas: code_kelas,
            code_ruang: codeRuang,
        }, {
            where: {
                id_ruang: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data Ruang success Diupdate",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    delete: async (req, res, next) => {
        const id = req.params.id
        const ruangModelUse = await ruangModel.findOne({
            include: [{
                model: jenjangPendidikanModel,
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
            }],
            where: {
                id_ruang: id,
                status: "aktif"
            }
        })
        if (!ruangModelUse) return res.status(401).json({ message: "Data ruang tidak ditemukan" })
        await ruangModel.update({
            status: "tidak",
        }, {
            where: {
                id_ruang: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "data ruang succes dihapus"
                })
            }).
            catch(err => {
                next(err)
            })
    }
}