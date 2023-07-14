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
    },

    post: async (req, res, next) => {
        const { dari_tahun, sampai_tahun, periode, keterangan } = req.body
        let code = ""
        if (periode === "Genap") {
            code = "gnp"
        } else if (periode === "Ganjil") {
            code = "gnj"
        } else {
            code = ""
        }
        const code_tahun_ajaran = dari_tahun.substr(2, 4) + sampai_tahun.substr(2, 4) + code
        const tahun_ajaran = dari_tahun + " / " + sampai_tahun + " " + `( ${periode} )`
        const tahunAjaranUse = await tahunAjaran.findOne({
            where: {
                code_tahun_ajaran: code_tahun_ajaran
            }
        })
        if (tahunAjaranUse) return res.status(401).json({ message: "Data Tahun Ajaran sudah ada" })
        await tahunAjaran.create({
            code_tahun_ajaran: code_tahun_ajaran,
            tahun_ajaran: tahun_ajaran,
            keterangan: keterangan,
            status: "aktif",
        }).
            then(result => {
                res.status(201).json({
                    message: "Data Tahun Ajaran success Ditambahkan",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    put: async (req, res, next) => {
        const id = req.params.id
        const tahunAjaranUse = await tahunAjaran.findOne({
            where: {
                id_tahun_ajaran: id,
                status: "aktif"
            }
        })
        if (!tahunAjaranUse) return res.status(401).json({ message: "Data tahun Ajaran tidak ditemukan" })
        const { dari_tahun, sampai_tahun, periode, keterangan } = req.body
        const tahun_ajaran = dari_tahun + "/" + sampai_tahun + periode
        const tahunAjaranDuplicate = await tahunAjaran.findOne({
            where: {
                tahun_ajaran: tahun_ajaran,
                keterangan: keterangan
            }
        })
        if (tahunAjaranDuplicate) return res.status(401).json({ message: "data tahun Ajaran sudah ada" })
        await tahunAjaran.update({
            tahun_ajaran: tahun_ajaran,
            keterangan: keterangan,
            status: "aktif",
        }, {
            where: {
                id_tahun_ajaran: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data tahun Ajaran success Diupdate",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    delete: async (req, res, next) => {
        const id = req.params.id
        const tahunAjaranUse = await tahunAjaran.findOne({
            where: {
                id_tahun_ajaran: id,
                status: "aktif"
            }
        })
        if (!tahunAjaranUse) return res.status(401).json({ message: "Data Tahun Ajaran tidak ditemukan" })
        await tahunAjaran.update({
            status: "tidak"
        }, {
            where: {
                id_tahun_ajaran: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "data Tahun Ajaran succes dihapus"
                })
            }).
            catch(err => {
                next(err)
            })
    }
}