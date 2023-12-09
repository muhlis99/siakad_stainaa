const ruangModel = require('../models/ruangModel.js')
const { Op } = require('sequelize')

module.exports = {
    getAll: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = (currentPage - 1) * perPage
        const totalPage = await ruangModel.count({
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
                        lokasi: {
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
                        lokasi: {
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
        const { nama_ruang, identy_ruang, lokasi, } = req.body
        const codeRuang = identy_ruang.replace(/ /g, '')
        const namaRuang = nama_ruang + identy_ruang
        const ruangUse = await ruangModel.findOne({
            where: {
                code_ruang: codeRuang,
                nama_ruang: namaRuang
            }
        })
        if (ruangUse) return res.status(401).json({ message: "data ruang sudah ada" })
        await ruangModel.create({
            code_ruang: codeRuang,
            nama_ruang: namaRuang,
            lokasi: lokasi,
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
            where: {
                id_ruang: id,
                status: "aktif"
            }
        })
        if (!ruangUseOne) return res.status(401).json({ message: "data ruang tidak ditemukan" })
        const { nama_ruang, identy_ruang, lokasi, } = req.body
        const codeRuang = nama_ruang + identy_ruang.replace(/ /g, '')
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
            lokasi: lokasi,
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