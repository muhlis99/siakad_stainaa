const tahunAjaran = require('../models/tahunAjaranModel.js')
const { Op } = require('sequelize')

module.exports = {
    getAll: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = req.query.perPage || 10
        const search = req.query.search || ""
        await tahunAjaran.findAndCountAll({
            where: {
                [Op.or]: [
                    {
                        id_tahun_ajaran: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_tahun_ajaran: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        tahun_ajaran: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        keterangan: {
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
        }).
            then(all => {
                totalItems = all.count
                return tahunAjaran.findAll({
                    where: {
                        [Op.or]: [
                            {
                                id_tahun_ajaran: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                code_tahun_ajaran: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                tahun_ajaran: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                keterangan: {
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
                    offset: (currentPage - 1) * parseInt(perPage),
                    limit: parseInt(perPage),
                    order: [
                        ["id_tahun_ajaran", "DESC"]
                    ]
                })
            }).
            then(result => {
                const totalPage = Math.ceil(totalItems / perPage)
                res.status(200).json({
                    message: "Get All Tahun Ajaran Success",
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
        await tahunAjaran.findOne({
            where: {
                id_tahun_ajaran: id,
                status: "aktif"
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data Tahun Ajaran Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data Tahun Ajaran Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    }
}