const mahasiswaModel = require('../models/mahasiswaModel.js')
const semesterModel = require('../models/semesterModel.js')
const tahunAjaranModel = require('../models/tahunAjaranModel.js')
const prodiModel = require('../models/prodiModel.js')
const fakultasModel = require('../models/fakultasModel.js')
const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const herRegistrasiModel = require('../models/herRegistrasiModel.js')
const { Sequelize, Op, literal, QueryTypes } = require('sequelize')
const db = require('../config/database.js')
const path = require('path')
const fs = require('fs')


module.exports = {
    get: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = (currentPage - 1) * perPage
        const totalPage = await herRegistrasiModel.count({
            include: [{
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
            }, {
                attributes: ['nim', "nama"],
                model: mahasiswaModel,
                where: { status: "aktif" }
            }],
            where: {
                [Op.or]: [
                    {
                        id_her_registrasi: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_her_registrasi: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nim: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        tanggal: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        keterangan: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        status: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: "aktif",
            }
        })
        const totalItems = Math.ceil(totalPage / perPage)
        await herRegistrasiModel.findAll({
            include: [{
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
            }, {
                attributes: ['nim', "nama"],
                model: mahasiswaModel,
                where: { status: "aktif" }
            }],
            where: {
                [Op.or]: [
                    {
                        id_her_registrasi: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_her_registrasi: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nim: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        tanggal: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        keterangan: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        status: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: "aktif",
            },
            offset: offset,
            limit: perPage,
            order: [
                ["id_her_registrasi", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All Her Registrasi Success",
                    data: result,
                    total_data: totalPage,
                    per_page: perPage,
                    current_page: currentPage,
                    total_page: totalItems
                })
            }).
            catch(err => {
                next(err)
            })
    },
    getById: async (req, res, next) => {
        const id = req.params.id
        await herRegistrasiModel.findOne({
            include: [{
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
            }, {
                attributes: ['nim', "nama"],
                model: mahasiswaModel,
                where: { status: "aktif" }
            }],
            where: {
                id_her_registrasi: id,
                status: "aktif"
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data Her Registrasi Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data Her Registrasi Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    post: async (req, res, next) => {
        const { code_tahun_ajaran, code_semester, code_jenjang_pendidikan, code_fakultas, code_prodi,
            nim } = req.body

        const code = Math.floor(10000 + Math.random() * 90000)
        const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')

        if (!req.files) return res.status(404).json({ message: "berkas Tidak boleh kosong" })

        const file = req.files.bukti_pembayaran
        const fileSize = file.data.length
        const ext = path.extname(file.name)
        const dataBerkas = "buktiPembayaran" + code + file.md5 + ext
        const allowedType = ['.jpg', '.jpeg', '.png']
        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "Bukti pembayaran yang anda upload tidak valid" })
        if (fileSize > 5000000) return res.status(422).json({ msg: "bukti pembayaran yang anda upload tidak boleh lebih dari 5 mb" })
        file.mv(`./tmp/mahasiswa/buktiPembayaran/${dataBerkas}`, (err) => {
            if (err) return res.status(500).json({ message: err.message })
        })

        try {
            await herRegistrasiModel.create({
                code_her_registrasi: code,
                code_jenjang_pendidikan: code_jenjang_pendidikan,
                code_fakultas: code_fakultas,
                code_prodi: code_prodi,
                code_tahun_ajaran: code_tahun_ajaran,
                code_semester: code_semester,
                nim: nim,
                berkas: dataBerkas,
                tanggal: date,
                keterangan: "",
                status: "aktif"
            })
                .then(result => {
                    res.status(200).json({
                        message: "data her regitarsi berhasil ditambahkan",
                    })
                })
        } catch (error) {
            console.log(error);
        }
    },

    put: async (req, res, next) => {
        const id = req.params.id
        const herRegistrasiUse = await herRegistrasiModel.findOne({
            include: [{
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
            }, {
                attributes: ['nim', "nama"],
                model: mahasiswaModel,
                where: { status: "aktif" }
            }],
            where: {
                id_her_registrasi: id,
                status: "aktif"
            }
        })
        if (!herRegistrasiUse) return res.status(404).json({ message: "data Tidak ditemukan " })
        const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')

        if (!req.files) return res.status(404).json({ message: "berkas Tidak boleh kosong" })
        fs.unlinkSync(`./tmp/mahasiswa/buktiPembayaran/${herRegistrasiUse.berkas}`)
        const code = Math.floor(10000 + Math.random() * 90000)
        const file = req.files.bukti_pembayaran
        const fileSize = file.data.length
        const ext = path.extname(file.name)
        const dataBerkas = "buktiPembayaran" + code + file.md5 + ext
        const allowedType = ['.jpg', '.jpeg', '.png']
        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "Bukti pembayaran yang anda upload tidak valid" })
        if (fileSize > 5000000) return res.status(422).json({ msg: "bukti pembayaran yang anda upload tidak boleh lebih dari 5 mb" })
        file.mv(`./tmp/mahasiswa/buktiPembayaran/${dataBerkas}`, (err) => {
            if (err) return res.status(500).json({ message: err.message })
        })


        try {
            await herRegistrasiModel.update({
                berkas: dataBerkas,
                tanggal: date,
            }, {
                where: {
                    id_her_registrasi: id
                }
            })
                .then(result => {
                    res.status(200).json({ message: "Data bukti pembayaran  berhasil diUpdate" })
                })
        } catch (error) {
            next(error)
        }
    },

    aproveBuak: async (req, res, next) => {
        const id = req.params.id
        const herRegistrasiUse = await herRegistrasiModel.findOne({
            include: [{
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
            }, {
                attributes: ['nim', "nama"],
                model: mahasiswaModel,
                where: { status: "aktif" }
            }],
            where: {
                id_her_registrasi: id,
                status: "aktif"
            }
        })
        if (!herRegistrasiUse) return res.status(404).json({ message: "data Tidak ditemukan " })
        const { keterangan } = req.body
        try {
            await herRegistrasiModel.update({
                keterangan: keterangan
            }, {
                where: {
                    id_her_registrasi: id
                }
            })
                .then(result => {
                    res.status(200).json({ message: "bukti pembayaran  berhasil diAprove" })
                })
        } catch (error) {
            next(error)
        }
    },
}