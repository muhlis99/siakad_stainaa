const dosen = require('../models/dosenModel.js')
const { Op } = require('sequelize')

module.exports = {
    getAll: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        let totalItems
        await dosen.findAndCountAll({
            where: {
                [Op.or]: [
                    {
                        id_jenjang_pendidikan: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_jenjang_pendidikan: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nama_jenjang_pendidikan: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: "aktif"
            }
        }).
            then(all => {
                totalItems = all.count
                return jejangPendidikan.findAll({
                    where: {
                        [Op.or]: [
                            {
                                id_jenjang_pendidikan: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                code_jenjang_pendidikan: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                nama_jenjang_pendidikan: {
                                    [Op.like]: `%${search}%`
                                }
                            }
                        ],
                        status: "aktif"
                    },
                    offset: (currentPage - 1) * perPage,
                    limit: perPage,
                    order: [
                        ["id_jenjang_pendidikan", "DESC"]
                    ]
                })
            }).
            then(result => {
                const totalPage = Math.ceil(totalItems / perPage)
                res.status(200).json({
                    message: "Get All Jenjang Pendidikan Success",
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
    }
}