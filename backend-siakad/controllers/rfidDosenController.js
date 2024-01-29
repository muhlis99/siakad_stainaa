const dosenModel = require('../models/dosenModel.js')
const rfidDosenModel = require('../models/rfidDosenModel.js')
const { Op } = require('sequelize')


module.exports = {
    getAll: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = (currentPage - 1) * perPage
        const totalPage = await rfidDosenModel.count({
            include: [{
                attributes: ["nama", "nip_ynaa"],
                model: dosenModel,
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
                        nip_ynaa: {
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
        await rfidDosenModel.findAll({
            include: [{
                attributes: ["nama", "nip_ynaa"],
                model: dosenModel,
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
                        nip_ynaa: {
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
                console.log(err)
            })
    },

    getById: async (req, res, next) => {
        const id = req.params.id
        await rfidDosenModel.findOne({
            include: [{
                attributes: ["nama", "nip_ynaa"],
                model: dosenModel,
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
        const { code_rfid, nip_ynaa, } = req.body
        const rfidUse = await rfidDosenModel.findOne({
            where: {
                nip_ynaa: nip_ynaa,
                status: "aktif"
            }
        })
        if (rfidUse) return res.status(401).json({ message: "Dosen sudah terdaftar" })
        await rfidDosenModel.create({
            code_rfid: code_rfid,
            nip_ynaa: nip_ynaa,
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
        const rfidUseOne = await rfidDosenModel.findOne({
            where: {
                id_rfid: id,
                status: "aktif"
            }
        })
        if (!rfidUseOne) return res.status(401).json({ message: "data rfid tidak ditemukan" })
        const { code_rfid, nip_ynaa, } = req.body
        await rfidDosenModel.update({
            code_rfid: code_rfid,
            nip_ynaa: nip_ynaa,
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
        const date = new Date().toLocaleDateString('en-CA')
        const id = req.params.id
        const rfidDosenModelUse = await rfidDosenModel.findOne({
            where: {
                id_rfid: id,
                status: "aktif"
            }
        })
        if (!rfidDosenModelUse) return res.status(401).json({ message: "Data rfid tidak ditemukan" })
        await rfidDosenModel.update({
            status: "tidak",
            tanggal_non_aktif: date
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
        const { nipy } = req.params
        const rfidMhs = await rfidDosenModel.findAll({
            where: {
                nip_ynaa: nipy,
                status: "aktif"
            }
        })
        const datas = rfidMhs.map(el => { return el.nip_ynaa })
        await dosenModel.findAll({
            attributes: ["id_Dosen", "nip_ynaa", "nama"],
            where: {
                nip_ynaa: {
                    [Op.notIn]: datas
                },
                status: "aktif"
            }
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Get Dosen  Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(200).json({
                    message: "Get Dosen Success",
                    data: result,
                })
            }).
            catch(err => {
                next(err)
            })
    }
}