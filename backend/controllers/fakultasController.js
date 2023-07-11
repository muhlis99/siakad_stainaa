const fakultas = require('../models/fakultasModel.js')
const jenjangPendidikan = require('../models/jenjangPendidikanModel.js')
const { Op } = require('sequelize')


module.exports = {
    get: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = (currentPage - 1) * perPage
        const totalPage = await fakultas.count({
            include: [{
                model: jenjangPendidikan,
                attributes: ["id_jenjang_pendidikan", "code_jenjang_pendidikan", "nama_jenjang_pendidikan"],
                where: { status: "aktif" }
            }],
            where: {
                [Op.or]: [
                    {
                        id_fakultas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_fakultas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nama_fakultas: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: "aktif"
            }
        })
        const totalItems = Math.ceil(totalPage / perPage)
        await fakultas.findAll({
            include: [{
                model: jenjangPendidikan,
                attributes: ["id_jenjang_pendidikan", "code_jenjang_pendidikan", "nama_jenjang_pendidikan"],
                where: { status: "aktif" }
            }],
            where: {
                [Op.or]: [
                    {
                        id_fakultas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_fakultas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nama_fakultas: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: "aktif"
            },
            offset: offset,
            limit: perPage,
            order: [
                ["id_fakultas", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All Fakultas Success",
                    data: result,
                    total_data: totalPage,
                    per_page: perPage,
                    current_page: currentPage,
                    totalPage: totalItems
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getById: async (req, res, next) => {
        const id = req.params.id
        const fakultasUse = await fakultas.findOne({
            include: [{
                model: jenjangPendidikan,
                attributes: ["id_jenjang_pendidikan", "code_jenjang_pendidikan", "nama_jenjang_pendidikan"],
                where: { status: "aktif" }
            }],
            where: {
                id_fakultas: id,
                status: "aktif"
            }
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data fakultas Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data fakultas Ditemukan",
                    data: result
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getFakulatsByJenjang: async (req, res, next) => {
        const code = req.params.code
        const fakultasUse = await fakultas.findAll({
            include: [{
                model: jenjangPendidikan,
                attributes: ["id_jenjang_pendidikan", "code_jenjang_pendidikan", "nama_jenjang_pendidikan"],
                where: { status: "aktif" }
            }],
            where: {
                code_jenjang_pendidikan: code,
                status: "aktif"
            }
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data fakultas Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data fakultas Ditemukan",
                    data: result
                })
            }).
            catch(err => {
                next(err)
            })
    },

    post: async (req, res, next) => {
        const { code_jenjang_pendidikan, code_dikti_fakultas, codeFks, nama_fakultas } = req.body
        // let code = ""
        // if (nama_fakultas === "AGAMA ISLAM") {
        //     code = "AI"
        // } else if (nama_fakultas === "AKUNTANSI") {
        //     code = "AK"
        // } else if (nama_fakultas === "TEKNOLOGI INFORMASI") {
        //     code = "TI"
        // } else if (nama_fakultas === "KOMUNIKASI") {
        //     code = "KM"
        // } else if (nama_fakultas === "PSIKOLOGI") {
        //     code = "PS"
        // } else {
        //     code = ""
        // }
        const codefakultas = code_jenjang_pendidikan + codeFks
        const duplicateData = await fakultas.findOne({
            where: {
                code_fakultas: codefakultas
            }
        })
        if (duplicateData) return res.status(401).json({ message: "Data fakultas sudah ada" })
        await fakultas.create({
            code_jenjang_pendidikan: code_jenjang_pendidikan,
            code_fakultas: codefakultas,
            code_dikti_fakultas: code_dikti_fakultas,
            nama_fakultas: nama_fakultas,
            status: "aktif"
        }).
            then(result => {
                res.status(201).json({
                    message: "Data Fakultas success Ditambahkan",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    put: async (req, res, next) => {
        const id = req.params.id
        const { code_jenjang_pendidikan, code_dikti_fakultas, nama_fakultas } = req.body
        const fakultasUse = await fakultas.findOne({
            include: [{
                model: jenjangPendidikan,
                attributes: ["id_jenjang_pendidikan", "code_jenjang_pendidikan", "nama_jenjang_pendidikan"],
                where: { status: "aktif" }
            }],
            where: {
                id_fakultas: id,
                status: "aktif"
            }
        })
        if (!fakultasUse) return res.status(401).json({ message: "Data Fakultas tidak ditemukan" })
        let code = ""
        if (nama_fakultas === "AGAMA ISLAM") {
            code = "AI"
        } else if (nama_fakultas === "AKUNTANSI") {
            code = "AK"
        } else if (nama_fakultas === "TEKNOLOGI INFORMASI") {
            code = "TI"
        } else if (nama_fakultas === "KOMUNIKASI") {
            code = "KM"
        } else if (nama_fakultas === "PSIKOLOGI") {
            code = "PS"
        } else {
            code = ""
        }
        const codefakultas = code_jenjang_pendidikan + code
        const duplicateData = await fakultas.findOne({
            where: {
                code_fakultas: codefakultas
            }
        })
        if (duplicateData) return res.status(401).json({ message: "Data fakultas sudah ada" })
        await fakultas.update({
            code_jenjang_pendidikan: code_jenjang_pendidikan,
            // code_fakultas: codefakultas,
            code_dikti_fakultas: code_dikti_fakultas,
            nama_fakultas: nama_fakultas
        }, {
            where: {
                id_fakultas: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data Fakultas success diupdate"
                })
            }).
            catch(err => {
                next(err)
            })
    },

    deleteStatus: async (req, res, next) => {
        const id = req.params.id
        const fakultasUse = await fakultas.findOne({
            include: [{
                model: jenjangPendidikan,
                attributes: ["id_jenjang_pendidikan", "code_jenjang_pendidikan", "nama_jenjang_pendidikan"],
                where: { status: "aktif" }
            }],
            where: {
                id_fakultas: id,
                status: "aktif"
            }
        })
        if (!fakultasUse) return res.status(401).json({ message: "Data fakultas tidak ditemukan" })
        await fakultas.update({
            status: "tidak"
        }, {
            where: {
                id_fakultas: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "data fakultas succes dihapus"
                })
            }).
            catch(err => {
                next(err)
            })
    }
}