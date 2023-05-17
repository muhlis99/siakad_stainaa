const dosenModel = require('../models/dosenModel.js')
const semesterModel = require('../models/semesterModel.js')
const prodiModel = require('../models/prodiModel.js')
const tahunAjaranModel = require('../models/tahunAjaranModel.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const { Op } = require('sequelize')

module.exports = {
    getAll: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = (currentPage - 1) * perPage
        const totalPage = await mataKuliahModel.count({
            include: [
                {
                    model: dosenModel,
                    attributes: ["id_dosen", "nidn", "nama", "tempat_lahir", "tanggal_lahir", "alamat_lengkap", "status"],
                    where: { status: "aktif" }
                },
                {
                    model: semesterModel,
                    where: { status: "aktif" }
                },
                {
                    model: prodiModel,
                    where: { status: "aktif" }
                },
                {
                    model: tahunAjaranModel,
                    where: { status: "aktif" }
                }
            ],
            where: {
                [Op.or]: [
                    {
                        id_mata_kuliah: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_mata_kuliah: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nama_mata_kuliah: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        sks: {
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
        await mataKuliahModel.findAll({
            include: [
                {
                    model: dosenModel,
                    attributes: ["id_dosen", "nidn", "nama", "tempat_lahir", "tanggal_lahir", "alamat_lengkap", "status"],
                    where: { status: "aktif" }
                },
                {
                    model: semesterModel,
                    where: { status: "aktif" }
                },
                {
                    model: prodiModel,
                    where: { status: "aktif" }
                },
                {
                    model: tahunAjaranModel,
                    where: { status: "aktif" }
                }
            ],
            where: {
                [Op.or]: [
                    {
                        id_mata_kuliah: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_mata_kuliah: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nama_mata_kuliah: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        sks: {
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
                ["id_mata_kuliah", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All Mata Kuliah Success",
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
        await mataKuliahModel.findOne({
            include: [
                {
                    model: dosenModel,
                    attributes: ["id_dosen", "nidn", "nama", "tempat_lahir", "tanggal_lahir", "alamat_lengkap", "status"],
                    where: { status: "aktif" }
                },
                {
                    model: semesterModel,
                    where: { status: "aktif" }
                },
                {
                    model: prodiModel,
                    where: { status: "aktif" }
                },
                {
                    model: tahunAjaranModel,
                    where: { status: "aktif" }
                }
            ],
            where: {
                id_mata_kuliah: id,
                status: "aktif"
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data mata kuliah Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data mata kuliah Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

}