const pengumumanModel = require('../models/pengumumanModel.js')
const { Op } = require('sequelize')

module.exports = {
    get: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = (currentPage - 1) * perPage
        const totalPage = await pengumumanModel.count({
            where: {
                [Op.or]: [
                    {
                        id_pengumuman: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        tanggal_pengumuman: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        pengumuman: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            }
        })
        const totalItems = Math.ceil(totalPage / perPage)
        await pengumumanModel.findAll({
            where: {
                [Op.or]: [
                    {
                        id_pengumuman: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        tanggal_pengumuman: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        pengumuman: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            },
            offset: offset,
            limit: perPage,
            order: [
                ["id_pengumuman", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All pengumumanModel Success",
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
        const pengumumanUse = await pengumumanModel.findOne({
            where: {
                id_pengumuman: id
            }
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data pengumuman Tidak Ditemukan",
                        data: []
                    })
                }
                res.status(201).json({
                    message: "Data pengumuman Ditemukan",
                    data: result
                })
            }).
            catch(err => {
                next(err)
            })
    },

    post: async (req, res, next) => {
        const { tanggal_pengumuman, judul_pengumuman, pengumuman, level } = req.body
        await pengumumanModel.create({
            tanggal_pengumuman: tanggal_pengumuman,
            judul_pengumuman: judul_pengumuman,
            pengumuman: pengumuman,
            level: level
        }).
            then(result => {
                res.status(201).json({
                    message: "Data pengumuman success Ditambahkan",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    put: async (req, res, next) => {
        const id = req.params.id
        const { tanggal_pengumuman, judul_pengumuman, pengumuman, level } = req.body
        const pengumumanModelUse = await pengumumanModel.findOne({
            where: {
                id_pengumuman: id,
            }
        })
        if (!pengumumanModelUse) return res.status(401).json({ message: "Data pengumuman tidak ditemukan" })
        await pengumumanModel.update({
            tanggal_pengumuman: tanggal_pengumuman,
            judul_pengumuman: judul_pengumuman,
            pengumuman: pengumuman,
            level: level
        }, {
            where: {
                id_pengumuman: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data pengumuman success diupdate"
                })
            }).
            catch(err => {
                next(err)
            })
    }
}