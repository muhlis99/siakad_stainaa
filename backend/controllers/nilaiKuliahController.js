const { Op, QueryTypes } = require('sequelize')
const kelasModel = require('../models/kelasKuliahModel.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const mahasiswaModel = require('../models/mahasiswaModel.js')
const kategoriNilaiModel = require('../models/kategoriNilaiModel.js')
const nilaiKuliahModel = require('../models/nilaiKuliahModel.js')
const kelasDetailKuliahModel = require('../models/kelasDetailKuliahModel.js')
const sequelize = require('../config/database.js')

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
        const nilai = Math.floor(nilaiAkhir)
        const i = await sequelize.query(`SELECT * FROM tb_kategori_nilai WHERE IF(${nilai} >= nilai_bawah AND ${nilai} <= nilai_atas, 1,0) AND code_tahun_ajaran = ${codeThnAjr} AND status = "aktif";`
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
                code_kategori_nilai: el.code_kategori_nilai,
                code_mata_kuliah: el.code_mata_kuliah,
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
    }
}