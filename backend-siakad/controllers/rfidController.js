const mahasiswaModel = require('../models/mahasiswaModel.js')
const rfidModel = require('../models/rfidModel.js')
const { Op } = require('sequelize')
const tahunAjaranModel = require('../models/tahunAjaranModel.js')
const semesterModel = require('../models/semesterModel.js')
const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const fakultasModel = require('../models/fakultasModel.js')
const prodiModel = require('../models/prodiModel.js')


module.exports = {
    getAll: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = (currentPage - 1) * perPage
        const totalPage = await rfidModel.count({
            include: [{
                attributes: ["nama"],
                model: mahasiswaModel,
                include: [
                    {
                        attributes: ["nama_jenjang_pendidikan"],
                        model: jenjangPendidikanModel,
                    },
                    {
                        attributes: ["nama_fakultas"],
                        model: fakultasModel,
                    },
                    {
                        attributes: ["nama_prodi"],
                        model: prodiModel,
                    }
                ]
            }],
            where: {
                [Op.or]: [
                    {
                        id_rfid: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_rfid: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nim: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        tanggal_aktif: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        tanggal_non_aktif: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: "aktif"
            }
        })
        const totalItems = Math.ceil(totalPage / perPage)
        await rfidModel.findAll({
            include: [{
                attributes: ["nama"],
                model: mahasiswaModel,
                include: [
                    {
                        attributes: ["nama_jenjang_pendidikan"],
                        model: jenjangPendidikanModel,
                    },
                    {
                        attributes: ["nama_fakultas"],
                        model: fakultasModel,
                    },
                    {
                        attributes: ["nama_prodi"],
                        model: prodiModel,
                    }
                ]
            }],
            where: {
                [Op.or]: [
                    {
                        id_rfid: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_rfid: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nim: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        tanggal_aktif: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        tanggal_non_aktif: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: "aktif"
            },
            offset: offset,
            limit: perPage,
            order: [
                ["id_rfid", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All rfid Success",
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
        await rfidModel.findOne({
            include: [{
                attributes: ["nama"],
                model: mahasiswaModel,
                include: [
                    {
                        attributes: ["nama_jenjang_pendidikan"],
                        model: jenjangPendidikanModel,
                    },
                    {
                        attributes: ["nama_fakultas"],
                        model: fakultasModel,
                    },
                    {
                        attributes: ["nama_prodi"],
                        model: prodiModel,
                    }
                ]
            }],
            where: {
                id_rfid: id,
                status: "aktif"
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data rfid Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data rfid Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    post: async (req, res, next) => {
        const date = new Date().toLocaleDateString('en-CA')
        const { code_rfid, nim, } = req.body
        const rfidUse = await rfidModel.findOne({
            where: {
                nim: nim,
                status: "aktif"
            }
        })
        if (rfidUse) return res.status(401).json({ message: "mahasiswa sudah terdaftar" })
        await rfidModel.create({
            code_rfid: code_rfid,
            nim: nim,
            tanggal_aktif: date,
            tanggal_non_aktif: "",
            status: "aktif",
        }).
            then(result => {
                res.status(201).json({
                    message: "Data rfid success Ditambahkan",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    put: async (req, res, next) => {
        const id = req.params.id
        const rfidUseOne = await rfidModel.findOne({
            where: {
                id_rfid: id,
                status: "aktif"
            }
        })
        if (!rfidUseOne) return res.status(401).json({ message: "data rfid tidak ditemukan" })
        const { code_rfid, nim, } = req.body
        await rfidModel.update({
            code_rfid: code_rfid,
            nim: nim,
        }, {
            where: {
                id_rfid: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data rfid success Diupdate",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    delete: async (req, res, next) => {
        const id = req.params.id
        const rfidModelUse = await rfidModel.findOne({
            where: {
                id_rfid: id,
                status: "aktif"
            }
        })
        if (!rfidModelUse) return res.status(401).json({ message: "Data rfid tidak ditemukan" })
        await rfidModel.update({
            status: "tidak",
        }, {
            where: {
                id_rfid: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "data rfid succes dihapus"
                })
            }).
            catch(err => {
                next(err)
            })
    },

    autocompleteRfid: async (req, res, next) => {
        const { nim } = req.params
        const rfidMhs = await rfidModel.findAll({
            where: {
                nim: nim,
                status: "aktif"
            }
        })
        const datas = rfidMhs.map(el => { return el.nim })
        await mahasiswaModel.findAll({
            attributes: ["id_mahasiswa", "nim", "nama"],
            where: {
                nim: {
                    [Op.notIn]: datas
                },
                status: "aktif"
            }
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Get mahasiswa  Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(200).json({
                    message: "Get mahasiswa Success",
                    data: result,
                })
            }).
            catch(err => {
                next(err)
            })
    }
}