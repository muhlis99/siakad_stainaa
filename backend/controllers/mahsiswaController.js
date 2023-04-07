const mahasiswa = require('../models/mahasiswaModel.js')
const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const fakultasModel = require('../models/fakultasModel.js')
const prodiModel = require('../models/prodiModel.js')
const { desa, kecamatan, kabupaten, provinsi, negara } = require('../models/alat_alatMahasiswaModel.js')
const { Op, DataTypes } = require('sequelize')

module.exports = {
    get: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 0
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = perPage * currentPage
        const totalPage = await mahasiswa.count({
            include: [{
                model: jenjangPendidikanModel,
                attributes: ["nama_jenjang_pendidikan"],
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                attributes: ["nama_fakultas"],
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                attributes: ["nama_prodi"],
                where: { status: "aktif" }
            }],
            attributes: ["id_mahasiswa", "nim", "nama"],
            where: {
                [Op.or]: [
                    {
                        id_mahasiswa: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nim: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nama: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: "aktif"
            }
        })
        const totalItems = Math.ceil(totalPage / perPage)
        await mahasiswa.findAll({
            include: [{
                model: jenjangPendidikanModel,
                attributes: ["nama_jenjang_pendidikan"],
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                attributes: ["nama_fakultas"],
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                attributes: ["nama_prodi"],
                where: { status: "aktif" }
            }],
            attributes: ["id_mahasiswa", "nim", "nama"],
            where: {
                [Op.or]: [
                    {
                        id_mahasiswa: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nim: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nama: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: "aktif"
            },
            offset: offset,
            limit: perPage,
            order: [
                ["id_mahasiswa", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All Mahasiswa Success",
                    data: result,
                    total_data: totalItems,
                    per_page: perPage,
                    current_page: currentPage
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getById: async (req, res, next) => {
        const id = req.params.id
        const mahasiswaUse = await mahasiswa.findOne({
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
                model: negara
            }, {
                model: provinsi
            }, {
                model: kabupaten
            }, {
                model: kecamatan
            }, {
                model: desa
            }],
            where: {
                id_mahasiswa: id,
                status: "aktif"
            }
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data Mahasiswa Tidak Ditemukan",
                        data: []
                    })
                }
                res.status(201).json({
                    message: "Data Mahasiswa Ditemukan",
                    data: result
                })
            }).
            catch(err => {
                next(err)
            })
    },

    createFirst: async (req, res, next) => {
        await mahasiswa.create({
            nim: "",
            no_kk: "",
            nik: "",
            no_kps: "",
            nisn: "",
            npwp: "",
            nama: "",
            tanggal_lahir: "",
            tempat_lahir: "",
            jenis_kelamin: "",
            jalan: "",
            dusun: "",
            rt: "",
            rw: "",
            kode_pos: "",
            desa: "",
            kecamatan: "",
            kabupaten: "",
            provinsi: "",
            negara: "",
            alat_transportasi: "",
            jalur_pendaftaran: "",
            jenis_pendaftaran: "",
            jenis_tinggal: "",
            penerima_kps: "",
            mulai_semester: "",
            tanggal_masuk_kuliah: "",
            email: "",
            no_hp: "",
            no_telepon: "",
            nik_ayah: "",
            nama_ayah: "",
            tanggal_lahir_ayah: "",
            pekerjaan_ayah: "",
            penghasilan_ayah: "",
            pendidikan_ayah: "",
            nik_ibu: "",
            nama_ibu: "",
            tanggal_lahir_ibu: "",
            pekerjaan_ibu: "",
            penghasilan_ibu: "",
            pendidikan_ibu: "",
            nik_wali: "",
            nama_wali: "",
            tanggal_lahir_wali: "",
            pekerjaan_wali: "",
            penghasilan_wali: "",
            pendidikan_wali: "",
            code_jenjang_pendidikan: "",
            code_fakultas: "",
            code_prodi: "",
            foto_diri: "",
            foto_kk: "",
            foto_ktp: "",
            foto_ijazah: "",
            foto_kip: "",
            status: "",
        }).
            then(result => {
                res.status(201).json({
                    message: "Data Mahasiswa First success Ditambahkan",
                    data: result.id_mahasiswa
                })
            }).
            catch(err => {
                next(err)
            })
    },

    createForm1: async (req, res, next) => {
        const { nik, nama, no_kk, jenis_kelamin, tempat_lahir, tanggal, bulan, tahun, email, no_hp,
            no_telepon, nisn, penerima_kps, no_kps, npwp,
            jalur_pendaftaran, jenis_pendaftaran } = req.body
        const id = req.params.id
        const tanggal_lahir = tahun + "-" + bulan + "-" + tanggal
        const mahasiswaUse = await mahasiswa.findOne()
        if (!mahasiswaUse) return res.status(401).json({ message: "Data Mahasiswa tidak ditemukan" })
        await mahasiswa.update({
            nik: nik,
            nama: nama,
            no_kk: no_kk,
            jenis_kelamin: jenis_kelamin,
            tempat_lahir: tempat_lahir,
            tanggal_lahir: tanggal_lahir,
            email: email,
            no_hp: no_hp,
            no_telepon: no_telepon,
            nisn: nisn,
            penerima_kps: penerima_kps,
            no_kps: no_kps,
            npwp: npwp,
            jalur_pendaftaran: jalur_pendaftaran,
            jenis_pendaftaran: jenis_pendaftaran
        }, {
            where: {
                id_mahasiswa: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data Mahasiswa success di tambahkan form 1"
                })
            }).
            catch(err => {
                next(err)
            })
    }
}