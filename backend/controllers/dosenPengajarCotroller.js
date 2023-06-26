const jadwalKuliahModel = require('../models/jadwalKuliahModel.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const prodiModel = require('../models/prodiModel.js')
const semesterModel = require('../models/semesterModel.js')
const tahunAjaranModel = require('../models/tahunAjaranModel.js')
const kelasModel = require('../models/kelasKuliahModel.js')
const fakultasModel = require("../models/fakultasModel.js")
const dosenModel = require('../models/dosenModel.js')
const { Op } = require('sequelize')


module.exports = {
    getAllDosen: async (req, res, next) => {
        await dosenModel.findAll({
            where: {
                status: "aktif"
            }
        }).then(all => {
            res.status(201).json({
                message: "Data dosen pengajar Ditemukan",
                data: all
            })
        }).catch(err => {
            next(err)
        })
    },

    getById: async (req, res, next) => {
        const id = req.params.id
        await jadwalKuliahModel.findOne({
            include: [{
                model: semesterModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }, {
                attributes: ['nama_kelas', 'code_kelas'],
                model: kelasModel,
                where: { status: "aktif" },
            }, {
                model: mataKuliahModel,
                where: { status: "aktif" }
            }, {
                model: dosenModel,
                where: { status: "aktif" }
            }],
            where: {
                id_jadwal_kuliah: id,
                status: "aktif"
            },
            group: ['kelas.code_kelas']
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data dosen pengajar Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data dosen pengajar Ditemukan",
                    data: result
                })
            }).
            catch(err => {
                next(err)
            })
    },

    post: async (req, res, next) => {
        const { dosen_pengajar, dosen_pengganti, id } = req.body
        await jadwalKuliahModel.update({
            dosen_pengajar: dosen_pengajar,
            dosen_pengganti: dosen_pengganti,
        }, {
            where: {
                id_jadwal_kuliah: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data dosen pengajar success Ditambahkan",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    put: async (req, res, next) => {
        const id = req.params.id
        const { dosen_pengajar, dosen_pengganti } = req.body
        await jadwalKuliahModel.update({
            dosen_pengajar: dosen_pengajar,
            dosen_pengganti: dosen_pengganti,
        }, {
            where: {
                id_jadwal_kuliah: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data dosen pengajar success Diupdate",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    deleteStatus: async (req, res, next) => {
        const id = req.params.id
        const jadwalKuliahModelUse = await jadwalKuliahModel.findOne({
            include: [{
                model: semesterModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }, {
                attributes: ['nama_kelas', 'code_kelas'],
                model: kelasModel,
                where: { status: "aktif" },
            }, {
                model: mataKuliahModel,
                where: { status: "aktif" }
            }],
            where: {
                id_jadwal_kuliah: id,
                status: "aktif"
            },
            group: ['kelas.code_kelas'],
        })
        if (!jadwalKuliahModelUse) return res.status(401).json({ message: "Data dosen pengajar tidak ditemukan" })
        await jadwalKuliahModel.update({
            dosen_pengajar: "",
            dosen_pengganti: ""
        }, {
            where: {
                id_jadwal_kuliah: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "data dosen pengajar succes dihapus"
                })
            }).
            catch(err => {
                next(err)
            })
    }
}