const semesterModel = require('../models/semesterModel.js')
const tahunAjaran = require('../models/tahunAjaranModel.js')
const { Op } = require('sequelize')

module.exports = {
    getAll: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const codeThnAjr = req.query.codeThnAjr || ""
        const offset = (currentPage - 1) * perPage
        const totalPage = await semesterModel.count({
            include: [{
                model: tahunAjaran,
                where: { status: "aktif" }
            }],
            where: {
                [Op.or]: [
                    {
                        id_semester: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_semester: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_tahun_ajaran: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        semester: {
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
                status: "aktif",
                code_tahun_ajaran: {
                    [Op.like]: `%${codeThnAjr}%`
                }
            }
        })
        const totalItems = Math.ceil(totalPage / perPage)
        await semesterModel.findAll({
            include: [{
                model: tahunAjaran,
                where: { status: "aktif" }
            }],
            where: {
                [Op.or]: [
                    {
                        id_semester: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_semester: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_tahun_ajaran: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        semester: {
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
                status: "aktif",
                code_tahun_ajaran: {
                    [Op.like]: `%${codeThnAjr}%`
                }
            },
            offset: offset,
            limit: perPage,
            order: [
                ["id_semester", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All Semester Success",
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
        await semesterModel.findOne({
            include: [{
                model: tahunAjaran,
                where: { status: "aktif" }
            }],
            where: {
                id_semester: id,
                status: "aktif"
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data Semester Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data Semester Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    }
}