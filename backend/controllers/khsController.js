const krsModel = require('../models/krsModel.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const tahunAjaranModel = require('../models/tahunAjaranModel.js')
const semesterModel = require('../models/semesterModel.js')
const historyMahasiswa = require('../models/historyMahasiswaModel.js')
const mahasiswaModel = require('../models/mahasiswaModel.js')
const nilaiKuliahModel = require('../models/nilaiKuliahModel.js')
const kategoriNilaiModel = require('../models/kategoriNilaiModel.js')
const prodiModel = require('../models/prodiModel.js')
const fakultasModel = require('../models/fakultasModel.js')
const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const { Op } = require('sequelize')

module.exports = {
    getAll: async (req, res, next) => {
        const { codeThnAjr, codeSmt, codeJnjPen, codeFks, codePrd } = req.params
        await historyMahasiswa.findAll({
            include: [{
                model: mahasiswaModel,
                attributes: ["nim", "nama"],
                where: { status: "aktif" }
            }],
            where: {
                code_tahun_ajaran: codeThnAjr,
                code_semester: codeSmt,
                code_jenjang_pendidikan: codeJnjPen,
                code_fakultas: codeFks,
                code_prodi: codePrd,
                status: "aktif"
            }
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All  Mahasiswa semester Success",
                    data: result,
                })
            }).
            catch(err => {
                next(err)
            })

    },

    viewKhs: async (req, res, next) => {
        const { nim, codeThnAjr, codeSmt, codeJnjPen, codeFks, codePrd } = req.params

        const mhs = await mahasiswaModel.findOne({
            where: {
                nim: nim,
                status: "aktif"
            }
        })
        const prd = await prodiModel.findOne({
            where: {
                code_prodi: codePrd,
                code_jenjang_pendidikan: codeJnjPen,
                code_fakultas: codeFks,
                status: "aktif"
            }
        })
        const fks = await fakultasModel.findOne({
            where: {
                code_fakultas: codeFks,
                code_jenjang_pendidikan: codeJnjPen,
                status: "aktif"
            }
        })
        const jenjPen = await jenjangPendidikanModel.findOne({
            where: {
                code_jenjang_pendidikan: codeJnjPen,
                status: "aktif"
            }
        })
        const smt = await semesterModel.findOne({
            where: {
                code_tahun_ajaran: codeThnAjr,
                code_semester: codeSmt,
                status: "aktif"
            }
        })
        const thnAjr = await tahunAjaranModel.findOne({
            where: {
                code_tahun_ajaran: codeThnAjr,
                status: "aktif"
            }
        })

        await nilaiKuliahModel.findAll({
            include: [
                {
                    attributes: ["id_mata_kuliah", "code_mata_kuliah", "nama_mata_kuliah", "sks"],
                    model: mataKuliahModel,
                    where: { status: "aktif" }
                },
                {
                    attributes: ["id_kategori_nilai", "nilai_huruf", "interfal_skor"],
                    model: kategoriNilaiModel,
                    where: { status: "aktif" }
                }
            ],
            where: {
                nim: nim,
                status: 'aktif'
            }
        }).then(result => {
            res.status(201).json({
                data: result,
                nim: mhs.nim,
                mahasiswa: mhs.nama,
                prodi: prd.nama_prodi,
                fakultas: fks.nama_fakultas,
                jenjangPendidikan: jenjPen.nama_jenjang_pendidikan,
                semester: smt.semester,
                tahunAjaran: thnAjr.tahun_ajaran


            })
        }).catch(err => {
            res.json(err)
        })
    },


}