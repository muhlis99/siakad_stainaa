const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const fakultasModel = require('../models/fakultasModel.js')
const prodiModel = require('../models/prodiModel.js')
const tahunAjaranModel = require('../models/tahunAjaranModel.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const kategoriNilaiModel = require('../models/kategoriNilaiModel.js')
const semesterModel = require('../models/semesterModel.js')
const krsModel = require('../models/krsModel.js')
const sebaranMataKuliah = require('../models/sebaranMataKuliah.js')

const { Op, Sequelize } = require('sequelize')

module.exports = {
    getAll: async (req, res, next) => {
        const sebaranJenPen = req.query.sebaranJenPen || null
        const sebaranFks = req.query.sebaranFks || null
        const sebaranProdi = req.query.sebaranProdi || null
        const sebaranSemester = req.query.sebaranSemester || 0
        const sebaranTahunAjaran = req.query.sebaranTahunAjaran || 0
        const totalSKS = await sebaranMataKuliah.sum('mataKuliahs.sks', {
            include: [{
                model: mataKuliahModel,
                where: {
                    code_jenjang_pendidikan: sebaranJenPen,
                    code_fakultas: sebaranFks,
                    code_prodi: sebaranProdi,
                }
            }],
            where: {
                code_semester: sebaranSemester,
                code_tahun_ajaran: sebaranTahunAjaran,
                status: "aktif"
            }
        })
        await sebaranMataKuliah.findAll({
            include: [
                {
                    model: mataKuliahModel,
                    where: {
                        code_jenjang_pendidikan: sebaranJenPen,
                        code_fakultas: sebaranFks,
                        code_prodi: sebaranProdi,
                        status: "aktif"
                    }
                },
                {
                    attributes: ['code_tahun_ajaran', 'tahun_ajaran'],
                    model: tahunAjaranModel,
                    where: { status: "aktif" }
                },
                {
                    attributes: ['code_semester', 'semester'],
                    model: semesterModel,
                    where: { status: "aktif" }
                },
                {
                    attributes: ['code_kategori_nilai', 'kategori'],
                    model: kategoriNilaiModel,
                    where: { status: "aktif" }
                }
            ],
            where: {
                code_tahun_ajaran: sebaranTahunAjaran,
                code_semester: sebaranSemester,
                status: "aktif"
            },
            order: [
                ["id_sebaran", "DESC"]
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
        await sebaranMataKuliah.findOne({
            include: [
                {
                    model: mataKuliahModel,
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
                id_sebaran: id,
                status: "aktif"
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data sebaran mata kuliah Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data sebaran mata kuliah Ditemukan",
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
        const matkulSebaran = await sebaranMataKuliah.findAll({
            where: {
                code_tahun_ajaran: codeThnAjr,
                status: "aktif"
            }
        })
        const datas = matkulSebaran.map(el => { return el.code_mata_kuliah })
        await mataKuliahModel.findAll({
            where: {
                code_jenjang_pendidikan: codeJnjPen,
                code_fakultas: codeFks,
                code_prodi: codePrd,
                code_mata_kuliah: {
                    [Op.notIn]: datas
                },
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
        const { code_tahun_ajaran, code_semester, code_mata_kuliah,
            code_kategori_nilai, status_makul, status_bobot_makul } = req.body
        let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)
        await sebaranMataKuliah.create({
            code_sebaran: randomNumber + code_semester,
            code_mata_kuliah: code_mata_kuliah,
            code_tahun_ajaran: code_tahun_ajaran,
            code_semester: code_semester,
            code_kategori_nilai: code_kategori_nilai,
            status_makul: status_makul,
            status_bobot_makul: status_bobot_makul,
            status: "aktif"
        }).
            then(result => {
                res.status(201).json({
                    message: "Data sebaran  mata kuliah success Ditambahkan",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    salinData: async (req, res, next) => {
        const { code_tahun_ajaran_baru, code_semester_baru,
            code_tahun_ajaran_lama, code_semester_lama } = req.body
        const dataLawas = await sebaranMataKuliah.findAll({
            where: {
                code_tahun_ajaran: code_tahun_ajaran_lama,
                code_semester: code_semester_lama,
                status: "aktif"
            }
        })
        const datasLawas = dataLawas.map(async el => {
            let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)
            await sebaranMataKuliah.create({
                code_sebaran: randomNumber + code_semester_baru,
                code_mata_kuliah: el.code_mata_kuliah,
                code_kategori_nilai: el.code_kategori_nilai,
                code_tahun_ajaran: code_tahun_ajaran_baru,
                code_semester: code_semester_baru,
                status_makul: el.status_makul,
                status_bobot_makul: el.status_bobot_makul,
                status: el.status,
            })
        })
        if (datasLawas) {
            return res.status(201).json({ message: "Data seberan mata kuliah succes ditambahkan" })
        } else {
            return res.status(401).json({ message: "Data seberan mata kuliah succes ditambahkan" })
        }
    },

    put: async (req, res, next) => {
        const id = req.params.id
        const { code_semester, code_tahun_ajaran, code_kategori_nilai, status_makul, status_bobot_makul } = req.body
        await sebaranMataKuliah.update({
            code_semester: code_semester,
            code_tahun_ajaran: code_tahun_ajaran,
            code_kategori_nilai: code_kategori_nilai,
            status_makul: status_makul,
            status_bobot_makul: status_bobot_makul,
        }, {
            where: {
                id_sebaran: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data sebaran mata kuliah success Diupdate",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    delete: async (req, res, next) => {
        const id = req.params.id
        const mataKuliahUse = await sebaranMataKuliah.findOne({
            where: {
                id_sebaran: id,
                status: "aktif"
            }
        })
        if (!mataKuliahUse) return res.status(401).json({ message: "Data sebaran mata kuliah tidak ditemukan" })
        await sebaranMataKuliah.update({
            status: "tidak"
        }, {
            where: {
                id_sebaran: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "data sebaran mata kuliah succes dihapus"
                })
            }).
            catch(err => {
                next(err)
            })
    }

}