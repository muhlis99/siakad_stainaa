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
        const { codeMakul, codeKls, codeThnAjr } = req.query
        await nilaiKuliahModel.findAll({
            include: [
                {
                    model: kategoriNilaiModel,
                    where: {
                        code_tahun_ajaran: codeThnAjr,
                        status: "aktif"
                    }
                },
                {
                    attributes: ['nim', 'nama'],
                    model: mahasiswaModel,
                    where: { status: "aktif" }
                }
            ],
            where: {
                code_mata_kuliah: codeMakul,
                code_kelas: codeKls,
                status: "aktif"
            },
            order: [
                ["nim", "ASC"]
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

    getById: async (req, res, next) => {
        const id = req.params.id
        const codeThnAjr = req.params.codeThnAjr
        await nilaiKuliahModel.findOne({
            include: [
                {
                    model: kategoriNilaiModel,
                    where: {
                        code_tahun_ajaran: codeThnAjr,
                        status: "aktif"
                    }
                },
                {
                    attributes: ['nim', 'nama'],
                    model: mahasiswaModel,
                    where: { status: "aktif" }
                }
            ],
            where: {
                id_nilai_kuliah: id,
            }
        }).
            then(result => {
                res.status(200).json({
                    message: "Get by id nilai kuliah Success",
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
        const dataNilai = data.map(el => {
            let randomNumber = randomAngka(5) + Math.floor(100000000000 + Math.random() * 900000000000)
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
                nilai_presentasi: el.nilai_presentasi,
                nilai_penguasaan_materi: el.nilai_penguasaan_materi,
                nilai_slide_power_point: el.nilai_slide_power_point,
                nilai_keaktifan: el.nilai_keaktifan,
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
        const id = req.params.id
        const { code_kategori_nilai, nilai_presentasi, nilai_penguasaan_materi,
            nilai_slide_power_point, nilai_keaktifan, nilai_hadir, nilai_tugas,
            nilai_uts, nilai_uas, nilai_jumlah, nilai_akhir } = req.body

        const nilaiUse = await nilaiKuliahModel.findOne({
            where: {
                id_nilai_kuliah: id,
                status: "aktif"
            }
        })
        if (!nilaiUse) return res.status(404).json({ message: "Data nilai Tidak Ditemukan" })

        await nilaiKuliahModel.update({
            code_kategori_nilai: code_kategori_nilai,
            nilai_presentasi: nilai_presentasi,
            nilai_penguasaan_materi: nilai_penguasaan_materi,
            nilai_slide_power_point: nilai_slide_power_point,
            nilai_keaktifan: nilai_keaktifan,
            nilai_hadir: nilai_hadir,
            nilai_tugas: nilai_tugas,
            nilai_uts: nilai_uts,
            nilai_uas: nilai_uas,
            nilai_jumlah: nilai_jumlah,
            nilai_akhir: nilai_akhir
        }, {
            where: {
                id_nilai_kuliah: id
            }
        }).then(result => {
            res.status(200).json({
                message: "Data nilai kuliah success diupdate",
            })
        }).
            catch(err => {
                next(err)
            })
    }

}