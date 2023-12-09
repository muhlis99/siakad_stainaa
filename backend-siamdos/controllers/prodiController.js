const prodi = require('../models/prodiModel.js')
const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const fakultasModel = require('../models/fakultasModel.js')
const { Op } = require('sequelize')

module.exports = {
    get: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = (currentPage - 1) * perPage
        const totalPage = await prodi.count({
            include: [{
                model: jenjangPendidikanModel,
                attributes: ["id_jenjang_pendidikan", "code_jenjang_pendidikan", "nama_jenjang_pendidikan"],
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                attributes: ["id_fakultas", "code_jenjang_pendidikan", "code_fakultas", "nama_fakultas"],
                where: { status: "aktif" }
            }],
            where: {
                [Op.or]: [
                    {
                        id_prodi: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_jenjang_pendidikan: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_fakultas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_prodi: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nama_prodi: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: "aktif"
            }
        })
        const totalItems = Math.ceil(totalPage / perPage)
        await prodi.findAll({
            include: [{
                model: jenjangPendidikanModel,
                attributes: ["id_jenjang_pendidikan", "code_jenjang_pendidikan", "nama_jenjang_pendidikan"],
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                attributes: ["id_fakultas", "code_jenjang_pendidikan", "code_fakultas", "nama_fakultas"],
                where: { status: "aktif" }
            }],
            where: {
                [Op.or]: [
                    {
                        id_prodi: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_jenjang_pendidikan: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_fakultas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_prodi: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nama_prodi: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: "aktif"
            },
            offset: offset,
            limit: perPage,
            order: [
                ["id_prodi", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All Prodi Success",
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
        const prodiUse = await prodi.findOne({
            include: [{
                model: jenjangPendidikanModel,
                attributes: ["id_jenjang_pendidikan", "code_jenjang_pendidikan", "nama_jenjang_pendidikan"],
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                attributes: ["id_fakultas", "code_jenjang_pendidikan", "code_fakultas", "nama_fakultas"],
                where: { status: "aktif" }
            }],
            where: {
                id_prodi: id,
                status: "aktif"
            }
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data Prodi Tidak Ditemukan",
                        data: []
                    })
                }
                res.status(201).json({
                    message: "Data Prodi Ditemukan",
                    data: result
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getProdiByFakultas: async (req, res, next) => {
        const code = req.params.code
        const prodiUse = await prodi.findAll({
            include: [{
                model: jenjangPendidikanModel,
                attributes: ["id_jenjang_pendidikan", "code_jenjang_pendidikan", "nama_jenjang_pendidikan"],
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                attributes: ["id_fakultas", "code_jenjang_pendidikan", "code_fakultas", "nama_fakultas"],
                where: { status: "aktif" }
            }],
            where: {
                code_fakultas: code,
                status: "aktif"
            }
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data Prodi Tidak Ditemukan",
                        data: []
                    })
                }
                res.status(201).json({
                    message: "Data Prodi Ditemukan",
                    data: result
                })
            }).
            catch(err => {
                next(err)
            })
    },

    post: async (req, res, next) => {
        const { code_jenjang_pendidikan, code_fakultas,
            // code_dikti_prodi,
            nama_prodi } = req.body
        let code = ""
        if (nama_prodi === "TEKNIK ELECTRO") {
            code = "TE"
        } else if (nama_prodi === "PERBANKAN SYARI'AH") {
            code = "PS"
        } else if (nama_prodi === "TEKNIK INFORMATIKA") {
            code = "TIK"
        } else if (nama_prodi === "HUKUM EKONOMI SYARI'AH") {
            code = "HES"
        } else if (nama_prodi === "PENDIDIKAN AGAMA ISLAM") {
            code = "PAI"
        } else {
            code = ""
        }
        const codeProdi = code_fakultas + code
        const duplicateData = await prodi.findOne({
            where: {
                code_jenjang_pendidikan: code_jenjang_pendidikan,
                code_fakultas: code_fakultas,
                // code_dikti_prodi: "",
                nama_prodi: nama_prodi,
                code_prodi: codeProdi,
                status: "aktif"
            }
        })
        if (duplicateData) return res.status(401).json({ message: "Data Prodi sudah ada" })
        await prodi.create({
            code_jenjang_pendidikan: code_jenjang_pendidikan,
            code_fakultas: code_fakultas,
            // code_prodi: codeProdi,
            // code_dikti_prodi: "",
            nama_prodi: nama_prodi,
            status: "aktif"
        }).
            then(result => {
                res.status(201).json({
                    message: "Data Prodi success Ditambahkan",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    put: async (req, res, next) => {
        const id = req.params.id
        const { code_jenjang_pendidikan, code_fakultas,
            // code_dikti_prodi, 
            nama_prodi } = req.body
        const prodiUse = await prodi.findOne({
            include: [{
                model: jenjangPendidikanModel,
                attributes: ["id_jenjang_pendidikan", "code_jenjang_pendidikan", "nama_jenjang_pendidikan"],
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                attributes: ["id_fakultas", "code_jenjang_pendidikan", "code_fakultas", "nama_fakultas"],
                where: { status: "aktif" }
            }],
            where: {
                id_prodi: id,
                status: "aktif"
            }
        })
        if (!prodiUse) return res.status(401).json({ message: "Data Prodi tidak ditemukan" })
        let code = ""
        if (nama_prodi === "TEKNIK ELECTRO") {
            code = "TE"
        } else if (nama_prodi === "PERBANKAN SYARI'AH") {
            code = "PS"
        } else if (nama_prodi === "TEKNIK INFORMATIKA") {
            code = "TIK"
        } else if (nama_prodi === "HUKUM EKONOMI SYARI'AH") {
            code = "HES"
        } else if (nama_prodi === "PENDIDIKAN AGAMA ISLAM") {
            code = "PAI"
        } else {
            code = ""
        }
        const codeProdi = code_fakultas + code
        const duplicateData = await prodi.findOne({
            where: {
                code_jenjang_pendidikan: code_jenjang_pendidikan,
                code_fakultas: code_fakultas,
                nama_prodi: nama_prodi,
                code_prodi: codeProdi,
                status: "aktif"
            }
        })
        if (duplicateData) return res.status(401).json({ message: "Data Prodi sudah ada" })
        await prodi.update({
            code_jenjang_pendidikan: code_jenjang_pendidikan,
            code_fakultas: code_fakultas,
            code_prodi: codeProdi,
            // code_dikti_prodi: code_dikti_prodi,
            nama_prodi: nama_prodi,
        }, {
            where: {
                id_prodi: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data Prodi success diupdate"
                })
            }).
            catch(err => {
                next(err)
            })
    },

    deleteStatus: async (req, res, next) => {
        const id = req.params.id
        const prodiUse = await prodi.findOne({
            include: [{
                model: jenjangPendidikanModel,
                attributes: ["id_jenjang_pendidikan", "code_jenjang_pendidikan", "nama_jenjang_pendidikan"],
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                attributes: ["id_fakultas", "code_jenjang_pendidikan", "code_fakultas", "nama_fakultas"],
                where: { status: "aktif" }
            }],
            where: {
                id_prodi: id,
                status: "aktif"
            }
        })
        if (!prodiUse) return res.status(401).json({ message: "Data prodi tidak ditemukan" })
        await prodi.update({
            status: "tidak"
        }, {
            where: {
                id_prodi: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "data prodi succes dihapus"
                })
            }).
            catch(err => {
                next(err)
            })
    }
}