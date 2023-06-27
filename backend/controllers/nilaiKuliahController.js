const { Op } = require('sequelize')
const kelasModel = require('../models/kelasKuliahModel.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const mahasiswaModel = require('../models/mahasiswaModel.js')
const kategoriNilaiModel = require('../models/kategoriNilaiModel.js')
const nilaiKuliahModel = require('../models/nilaiKuliahModel.js')

module.exports = {
    get: async (req, res, next) => {
        const { codeMakul, codeKls } = req.query
        await nilaiKuliahModel.findAll({
            include: [{
                model: kategoriNilaiModel,
                where: { status: "aktif" }
            }, {
                attributes: ['nim', 'nama'],
                model: mahasiswaModel,
                where: { status: "aktif" }
            }, {
                model: mataKuliahModel,
                where: { status: "aktif" }
            }, {
                model: kelasModel,
                where: { status: "aktif" }
            }],
            where: {
                code_mata_kuliah: codeMakul,
                code_kelas: codeKls,
                status: "aktif"
            },
            group: ['kelas.code_kelas'],
            order: [
                ["id_nilai_kuliah", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All nilai kuliah Success",
                    data: result,
                })
            }).
            catch(err => {
                next(err)
            })
    },

    // getMhsByKelas: async (req, res, next) => {
    //     const { codeMakul, codeKls } = req.params
    //     await kelasModel.findAll({
    //         include: [{
    //             attributes: ['nim', 'nama'],
    //             model: mahasiswaModel,
    //             where: { status: "aktif" }
    //         }, {
    //             attributes: ['code_mata_kuliah', 'nama_mata_kuliah', 'sks'],
    //             model: mataKuliahModel,
    //             where: { status: "aktif" }
    //         }],
    //         where: {
    //             code_mata_kuliah: codeMakul,
    //             code_kelas: codeKls,
    //             status: "aktif"
    //         },
    //         order: [
    //             ["id_kelas", "DESC"]
    //         ]
    //     }).
    //         then(result => {
    //             res.status(200).json({
    //                 message: "Get All mahasiswa by kelas Success",
    //                 data: result,
    //             })
    //         }).
    //         catch(err => {
    //             next(err)
    //         })
    // },
}