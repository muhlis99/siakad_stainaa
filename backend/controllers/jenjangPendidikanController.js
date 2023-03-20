const jejangPendidikan = require('../models/jenjangPendidikanModel.js')

module.exports = {
    get : async (req, res, next) => {
        const currentPage = req.query.page || 1
        const perPage = req.query.perPage || 10
        let totalItems
        await jejangPendidikan.findAndCountAll().
            then(all => {
                totalItems = all.count
                return jejangPendidikan.findAll({
                    offset : (parseInt(currentPage) - 1) * parseInt(perPage),
                    limit : parseInt(perPage)
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
}