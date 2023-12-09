const mahasiswa = require('../models/mahasiswaModel.js')
const historyMahasiswa = require('../models/historyMahasiswaModel.js')
const fakultasModel = require('../models/fakultasModel.js')
const semesterModel = require('../models/semesterModel.js')
const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const prodiModel = require('../models/prodiModel.js')
const tahunAjaranModel = require('../models/tahunAjaranModel.js')
const { Op } = require('sequelize')


module.exports = {
    smtByThnAjr: async (req, res, next) => {
        const thnAjr = req.params.thnAjr
        await semesterModel.findAll({
            include: [
                {
                    model: tahunAjaranModel,
                    where: { status: "aktif" }
                }
            ],
            where: {
                code_tahun_ajaran: thnAjr,
                status: "aktif"
            },
            order: [
                ["id_semester", "DESC"]
            ]
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data semester Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data semester Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    }
}