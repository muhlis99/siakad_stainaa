const kategoriNilaiModel = require('../models/kategoriNilaiModel.js')
const { Op } = require('sequelize')
const tahunAjaranModel = require('../models/tahunAjaranModel.js')

module.exports = {
    getAll: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const codeThnAjr = req.query.codeThnAjr || ""
        const offset = (currentPage - 1) * perPage
        const totalPage = await kategoriNilaiModel.count({
            include: [{
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }],
            where: {
                [Op.or]: [
                    {
                        id_kategori_nilai: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_kategori_nilai: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nilai_atas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nilai_bawah: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nilai_huruf: {
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
        await kategoriNilaiModel.findAll({
            include: [{
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }],
            where: {
                [Op.or]: [
                    {
                        id_kategori_nilai: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_kategori_nilai: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nilai_atas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nilai_bawah: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nilai_huruf: {
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
                ["id_kategori_nilai", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All kategori Nilai Success",
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
        await kategoriNilaiModel.findOne({
            include: [{
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }],
            where: {
                id_kategori_nilai: id,
                status: "aktif"
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data kategori Nilai Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data kategori Nilai Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    }
}