const fakultas = require('../models/fakultasModel.js')
const jenjangPendidikan = require('../models/jenjangPendidikanModel.js')
const { Op } = require('sequelize')


module.exports = {
    get: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = (currentPage - 1) * perPage
        const totalPage = await fakultas.count({
            include: [{
                model: jenjangPendidikan,
                attributes: ["id_jenjang_pendidikan", "code_jenjang_pendidikan", "nama_jenjang_pendidikan"],
                where: { status: "aktif" }
            }],
            where: {
                [Op.or]: [
                    {
                        id_fakultas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_fakultas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nama_fakultas: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: "aktif"
            }
        })
        const totalItems = Math.ceil(totalPage / perPage)
        await fakultas.findAll({
            include: [{
                model: jenjangPendidikan,
                attributes: ["id_jenjang_pendidikan", "code_jenjang_pendidikan", "nama_jenjang_pendidikan"],
                where: { status: "aktif" }
            }],
            where: {
                [Op.or]: [
                    {
                        id_fakultas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_fakultas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nama_fakultas: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: "aktif"
            },
            offset: offset,
            limit: perPage,
            order: [
                ["id_fakultas", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All Fakultas Success",
                    data: result,
                    total_data: totalPage,
                    per_page: perPage,
                    current_page: currentPage,
                    totalPage: totalItems
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getById: async (req, res, next) => {
        const id = req.params.id
        const fakultasUse = await fakultas.findOne({
            include: [{
                model: jenjangPendidikan,
                attributes: ["id_jenjang_pendidikan", "code_jenjang_pendidikan", "nama_jenjang_pendidikan"],
                where: { status: "aktif" }
            }],
            where: {
                id_fakultas: id,
                status: "aktif"
            }
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data fakultas Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data fakultas Ditemukan",
                    data: result
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getFakulatsByJenjang: async (req, res, next) => {
        const code = req.params.code
        const fakultasUse = await fakultas.findAll({
            include: [{
                model: jenjangPendidikan,
                attributes: ["id_jenjang_pendidikan", "code_jenjang_pendidikan", "nama_jenjang_pendidikan"],
                where: { status: "aktif" }
            }],
            where: {
                code_jenjang_pendidikan: code,
                status: "aktif"
            }
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data fakultas Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data fakultas Ditemukan",
                    data: result
                })
            }).
            catch(err => {
                next(err)
            })
    }
}