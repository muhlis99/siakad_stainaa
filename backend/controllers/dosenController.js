const dosen = require('../models/dosenModel.js')
const { pendidikan, alatTransportasi } = require('../models/equipmentDsnMhsModel.js')
const { Op } = require('sequelize')

module.exports = {
    getAll: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        let totalItems
        await dosen.findAndCountAll({
            where: {
                status: "aktif"
            }
        }).
            then(all => {
                totalItems = all.count
                return dosen.findAll({
                    include: [{
                        model: pendidikan
                    }, {
                        model: alatTransportasi
                    }],
                    attributes: ["id_dosen", "nama", "nidn", "jenis_kelamin", "status"],
                    where: {
                        [Op.or]: [
                            {
                                nama: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                nidn: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                jenis_kelamin: {
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
                    offset: (currentPage - 1) * perPage,
                    limit: perPage,
                    order: [
                        ["id_dosen", "DESC"]
                    ]
                })
            }).
            then(result => {
                const totalPage = Math.ceil(totalItems / perPage)
                res.status(200).json({
                    message: "Get All Dosen Success",
                    data: result,
                    total_data: totalItems,
                    per_page: perPage,
                    current_page: currentPage,
                    total_page: totalPage
                })
            }).
            catch(err => {
                // next(err)
                res.status(404).json({
                    data: err
                })
            })
    },

    getById: async (req, res, next) => {
        const id = req.params.id
        await dosen.findOne({
            include: [{
                model: pendidikan
            }, {
                model: alatTransportasi
            }],
            where: {
                id_dosen: id,
                status: 'aktif'
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data dosen Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data dosen Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    }
}