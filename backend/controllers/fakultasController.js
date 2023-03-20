const fakultas = require('../models/fakultasModel.js')
const jenjangPendidikan = require('../models/jenjangPendidikanModel.js')
const {Op} = require('sequelize')


module.exports = {
    get : async(req, res, next) => {
        const currentPage = parseInt(req.query.page) || 0
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = perPage * currentPage
        const totalPage =  await fakultas.count({
            include : [{
                model : jenjangPendidikan,
                attributes : ["id_jenjang_pendidikan", "code_jenjang_pendidikan", "nama_jenjang_pendidikan"],
                where  : {status:"aktif"}
            }],
            where : {
                [Op.or] : [
                    {id_fakultas : {
                        [Op.like] : `%${search}%`
                    }},
                    {code_fakultas : {
                        [Op.like] :  `%${search}%`
                    }},
                    {nama_fakultas : {
                        [Op.like] :  `%${search}%`
                    }}
                ],
                status: "aktif"
            }
        })
        const totalItems = Math.ceil(totalPage / perPage)
        await fakultas.findAll({
            include : [{
                model : jenjangPendidikan,
                attributes : ["id_jenjang_pendidikan", "code_jenjang_pendidikan", "nama_jenjang_pendidikan"],
                where  : {status:"aktif"}
            }],
            where : {
                [Op.or] : [
                    {id_fakultas : {
                        [Op.like] : `%${search}%`
                    }},
                    {code_fakultas : {
                        [Op.like] :  `%${search}%`
                    }},
                    {nama_fakultas : {
                        [Op.like] :  `%${search}%`
                    }}
                ],
                status: "aktif"
            },
            offset : offset,
            limit : perPage,
            order : [
                ["id_fakultas", "DESC"]
            ]
        }).
        then(result => {
            res.status(200).json({
                    message : "Get All Fakultas Success",
                    data : result,
                    total_data : totalItems,
                    per_page : perPage,
                    current_page : currentPage
                })
        }).
        catch(err => {
            next(err)
        })
    },

    getById : async (req, res, next) => {
        const id = req.params.id
        const fakultasUse = await fakultas.findOne({
            include : [{
                model : jenjangPendidikan,
                attributes : ["id_jenjang_pendidikan", "code_jenjang_pendidikan", "nama_jenjang_pendidikan"],
                where  : {status:"aktif"}
            }],
            where : {
                id_fakultas : id,
                status : "aktif"
            }
        }).
        then(result => {
            if (!result) {
                return res.status(404).json({
                    message : "Data fakultas Tidak Ditemukan",
                    data : null
                })
            }
            res.status(201).json({
                message : "Data fakultas Ditemukan",
                data : result
            })
        }).
        catch(err => {
            next(err)
        })
    },

    post : async (req, res, next) => {
        const {code_jenjang_pendidikan, nama_fakultas} = req.body
        const codefakultas = code_jenjang_pendidikan + "TH"
        await fakultas.create({
                code_jenjang_pendidikan : code_jenjang_pendidikan,
                code_fakultas : codefakultas,
                nama_fakultas : nama_fakultas,
                status : "aktif"
        }).
        then(result => {
            res.status(201).json({
                message : "Data Fakultas success Ditambahkan",
                data : result
            })
        }).
        catch(err => {
            next(err)
        })
    },

    put : async (req, res, next) => {
        const id = req.params.id
        const {code_jenjang_pendidikan, nama_fakultas} = req.body
        const codefakultas = code_jenjang_pendidikan + "TH"
        const fakultasUse = await fakultas.findOne({
            where : {
                id_fakultas : id
            }
        })
        if (!fakultasUse) return res.status(401).json({message : "Data Fakultas tidak ditemukan"})
        await fakultas.update({
            code_jenjang_pendidikan : code_jenjang_pendidikan,
            code_fakultas : codefakultas,
            nama_fakultas : nama_fakultas
        },{
            where : {
                id_fakultas : id
            }
        }).
        then(result => {
            res.status(201).json({
                message : "Data Fakultas success diupdate"
            }) 
        }).
        catch(err => {
            next(err)
        })
    },

    deleteStatus : async (req, res, next) => {
        const id = req.params.id
        const fakultasUse = await fakultas.findOne({
            where : {
                id_fakultas : id
            }
        })
        if (!fakultasUse) return res.status(401).json({message : "Data fakultas tidak ditemukan"})
        await fakultas.update({
            status : "tidak"
        },{
            where : {
                id_fakultas : id
            }
        }).
        then(result => {
            res.status(201).json({
                message : "data fakultas succes dihapus"
            })
        }).
        catch(err => {
            next(err)
        })
    }
}