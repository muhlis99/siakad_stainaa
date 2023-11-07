const { Op, QueryTypes } = require('sequelize')
const sequelize = require('../config/database.js')
const kelasModel = require('../models/kelasKuliahModel.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const mahasiswaModel = require('../models/mahasiswaModel.js')
const kategoriNilaiModel = require('../models/kategoriNilaiModel.js')
const nilaiKuliahModel = require('../models/nilaiKuliahModel.js')
const kelasDetailKuliahModel = require('../models/kelasDetailKuliahModel.js')
const tahunAjaranModel = require('../models/tahunAjaranModel.js')
const semesterModel = require('../models/semesterModel.js')
const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const fakultasModel = require('../models/fakultasModel.js')
const prodiModel = require('../models/prodiModel.js')


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
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: semesterModel,
                where: { status: "aktif" }
            }, {
                model: jenjangPendidikanModel,
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }],
            where: {
                code_mata_kuliah: codeMakul,
                code_kelas: codeKls,
                status: "aktif"
            },
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

    getMhsByKelas: async (req, res, next) => {
        const { codeKls } = req.params
        await kelasDetailKuliahModel.findAll({
            include: [{
                model: kelasModel,
                where: { status: "aktif" }
            }],
            where: {
                code_kelas: codeKls,
                status: "aktif"
            }
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All mahasiswa by kelas Success",
                    data: result,
                })
            }).
            catch(err => {
                next(err)
            })
    },

    deteksiIndexNilai: async (req, res, next) => {
        const { nilaiAkhir, codeThnAjr } = req.params
        console.log(codeThnAjr);
        const nilai = Math.floor(nilaiAkhir)
        const i = await sequelize.query(`SELECT * FROM tb_kategori_nilai WHERE IF(${nilai} >= nilai_bawah AND ${nilai} <= nilai_atas, 1,0) AND code_tahun_ajaran = "${codeThnAjr} "AND status = "aktif";`
            , {
                nest: true,
                type: QueryTypes.SELECT
            })
        res.json({
            data: i
        })
    },

    post: async (req, res, next) => {
        const data = req.body
        function randomAngka(params) {
            let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let charLength = chars.length;
            let result = ''
            for (let i = 0; i < params; i++) {
                result += chars.charAt(Math.floor(Math.random() * charLength))
            }
            return result
        }
        let randomNumber = randomAngka(2) + Math.floor(1000 + Math.random() * 9000)
        const dataNilai = data.map(el => {
            let element = {
                code_nilai_kuliah: randomNumber,
                code_kelas: el.code_kelas,
                code_mata_kuliah: el.code_mata_kuliah,
                code_kategori_nilai: el.code_kategori_nilai,
                code_tahun_ajaran: el.code_tahun_ajaran,
                code_semester: el.code_semester,
                code_jenjang_pendidikan: el.code_jenjang_pendidikan,
                code_fakultas: el.code_fakultas,
                code_prodi: el.code_prodi,
                nim: el.nim,
                nilai_hadir: el.nilai_hadir,
                nilai_tugas: el.nilai_tugas,
                nilai_uts: el.nilai_uts,
                nilai_uas: el.nilai_uas,
                nilai_jumlah: el.nilai_jumlah,
                nilai_akhir: el.nilai_akhir,
                status: "aktif"
            }
            return element
        })

        await nilaiKuliahModel.bulkCreate(dataNilai).
            then(result => {
                res.status(200).json({
                    message: "Data nilai kuliah success ditambahkan",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    put: async (req, res, next) => {
        const data = req.body

        const dataNilai = data.map(el => {
            let element = {
                id_nilai_kuliah: el.id_nilai_kuliah,
                code_kategori_nilai: el.code_kategori_nilai,
                nilai_hadir: el.nilai_hadir,
                nilai_tugas: el.nilai_tugas,
                nilai_uts: el.nilai_uts,
                nilai_uas: el.nilai_uas,
                nilai_jumlah: el.nilai_jumlah,
                nilai_akhir: el.nilai_akhir,
                status: "aktif"
            }
            return element
        })
        await nilaiKuliahModel.bulkCreate(dataNilai, {
            updateOnDuplicate: ["code_kategori_nilai", "nilai_hadir", "nilai_tugas", "nilai_uts", "nilai_uas", "nilai_jumlah", "nilai_akhir"],
        }).
            then(result => {
                res.status(200).json({
                    message: "Data nilai kuliah success diupdate",
                })
            }).
            catch(err => {
                next(err)
            })
    }

    // user dosen

}