const jejangPendidikan = require('../models/jenjangPendidikanModel.js')
const { Op } = require("sequelize")

module.exports = {
    get : async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        let totalItems
        await jejangPendidikan.findAndCountAll({
                where : {
                    [Op.or] : [
                        {id_jenjang_pendidikan : {
                            [Op.like] : `%${search}%`
                        }},
                        {code_jenjang_pendidikan : {
                            [Op.like] :  `%${search}%`
                        }},
                        {nama_jenjang_pendidikan : {
                            [Op.like] :  `%${search}%`
                        }}
                    ],
                    status : "aktif"
                }
            }).
            then(all => {
                totalItems = all.count
                return jejangPendidikan.findAll({
                    where : {
                        [Op.or] : [
                            {id_jenjang_pendidikan : {
                                [Op.like] :  `%${search}%`
                            }},
                            {code_jenjang_pendidikan : {
                                [Op.like] :  `%${search}%`
                            }},
                            {nama_jenjang_pendidikan : {
                                [Op.like] :  `%${search}%`
                            }}
                        ],
                        status : "aktif"
                    },
                    offset : (currentPage - 1) * perPage,
                    limit : perPage,
                    order : [
                        ["id_jenjang_pendidikan", "DESC"]
                    ]
                })
            }).
            then(result => {
                res.status(200).json({
                    message : "Get All Jenjang Pendidikan Success",
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

    getById : async(req, res, next) => {
        const id = req.params.id
        await jejangPendidikan.findOne({
            where : {
                id_jenjang_pendidikan : id
            }
        }).
        then(getById => {
            if (!getById) {
                return res.status(404).json({
                    message : "Data jejang Pendidikan Tidak Ditemukan",
                    data : null
                })
            }
            res.status(201).json({
                message : "Data jejang Pendidikan Ditemukan",
                data : getById
            })
        }).
        catch(err => {
            next(err)
        })
    },

    post : async (req, res, next) => {
        const {nama_jenjang_pendidikan} = req.body
        const date = new Date().getFullYear()
        const code = "S1"+date
        await jejangPendidikan.create({
                code_jenjang_pendidikan : code,
                nama_jenjang_pendidikan : nama_jenjang_pendidikan,
                status : "aktif"
        }).
        then(result => {
            res.status(201).json({
                message : "Data Jenjang pendidikan success Ditambahkan",
                data : result
            })
        }).
        catch(err => {
            next(err)
        })
    },

    put : async (req, res, next) => {
        const id = req.params.id
        const {nama_jenjang_pendidikan} = req.body
        const date = new Date().getFullYear()
        const code = "S1"+date
        const jejangPendidikanUse = await jejangPendidikan.findOne({
            where : {
                id_jenjang_pendidikan : id
            }
        })
        if (!jejangPendidikanUse) return res.status(401).json({message : "Data jejang Pendidikan tidak ditemukan"})
        await jejangPendidikan.update({
                nama_jenjang_pendidikan : nama_jenjang_pendidikan,
                code : code
            },{
                where : {
                    id_jenjang_pendidikan : id
                }
            }).
            then(result => {
                res.status(201).json({
                    message : "Data jenjang pendidikan success diupdate"
                }) 
            }).
            catch(err => {
                next(err)
            })
    },

    deleteStatus : async (req, res, next) => {
        const id = req.params.id
        const jejangPendidikanUse = await jejangPendidikan.findOne({
            where : {
                id_jenjang_pendidikan : id
            }
        })
        if (!jejangPendidikanUse) return res.status(401).json({message : "Data jejang Pendidikan tidak ditemukan"})
        await jejangPendidikan.update({
            status : "tidak"
        },{
            where : {
                id_jenjang_pendidikan : id
            }
        }).
        then(result => {
            res.status(201).json({
                message : "data jenjang pendidikan succes dihapus"
            })
        }).
        catch(err => {
            next(err)
        })
    }
}