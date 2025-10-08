const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const fakultasModel = require('../models/fakultasModel.js')
const prodi = require('../models/prodiModel.js')
const tahunAjaranModel = require('../models/tahunAjaranModel.js')
const semesterModel = require('../models/semesterModel.js')
const jadwalKuliahModel = require('../models/jadwalKuliahModel.js')
const jadwalPertemuanModel = require('../models/jadwalPertemuanModel.js')
const dosenModel = require('../models/dosenModel.js')
const presensiDosenModel = require('../models/presensiDosenModel.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const sebaranMataKuliah = require('../models/sebaranMataKuliah.js')
const { Op, Sequelize, fn, col } = require('sequelize')

module.exports = {
    rekapPresensiPersmt: async (req, res, next) => {
        const { thn, smt, jnj, fks, prd } = req.params
        await presensiDosenModel.findAll({
            include: [
                {
                    attributes: ['nama'],
                    model: dosenModel,
                }
            ],
            attributes: ["masuk_luring", "masuk_daring", "izin", "nip_ynaa",
                [Sequelize.fn('sum', Sequelize.col('masuk_luring')), 'total_masuk_luring'],
                [Sequelize.fn('sum', Sequelize.col('masuk_daring')), 'total_masuk_daring'],
                [Sequelize.fn('sum', Sequelize.col('izin')), 'total_izin'],
            ],
            where: {
                code_tahun_ajaran: thn,
                code_semester: smt,
                code_jenjang_pendidikan: jnj,
                code_fakultas: fks,
                code_prodi: prd,
                status: "aktif"
            },
            group: ["nip_ynaa"]
        }).then(all => {
            res.status(201).json({
                message: "Data presensi berhasil diupdate",
                data: all
            })
        }).catch(err => {
            next(err)
        })
    },

    detailRekapPresensiPersmt: async (req, res, next) => {
        const { nipy, thn, smt, jnj, fks, prd } = req.params
        await presensiDosenModel.findAll({
            attributes: ["masuk_luring", "masuk_daring", "izin", "nip_ynaa",
                [Sequelize.fn('sum', Sequelize.col('masuk_luring')), 'total_masuk_luring'],
                [Sequelize.fn('sum', Sequelize.col('masuk_daring')), 'total_masuk_daring'],
                [Sequelize.fn('sum', Sequelize.col('izin')), 'total_izin'],
            ],
            where: {
                code_tahun_ajaran: thn,
                code_semester: smt,
                code_jenjang_pendidikan: jnj,
                code_fakultas: fks,
                code_prodi: prd,
                nip_ynaa: nipy,
                status: "aktif"
            }
        }).
            then(result => {
                totalItem = result
                return presensiDosenModel.findAll({
                    include: [
                        {
                            attributes: ["pertemuan"],
                            model: jadwalPertemuanModel
                        }, {
                            attributes: ["nama"],
                            model: dosenModel
                        }
                    ],
                    where: {
                        code_tahun_ajaran: thn,
                        code_semester: smt,
                        code_jenjang_pendidikan: jnj,
                        code_fakultas: fks,
                        code_prodi: prd,
                        nip_ynaa: nipy,
                        status: "aktif"
                    }
                })
            }).then(all => {
                res.status(201).json({
                    message: "Data presensi berhasil diupdate",
                    data: all,
                    datas: totalItem
                })
            }).catch(err => {
                next(err)
            })
    },

    rekapPresensiPerbln: async (req, res, next) => {
        const { bln, thn, smt, jnj, fks, prd } = req.params
        await presensiDosenModel.findAll({
            include: [
                {
                    attributes: ['nama'],
                    model: dosenModel,
                }
            ],
            attributes: ["masuk_luring", "masuk_daring", "izin", "nip_ynaa", "tanggal",
                [Sequelize.fn('sum', Sequelize.col('masuk_luring')), 'total_masuk_luring'],
                [Sequelize.fn('sum', Sequelize.col('masuk_daring')), 'total_masuk_daring'],
                [Sequelize.fn('sum', Sequelize.col('izin')), 'total_izin'],
            ],
            where: {
                [Op.and]: [
                    Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('tanggal')), bln),
                ],
                code_tahun_ajaran: thn,
                code_semester: smt,
                code_jenjang_pendidikan: jnj,
                code_fakultas: fks,
                code_prodi: prd,
                status: "aktif"
            },
            group: ["nip_ynaa"]
        }).then(all => {
            res.status(201).json({
                message: "Data presensi berhasil diupdate",
                data: all
            })
        }).catch(err => {
            next(err)
        })
    },

    detailRekapPresensiPerbln: async (req, res, next) => {
        const { nipy, bln, thn, smt, jnj, fks, prd } = req.params
        await presensiDosenModel.findAll({
            attributes: ["masuk_luring", "masuk_daring", "izin", "nip_ynaa", "tanggal",
                [Sequelize.fn('sum', Sequelize.col('masuk_luring')), 'total_masuk_luring'],
                [Sequelize.fn('sum', Sequelize.col('masuk_daring')), 'total_masuk_daring'],
                [Sequelize.fn('sum', Sequelize.col('izin')), 'total_izin'],
            ],
            where: {
                [Op.and]: [
                    Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('tanggal')), bln),
                ],
                code_tahun_ajaran: thn,
                code_semester: smt,
                code_jenjang_pendidikan: jnj,
                code_fakultas: fks,
                code_prodi: prd,
                nip_ynaa: nipy,
                status: "aktif"
            }
        }).
            then(result => {
                totalItem = result
                return presensiDosenModel.findAll({
                    include: [
                        {
                            attributes: ["pertemuan"],
                            model: jadwalPertemuanModel
                        }, {
                            attributes: ["nama"],
                            model: dosenModel
                        }
                    ],
                    where: {
                        [Op.and]: [
                            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('tanggal')), bln),
                        ],
                        code_tahun_ajaran: thn,
                        code_semester: smt,
                        code_jenjang_pendidikan: jnj,
                        code_fakultas: fks,
                        code_prodi: prd,
                        nip_ynaa: nipy,
                        status: "aktif"
                    }
                })
            }).then(all => {
                res.status(201).json({
                    message: "Data presensi berhasil diupdate",
                    data: all,
                    datas: totalItem
                })
            }).catch(err => {
                next(err)
            })
    },

    getbulan: async (req, res, next) => {
        const { thn, smt, jnj, fks, prd } = req.params
        await presensiDosenModel.findAll({
            attributes: [
                [Sequelize.literal('month(tanggal)'), 'bulan'],
            ],
            where: {
                code_tahun_ajaran: thn,
                code_semester: smt,
                code_jenjang_pendidikan: jnj,
                code_fakultas: fks,
                code_prodi: prd,
                status: "aktif"
            },
            group: [
                [Sequelize.literal('month(tanggal)'), 'bulan']
            ]
        }).then(result => {
            res.status(201).json({
                message: "Data bulan success",
                data: result
            })
        }).catch(err => {
            console.log(err)
        })
    }
}