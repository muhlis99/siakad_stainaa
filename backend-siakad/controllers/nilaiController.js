const sebaranMakulModel = require('../models/sebaranMataKuliah.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const nilaiKuliahModel = require('../models/nilaiKuliahModel.js')
const mahasiswaModel = require('../models/mahasiswaModel.js')
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
                },
                order : {
                    nim : ASC
                }
            }],
            where : {
                code_tahun_ajaran : thn,
                code_semester : smt,
                status : "aktif"
            }
        }).then(result => {
            res.status(201).json({
                message: "Data sebaran mata kuliah",
                data: result
            })
        }).
        catch(err => {
            console.log(err)
        })
    },

    nilaiAllMhsPermakul: async (req, res, next) => {
        const {thn,smt,jnj,fks,prd,makul} = req.params
        await nilaiKuliahModel.findAll({
            include : [{
                attributes : ["nim","nama","tempat_lahir"],
                model : mahasiswaModel,
                where : {
                    status : "aktif"
                }
            }],
            attributes : ["id_nilai_kuliah","code_nilai_kuliah","nilai_akhir"],
            where: {
                code_mata_kuliah : makul,
                code_jenjang_pendidikan : jnj,
                code_fakultas : fks,
                code_prodi : prd,
                code_tahun_ajaran : thn,
                code_semester : smt,
            }
        }).then(result => {
            res.status(201).json({
                message: "Data nilai seluruh mahasiswa",
                data: result
            })
        }).
        catch(err => {
            console.log(err)
        })
    }
}