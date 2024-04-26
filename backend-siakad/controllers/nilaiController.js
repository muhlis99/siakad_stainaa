const sebaranMakulModel = require('../models/sebaranMataKuliah.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const nilaiKuliahModel = require('../models/nilaiKuliahModel.js')
const { Op } = require('sequelize')

module.exports = {
    sebaranMakulToNilai: async (req, res, next) => {
        const {thn,smt,jnj,fks,prd} = req.params
        await sebaranMakulModel.findAll({
            include : [{
                attributes : ["code_mata_kuliah","nama_mata_kuliah","jenis_mata_kuliah"],
                model : mataKuliahModel,
                where : {
                    code_jenjang_pendidikan : jnj,
                    code_fakultas : fks,
                    code_prodi : prd,
                    status : "aktif"
                }
            }],
            where : {
                code_tahun_ajaran : thn,
                code_semester : smt,
                status : "aktif"
            }
        }).then(result => {
            res.status(201).json({
                message: "Data Ruang Ditemukan",
                data: result
            })
        }).
        catch(err => {
            console.log(err)
        })
    },

    nilaiAllMhsPermakul: async (req, res, next) => {
        const {thn,smt,jnj,fks,prd,makul} = req.params
        await ruangModel.findOne({
            where: {
                id_ruang: id,
                status: "aktif"
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data Ruang Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data Ruang Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    }
}