const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const fakultasModel = require("../models/fakultasModel.js")
const prodiModel = require('../models/prodiModel.js')
const dosenModel = require('../models/dosenModel.js')
const pembimbingAkademik = require('../models/pembimbingAkademikModel.js')
const detailPembimbingAkademik = require('../models/detailPembimbingAkademikModel.js')
const mahasiswaModel = require('../models/mahasiswaModel.js')
const { Op, Sequelize, col, fn, where } = require('sequelize')
const historyMahasiswa = require('../models/historyMahasiswaModel.js')



module.exports = {
    //  user dosen
    mahasiswaByDosenPembimbing: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = req.query.perPage || 10
        const { codeJnjPen, codeFks, codePrd, nipy, thnAngkatan } = req.params
        const dosenUse = await dosenModel.findOne({
            where: {
                nip_ynaa: nipy,
                status: "aktif"
            }
        })
        if (!dosenUse) return res.status(404).json({ message: "Data Tidak Ditemukan" })
        const dataPembimbing = await pembimbingAkademik.findOne({
            include: [{
                attributes: ["id_dosen", "nip_ynaa", "nama"],
                model: dosenModel,
                where: {
                    status: "aktif"
                },
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
                code_jenjang_pendidikan: codeJnjPen,
                code_fakultas: codeFks,
                code_prodi: codePrd,
                dosen: nipy,
                status: "aktif"
            }
        })
        if (!dataPembimbing) return res.status(404).json({ message: "Data Tidak Ditemukan" })
        await detailPembimbingAkademik.findAndCountAll({
            include: [
                {
                    attributes: ["id_mahasiswa", "nim", "nama", "tanggal_masuk_kuliah"],
                    model: mahasiswaModel,
                    where: {
                        tanggal_masuk_kuliah: Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('tanggal_masuk_kuliah')), thnAngkatan),
                        status: "aktif"
                    }
                }, {
                    attributes: ['code_tahun_ajaran', 'code_semester', 'status'],
                    model: historyMahasiswa,
                    order: [['id_history', 'DESC']],
                    limit: 1
                }
            ],
            offset: (currentPage - 1) * parseInt(perPage),
            limit: parseInt(perPage),
            where: {
                code_pembimbing_akademik: dataPembimbing.code_pembimbing_akademik,
                status: "aktif"
            },
            order: [['nim', 'ASC']]
        }).then(result => {
            res.status(201).json({
                message: "Data ditemukan",
                identitas: {
                    nip_ynaa: dataPembimbing.dosens[0].nip_ynaa,
                    nama: dataPembimbing.dosens[0].nama,
                    kouta_bimbingan: dataPembimbing.kouta_bimbingan,
                    jenjang_pendidikan: dataPembimbing.jenjangPendidikans[0].nama_jenjang_pendidikan,
                    fakultas: dataPembimbing.fakultas[0].nama_fakultas,
                    prodi: dataPembimbing.prodis[0].nama_prodi
                },
                data: result.rows,
                total_data: result.count,
                per_page: perPage,
                current_page: currentPage,
            })
        }).catch(err => {
            next(err)
        })
    },

    verifikasiDosenPembimbing: async (req, res, next) => {
        const nipy = req.params.nipy
        const dosenUse = await dosenModel.findOne({
            where: {
                nip_ynaa: nipy,
                status: "aktif"
            }
        })
        if (!dosenUse) return res.status(404).json({ message: "Data Tidak Ditemukan" })
        await pembimbingAkademik.findOne({
            where: {
                dosen: nipy,
                status: "aktif"
            }
        }).then(result => {
            res.status(201).json({
                message: "Data ditemukan",
                data: result
            })
        }).catch(err => {
            next(err)
        })
    }
}