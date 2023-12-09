const prodi = require('../models/prodiModel.js')
const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const fakultasModel = require('../models/fakultasModel.js')
const { Op } = require('sequelize')

module.exports = {
    get: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = (currentPage - 1) * perPage
        const totalPage = await prodi.count({
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
                [Op.or]: [
                    {
                        id_prodi: {
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
                        nama_prodi: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: "aktif"
            }
        })
        const totalItems = Math.ceil(totalPage / perPage)
        await prodi.findAll({
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
                [Op.or]: [
                    {
                        id_prodi: {
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
                        nama_prodi: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: "aktif"
            },
            offset: offset,
            limit: perPage,
            order: [
                ["id_prodi", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All Prodi Success",
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
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data Prodi Tidak Ditemukan",
                        data: []
                    })
                }
                res.status(201).json({
                    message: "Data Prodi Ditemukan",
                    data: result
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getProdiByFakultas: async (req, res, next) => {
        const code = req.params.code
        const prodiUse = await prodi.findAll({
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
                code_fakultas: code,
                status: "aktif"
            }
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data Prodi Tidak Ditemukan",
                        data: []
                    })
                }
                res.status(201).json({
                    message: "Data Prodi Ditemukan",
                    data: result
                })
            }).
            catch(err => {
                next(err)
            })
    }
}