const kelasModel = require('../models/kelasKuliahModel.js')
const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const fakultasModel = require('../models/fakultasModel.js')
const prodiModel = require('../models/prodiModel.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const historyMahasiswaModel = require('../models/historyMahasiswaModel.js')
const semesterModel = require('../models/semesterModel.js')
const krsModel = require('../models/krsModel.js')
const { Op } = require('sequelize')

module.exports = {
    getAll: async (req, res, next) => {
        const { codeSmt, codeFks, codePrd, codeThnAjr } = req.params
        await mataKuliahModel.findAll({
            include: [{
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
                code_semester: codeSmt,
                status: "aktif"
            },
            offset: offset,
            limit: perPage,
            order: [
                ["id_kelas", "DESC"]
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


    //  jumlah mhs semester
    jumlahMhs: async (req, res, next) => {
        const { smt, jnjPen, fkts, prd } = req.params
        await historyMahasiswaModel.findAndCountAll(
            {
                where: {
                    code_jenjang_pendidikan: jnjPen,
                    code_fakultas: fkts,
                    code_prodi: prd,
                    code_semester: smt,
                    status: "aktif"
                }
            }
        ).then(all => {
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
            where: {
                code_semester: code_semester,
                code_fakultas: code_fakultas,
                code_prodi: code_prodi,
                status: "aktif"
            }
        })
        if (dataDuplicate) return res.status(401).json({ message: "Data kelas kuliah sudah ada" })

        const makul = await mataKuliahModel.findAll({
            attributes: ['code_mata_kuliah'],
            where: {
                code_semester: code_semester,
                status_makul: "paket"
            }
        })

        let nmKelas = ["", "A", "B"]
        const createData = makul.map(M => {
            const Mkul = M.code_mata_kuliah
            nama_kelas.map(nmkls => {
                let currentPage = parseInt(nmkls) // nama kelas 
                let perPage = parseInt(kapasitas) // kapasitas
                let offset = (currentPage - 1) * perPage
                codeNim = krsModel.findAll({
                    include: [{
                        model: mataKuliahModel,
                        where: {
                            code_semester: code_semester,
                            status_makul: "paket"
                        }
                    }],
                    where: {
                        status: "aktif"
                    },
                    offset: offset,
                    limit: perPage,
                    group: ['nim']
                }).then(al => {
                    return Promise.all(al.map(p => {
                        let data = {
                            code_kelas: nmKelas[nmkls],
                            nama_kelas: nmKelas[nmkls],
                            nim: p.nim,
                            kapasitas: kapasitas,
                            code_jenjang_pendidikan: code_jenjang_pendidikan,
                            code_fakultas: code_fakultas,
                            code_prodi: code_prodi,
                            code_mata_kuliah: Mkul,
                            code_semester: code_semester,
                            status: "aktif"
                        }
                        kelasModel.bulkCreate([data])
                    }))
                })
            })
        })
        if (createData) {
            res.status(201).json({
                message: "Data kelas kuliah success Ditambahkan",
            })
        }
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