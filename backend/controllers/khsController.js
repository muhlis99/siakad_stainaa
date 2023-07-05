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
const { Sequelize, Op, literal, QueryTypes } = require('sequelize')
const db = require('../config/database.js')

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

        const totalSks = await nilaiKuliahModel.sum('mataKuliahs.sks', {
            include: [
                {
                    attributes: ["id_mata_kuliah", "code_mata_kuliah", "nama_mata_kuliah", "sks"],
                    model: mataKuliahModel,
                    where: { status: "aktif" }
                }
            ],
            where: {
                nim: nim,
                status: "aktif"
            }
        })

        const queryTotalSksIndex = await db.query('SELECT SUM( tb_mata_kuliah.sks*tb_kategori_nilai.interfal_skor) AS total FROM `tb_nilai_kuliah` INNER JOIN tb_mata_kuliah ON tb_nilai_kuliah.code_mata_kuliah=tb_mata_kuliah.code_mata_kuliah INNER JOIN tb_kategori_nilai ON tb_nilai_kuliah.code_kategori_nilai=tb_kategori_nilai.code_kategori_nilai', {
            nest: true,
            type: QueryTypes.SELECT
        })
        const totalSksIndex = queryTotalSksIndex[0].total
        const ipSemester = totalSksIndex / totalSks

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
            attributes: [
                'id_nilai_kuliah', 'code_nilai_kuliah', 'code_kelas', 'code_mata_kuliah', 'code_kategori_nilai', 'nim', 'nilai_akhir', 'nilai_jumlah',
                [Sequelize.literal('(mataKuliahs.sks*kategoriNilais.interfal_skor)'), 'sksIndexs']
            ],
            where: {
                nim: nim,
                status: 'aktif'
            },
        }).then(result => {
            res.status(201).json({
                data: result,
                nim: mhs.nim,
                mahasiswa: mhs.nama,
                prodi: prd.nama_prodi,
                fakultas: fks.nama_fakultas,
                jenjangPendidikan: jenjPen.nama_jenjang_pendidikan,
                semester: smt.semester,
                tahunAjaran: thnAjr.tahun_ajaran,
                jumlahSks: totalSks,
                jumlahSksIndex: totalSksIndex,
                // IPS: ipSemester.toFixed(2)
                IPS: ipSemester

            })
        }).catch(err => {
            res.json(err)
        })
    },


}