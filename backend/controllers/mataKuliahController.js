const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const fakultasModel = require('../models/fakultasModel.js')
const prodiModel = require('../models/prodiModel.js')
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
                    model: jenjangPendidikanModel,
                    where: { status: "aktif" }
                },
                {
                    model: fakultasModel,
                    where: { status: "aktif" }
                },
                {
                    model: prodiModel,
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
                    model: jenjangPendidikanModel,
                    where: { status: "aktif" }
                },
                {
                    model: fakultasModel,
                    where: { status: "aktif" }
                },
                {
                    model: prodiModel,
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
                console.log(err)
            })
    },

    getById: async (req, res, next) => {
        const id = req.params.id
        await mataKuliahModel.findOne({
            include: [
                {
                    model: jenjangPendidikanModel,
                    where: { status: "aktif" }
                },
                {
                    model: fakultasModel,
                    where: { status: "aktif" }
                },
                {
                    model: prodiModel,
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

    post: async (req, res, next) => {
        const { code_mata_kuliah, nama_mata_kuliah, jenis_mata_kuliah, code_jenjang_pendidikan,
            code_fakultas, code_prodi, sks, sks_praktek, sks_prak_lapangan,
            sks_simulasi, tanggal_aktif } = req.body

        const mataKuliahUse = await mataKuliahModel.findOne({
            where: {
                code_mata_kuliah: code_mata_kuliah,
                nama_mata_kuliah: nama_mata_kuliah,
                jenis_mata_kuliah: jenis_mata_kuliah,
                code_prodi: code_prodi,
                status: "aktif"
            }
        })
        if (mataKuliahUse) return res.status(401).json({ message: "data mata kuliah sudah ada" })
        await mataKuliahModel.create({
            code_mata_kuliah: code_mata_kuliah,
            nama_mata_kuliah: nama_mata_kuliah,
            jenis_mata_kuliah: jenis_mata_kuliah,
            code_jenjang_pendidikan: code_jenjang_pendidikan,
            code_fakultas: code_fakultas,
            code_prodi: code_prodi,
            sks: sks,
            sks_praktek: sks_praktek,
            sks_prak_lapangan: sks_prak_lapangan,
            sks_simulasi: sks_simulasi,
            tanggal_aktif: tanggal_aktif,
            status: "aktif"
        }).
            then(result => {
                res.status(201).json({
                    message: "Data mata kuliah success Ditambahkan",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    put: async (req, res, next) => {
        const id = req.params.id
        const mataKuliahUse = await mataKuliahModel.findOne({
            include: [
                {
                    model: jenjangPendidikanModel,
                    where: { status: "aktif" }
                },
                {
                    model: fakultasModel,
                    where: { status: "aktif" }
                },
                {
                    model: prodiModel,
                    where: { status: "aktif" }
                }
            ],
            where: {
                id_mata_kuliah: id,
                status: "aktif"
            }
        })
        if (!mataKuliahUse) return res.status(401).json({ message: "Data Mata Kuliah tidak ditemukan" })
        const { code_mata_kuliah, nama_mata_kuliah, jenis_mata_kuliah,
            code_jenjang_pendidikan, code_fakultas, code_prodi, code_kategori_nilai,
            sks, sks_praktek, sks_prak_lapangan, sks_simulasi, tanggal_aktif } = req.body
        const mataKuliahDuplicate = await mataKuliahModel.findOne({
            where: {
                code_mata_kuliah: code_mata_kuliah,
                nama_mata_kuliah: nama_mata_kuliah,
                jenis_mata_kuliah: jenis_mata_kuliah,
                code_prodi: code_prodi,
                status: "aktif"
            }
        })
        if (mataKuliahDuplicate) return res.status(401).json({ message: "data mata kuliah sudah ada" })
        await mataKuliahModel.update({
            code_mata_kuliah: code_mata_kuliah,
            nama_mata_kuliah: nama_mata_kuliah,
            jenis_mata_kuliah: jenis_mata_kuliah,
            code_jenjang_pendidikan: code_jenjang_pendidikan,
            code_fakultas: code_fakultas,
            code_prodi: code_prodi,
            code_kategori_nilai: code_kategori_nilai,
            sks: sks,
            sks_praktek: sks_praktek,
            sks_prak_lapangan: sks_prak_lapangan,
            sks_simulasi: sks_simulasi,
            tanggal_aktif: tanggal_aktif,
            status: "aktif"
        }, {
            where: {
                id_mata_kuliah: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data mata kuliah success Diupdate",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    delete: async (req, res, next) => {
        const id = req.params.id
        const mataKuliahUse = await mataKuliahModel.findOne({
            include: [
                {
                    model: jenjangPendidikanModel,
                    where: { status: "aktif" }
                },
                {
                    model: fakultasModel,
                    where: { status: "aktif" }
                },
                {
                    model: prodiModel,
                    where: { status: "aktif" }
                }
            ],
            where: {
                id_mata_kuliah: id,
                status: "aktif"
            }
        })
        if (!mataKuliahUse) return res.status(401).json({ message: "Data mata kuliah tidak ditemukan" })
        await mataKuliahModel.update({
            status: "tidak"
        }, {
            where: {
                id_mata_kuliah: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "data mata kuliah succes dihapus"
                })
            }).
            catch(err => {
                next(err)
            })
    }

}