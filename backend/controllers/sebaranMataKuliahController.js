const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const fakultasModel = require('../models/fakultasModel.js')
const prodiModel = require('../models/prodiModel.js')
const tahunAjaranModel = require('../models/tahunAjaranModel.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const kategoriNilaiModel = require('../models/kategoriNilaiModel.js')
const semesterModel = require('../models/semesterModel.js')
const { Op, Sequelize } = require('sequelize')

module.exports = {
    getAll: async (req, res, next) => {
        const sebaranJenPen = req.query.sebaranJenPen || null
        const sebaranFks = req.query.sebaranFks || null
        const sebaranProdi = req.query.sebaranProdi || null
        const sebaranSemester = req.query.sebaranSemester || 0
        const sebaranTahunAjaran = req.query.sebaranTahunAjaran || 0
        const totalSKS = await mataKuliahModel.sum('sks', {
            where: {
                code_jenjang_pendidikan: sebaranJenPen,
                code_fakultas: sebaranFks,
                code_prodi: sebaranProdi,
                code_semester: sebaranSemester,
                code_tahun_ajaran: sebaranTahunAjaran,
                status: "aktif"
            }
        })
        await mataKuliahModel.findAll({
            attributes: ['id_mata_kuliah', 'code_mata_kuliah', 'nama_mata_kuliah', 'sks', 'status'],
            include: [
                {
                    attributes: ['code_jenjang_pendidikan', 'nama_jenjang_pendidikan'],
                    model: jenjangPendidikanModel,
                    where: { status: "aktif" }
                },
                {
                    attributes: ['code_fakultas', 'nama_fakultas'],
                    model: fakultasModel,
                    where: { status: "aktif" }
                },
                {
                    attributes: ['code_prodi', 'nama_prodi'],
                    model: prodiModel,
                    where: { status: "aktif" }
                },
                {
                    attributes: ['code_tahun_ajaran', 'tahun_ajaran'],
                    model: tahunAjaranModel,
                    where: { status: "aktif" }
                },
                {
                    attributes: ['code_kategori_nilai', 'kategori'],
                    model: kategoriNilaiModel,
                    where: { status: "aktif" }
                },
                {
                    attributes: ['code_semester', 'semester'],
                    model: semesterModel,
                    where: { status: "aktif" }
                }
            ],
            where: {
                code_jenjang_pendidikan: sebaranJenPen,
                code_fakultas: sebaranFks,
                code_prodi: sebaranProdi,
                code_semester: sebaranSemester,
                code_tahun_ajaran: sebaranTahunAjaran,
                status: "aktif"
            },
            order: [
                ["id_mata_kuliah", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All Mata Kuliah Success",
                    data: result,
                    total_sks: totalSKS
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getById: async (req, res, next) => {
        const id = req.params.id
        await mataKuliahModel.findOne({
            include: [
                {
                    model: jenjangPendidikanModel,
                    where: { status: "aktif" }
                },
                {
                    model: fakultasModel,
                    where: { status: "aktif" }
                },
                {
                    model: prodiModel,
                    where: { status: "aktif" }
                },
                {
                    model: tahunAjaranModel,
                    where: { status: "aktif" }
                },
                {
                    model: kategoriNilaiModel,
                    where: { status: "aktif" }
                },
                {
                    model: semesterModel,
                    where: { status: "aktif" }
                }
            ],
            where: {
                id_mata_kuliah: id,
                status: "aktif"
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data mata kuliah Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data mata kuliah Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    autocompleteMakul: async (req, res, next) => {
        const { codeThnAjr, codeJnjPen, codeFks, codePrd } = req.params
        const search = req.query.search || ""

        await mataKuliahModel.findAll({
            where: {
                code_tahun_ajaran: codeThnAjr,
                code_jenjang_pendidikan: codeJnjPen,
                code_fakultas: codeFks,
                code_prodi: codePrd,
                status_bobot_makul: "",
                status_makul: "",
                status: "aktif"
            }
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Get mata kuliah  Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(200).json({
                    message: "Get mata kuliah Success",
                    data: result,
                })
            }).
            catch(err => {
                next(err)
            })
    },

    smtByThnAjr: async (req, res, next) => {
        const thnAjr = req.params.thnAjr
        await semesterModel.findAll({
            include: [
                {
                    model: tahunAjaranModel,
                    where: { status: "aktif" }
                }
            ],
            where: {
                code_tahun_ajaran: thnAjr,
                status: "aktif"
            },
            order: [
                ["id_semester", "DESC"]
            ]
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data semester Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data semester Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    katNilaiByThnAjr: async (req, res, next) => {
        const thnAjr = req.params.thnAjr
        await kategoriNilaiModel.findAll({
            include: [
                {
                    model: tahunAjaranModel,
                    where: { status: "aktif" }
                }
            ],
            where: {
                code_tahun_ajaran: thnAjr,
                status: "aktif"
            },
            order: [
                ["id_kategori_nilai", "DESC"]
            ]
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data kategori nilai Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data kategori nilai Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    post: async (req, res, next) => {
        const { id_mata_kuliah, code_semester, code_kategori_nilai, status_makul, status_bobot_makul } = req.body
        await mataKuliahModel.update({
            code_semester: code_semester,
            code_kategori_nilai: code_kategori_nilai,
            status_makul: status_makul,
            status_bobot_makul: status_bobot_makul,
        }, {
            where: {
                id_mata_kuliah: id_mata_kuliah
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data mata kuliah success Ditambahkan",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    put: async (req, res, next) => {
        const id = req.params.id
        const { code_semester, code_kategori_nilai, status_makul, status_bobot_makul } = req.body
        await mataKuliahModel.update({
            code_semester: code_semester,
            code_kategori_nilai: code_kategori_nilai,
            status_makul: status_makul,
            status_bobot_makul: status_bobot_makul,
        }, {
            where: {
                id_mata_kuliah: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data mata kuliah success Diupdate",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    delete: async (req, res, next) => {
        const id = req.params.id
        const mataKuliahUse = await mataKuliahModel.findOne({
            where: {
                id_mata_kuliah: id,
                status: "aktif"
            }
        })
        if (!mataKuliahUse) return res.status(401).json({ message: "Data sebaran mata kuliah tidak ditemukan" })
        await mataKuliahModel.update({
            code_semester: "",
            code_kategori_nilai: "",
            status_makul: "",
            status_bobot_makul: "",
            status: "tidak"
        }, {
            where: {
                id_mata_kuliah: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "data mata kuliah succes dihapus"
                })
            }).
            catch(err => {
                next(err)
            })
    }

}