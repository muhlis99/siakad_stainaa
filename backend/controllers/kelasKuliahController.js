const kelasModel = require('../models/kelasKuliahModel.js')
const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const fakultasModel = require('../models/fakultasModel.js')
const prodiModel = require('../models/prodiModel.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const historyMahasiswaModel = require('../models/historyMahasiswaModel.js')
const semesterModel = require('../models/semesterModel.js')
const krsModel = require('../models/krsModel.js')
const { Op } = require('sequelize')
const kelasKuliahModel = require('../models/kelasKuliahModel.js')
const kelasDetailKuliahModel = require('../models/kelasDetailKuliahModel.js')
const tahunAjaranModel = require('../models/tahunAjaranModel.js')

module.exports = {
    getAllMatakuliah: async (req, res, next) => {
        const { codeThnAjr, codeSmt, jnjPen, codeFks, codePrd } = req.params
        await mataKuliahModel.findAll({
            attributes: ['id_mata_kuliah', 'code_mata_kuliah', 'nama_mata_kuliah', 'sks'],
            include: [{
                attributes: ['code_jenjang_pendidikan'],
                model: jenjangPendidikanModel,
                where: { status: "aktif" }
            }, {
                attributes: ['code_fakultas'],
                model: fakultasModel,
                where: { status: "aktif" }
            }, {
                attributes: ['code_prodi'],
                model: prodiModel,
                where: { status: "aktif" }
            }, {
                attributes: ['code_tahun_ajaran'],
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                attributes: ['code_semester'],
                model: semesterModel,
                where: { status: "aktif" }
            }],
            where: {
                code_tahun_ajaran: codeThnAjr,
                code_semester: codeSmt,
                code_jenjang_pendidikan: jnjPen,
                code_fakultas: codeFks,
                code_prodi: codePrd,
                status: "aktif"
            },
            order: [
                ["id_mata_kuliah", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All kelas Success",
                    data: result,
                })
            }).
            catch(err => {
                next(err)
            })

    },

    getKelasByMakul: async (req, res, next) => {
        const codeMakul = req.params.codeMakul
        await kelasModel.findAll({
            include: [{
                attributes: ['code_jenjang_pendidikan'],
                model: jenjangPendidikanModel,
                where: { status: "aktif" }
            }, {
                attributes: ['code_fakultas'],
                model: fakultasModel,
                where: { status: "aktif" }
            }, {
                attributes: ['code_prodi'],
                model: prodiModel,
                where: { status: "aktif" }
            }, {
                attributes: ['code_mata_kuliah'],
                model: mataKuliahModel,
                where: { status: "aktif" }
            }, {
                attributes: ['code_tahun_ajaran'],
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                attributes: ['code_semester'],
                model: semesterModel,
                where: { status: "aktif" }
            }],
            where: {
                code_mata_kuliah: codeMakul,
                status: "aktif"
            }
        }).
            then(getByMakul => {
                if (!getByMakul) {
                    return res.status(404).json({
                        message: "Data kelas kuliah Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data kelas kuliah Ditemukan",
                    data: getByMakul
                })
            }).
            catch(err => {
                console.log(err);
            })
    },

    getKelasById: async (req, res, next) => {
        const id = req.params.id
        await kelasKuliahModel.findOne({
            include: [{
                model: jenjangPendidikanModel,
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }, {
                model: mataKuliahModel,
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: semesterModel,
                where: { status: "aktif" }
            }],
            where: {
                id_kelas: id,
                status: "aktif"
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data kelas kuliah Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data kelas kuliah Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    jumlahMhs: async (req, res, next) => {
        const { thnAjr, smt, jnjPen, fkts, prd } = req.params
        await historyMahasiswaModel.findAndCountAll({
            include: [{
                model: jenjangPendidikanModel,
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: semesterModel,
                where: { status: "aktif" }
            }],
            where: {
                code_jenjang_pendidikan: jnjPen,
                code_fakultas: fkts,
                code_prodi: prd,
                code_semester: smt,
                code_tahun_ajaran: thnAjr,
                status: "aktif"
            }
        }).then(all => {
            res.status(201).json({
                message: "Data jumlah mahasiswa success Ditambahkan",
                data: all.count
            })
        }).catch(err => {
            next(err)
        })
    },

    post: async (req, res, next) => {
        const { code_jenjang_pendidikan, code_fakultas, code_tahun_ajaran,
            code_prodi, code_semester, nama_kelas, kapasitas } = req.body

        const dataDuplicate = await kelasModel.findOne({
            include: [{
                model: jenjangPendidikanModel,
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }, {
                model: mataKuliahModel,
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: semesterModel,
                where: { status: "aktif" }
            }],
            where: {
                code_tahun_ajaran: code_tahun_ajaran,
                code_semester: code_semester,
                code_jenjang_pendidikan: code_jenjang_pendidikan,
                code_fakultas: code_fakultas,
                code_prodi: code_prodi,
                status: "aktif"
            }
        })
        if (dataDuplicate) return res.status(401).json({ message: "Data kelas kuliah sudah ada" })

        const makul = await mataKuliahModel.findAll({
            include: [{
                attributes: ['code_jenjang_pendidikan'],
                model: jenjangPendidikanModel,
                where: { status: "aktif" }
            }, {
                attributes: ['code_fakultas'],
                model: fakultasModel,
                where: { status: "aktif" }
            }, {
                attributes: ['code_prodi'],
                model: prodiModel,
                where: { status: "aktif" }
            }, {
                attributes: ['code_tahun_ajaran'],
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                attributes: ['code_semester'],
                model: semesterModel,
                where: { status: "aktif" }
            }],
            attributes: ['code_mata_kuliah'],
            where: {
                code_tahun_ajaran: code_tahun_ajaran,
                code_semester: code_semester,
                code_jenjang_pendidikan: code_jenjang_pendidikan,
                code_fakultas: code_fakultas,
                code_prodi: code_prodi,
                status_makul: "paket",
                status_bobot_makul: "wajib"
            }
        })

        let nmKelas = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
        const dataCreateKelas = makul.map(al => {
            const codeMakul = al.code_mata_kuliah
            nama_kelas.map(el => {
                let randomNumber = Math.floor(100 + Math.random() * 900)
                let data = {
                    code_kelas: randomNumber + nmKelas[el],
                    nama_kelas: nmKelas[el],
                    kapasitas: kapasitas,
                    code_jenjang_pendidikan: code_jenjang_pendidikan,
                    code_fakultas: code_fakultas,
                    code_prodi: code_prodi,
                    code_mata_kuliah: codeMakul,
                    code_semester: code_semester,
                    code_tahun_ajaran: code_tahun_ajaran,
                    status: "aktif"
                }
                kelasModel.bulkCreate([data])
            })
        })

        if (dataCreateKelas) {
            console.log(dataCreateKelas);

        } else {

        }



        // const createData = makul.map(M => {
        //     const Mkul = M.code_mata_kuliah
        //     nama_kelas.map(nmkls => {
        //         let randomNumber = Math.floor(100 + Math.random() * 900)
        //         let currentPage = parseInt(nmkls) // nama kelas 
        //         let perPage = parseInt(kapasitas) // kapasitas
        //         let offset = (currentPage - 1) * perPage
        //         codeNim = krsModel.findAll({
        //             include: [{
        //                 model: mataKuliahModel,
        //                 where: {
        //                     code_semester: code_semester,
        //                     code_fakultas: code_fakultas,
        //                     code_prodi: code_prodi,
        //                     code_tahun_ajaran: code_tahun_ajaran,
        //                     status_makul: "paket"
        //                 }
        //             }],
        //             where: {
        //                 status: "aktif"
        //             },
        //             offset: offset,
        //             limit: perPage,
        //             group: ['nim']
        //         }).then(al => {
        //             return Promise.all(al.map(p => {
        //                 let data = {
        //                     code_kelas: randomNumber + nmKelas[nmkls],
        //                     nama_kelas: nmKelas[nmkls],
        //                     nim: p.nim,
        //                     kapasitas: kapasitas,
        //                     code_jenjang_pendidikan: code_jenjang_pendidikan,
        //                     code_fakultas: code_fakultas,
        //                     code_prodi: code_prodi,
        //                     code_mata_kuliah: Mkul,
        //                     code_semester: code_semester,
        //                     code_tahun_ajaran: code_tahun_ajaran,
        //                     status: "aktif"
        //                 }
        //                 kelasModel.bulkCreate([data])
        //             }))
        //         })
        //     })
        // })
        // if (createData) {
        //     res.status(201).json({
        //         message: "Data kelas kuliah success Ditambahkan",
        //     })
        // }
    },


    delete: async (req, res, next) => {
        const codeMakul = req.params.codeMakul
        const codeKelas = req.params.codeKelas
        const kelasModelUse = await kelasModel.findAll({
            include: [{
                model: jenjangPendidikanModel,
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }, {
                model: mataKuliahModel,
                where: { status: "aktif" }
            }, {
                model: semesterModel,
                where: { status: "aktif" }
            }],
            where: {
                code_mata_kuliah: codeMakul,
                code_kelas: codeKelas,
                status: "aktif"
            }
        })
        if (!kelasModelUse) return res.status(401).json({ message: "Data kelas kuliah tidak ditemukan" })
        const deleteData = kelasModelUse.map(all => {
            kelasModel.update({
                status: "tidak"
            }, {
                where: {
                    code_kelas: codeKelas,
                    code_mata_kuliah: codeMakul
                }
            })
        })
        if (deleteData) {
            res.status(201).json({
                message: "Data kelas kuliah success Dihapus",
            })
        }
    }
}