const pengumumanModel = require('../models/pengumumanModel.js')
const { Op, Sequelize } = require('sequelize')

module.exports = {
    getById: async (req, res, next) => {
        const id = req.params.id
        const pengumumanUse = await pengumumanModel.findOne({
            where: {
                id_pengumuman: id
            }
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data pengumuman Tidak Ditemukan",
                        data: []
                    })
                }
                res.status(201).json({
                    message: "Data pengumuman Ditemukan",
                    data: result
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getByLevel: async (req, res, next) => {
        const level = req.params.level
        const dateFirst = req.params.dateFirst
        const dateSecond = req.params.dateSecond
        await pengumumanModel.findAll({
            where: {
                level: level,
                tanggal_pengumuman: {
                    [Op.between]: [dateFirst, dateSecond]
                }
            }
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: `Data pengumuman ${level} Tidak Ditemukan`,
                        data: []
                    })
                }
                res.status(201).json({
                    message: `Data pengumuman ${level} Ditemukan`,
                    data: result
                })
            }).
            catch(err => {
                next(err)
            })
    }
}