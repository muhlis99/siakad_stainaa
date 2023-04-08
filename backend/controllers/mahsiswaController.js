const mahasiswa = require('../models/mahasiswaModel.js')
const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const fakultasModel = require('../models/fakultasModel.js')
const prodiModel = require('../models/prodiModel.js')
const { desa, kecamatan, kabupaten, provinsi, negara } = require('../models/alat_alatMahasiswaModel.js')
const { Op, DataTypes, Sequelize, NUMBER } = require('sequelize')

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
        const mahasiswaUse = await mahasiswa.findOne({
            where: {
                id_mahasiswa: id
            }
        })
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
    },

    createForm2: async (req, res, next) => {
        const { jalan, dusun, rt, rw, kode_pos, negara,
            provinsi, kabupaten, kecamatan, desa, jenis_tinggal, alat_transportasi } = req.body
        const id = req.params.id
        const mahasiswaUse = await mahasiswa.findOne({
            where: {
                id_mahasiswa: id
            }
        })
        if (!mahasiswaUse) return res.status(401).json({ message: "Data Mahasiswa tidak ditemukan" })
        await mahasiswa.update({
            jalan: jalan,
            dusun: dusun,
            rt: rt,
            rw: rw,
            kode_pos: kode_pos,
            negara: negara,
            provinsi: provinsi,
            kabupaten: kabupaten,
            kecamatan: kecamatan,
            desa: desa,
            jenis_tinggal: jenis_tinggal,
            alat_transportasi: alat_transportasi,
        }, {
            where: {
                id_mahasiswa: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data Mahasiswa success di tambahkan form 2"
                })
            }).
            catch(err => {
                next(err)
            })
    },

    createForm3: async (req, res, next) => {
        const { nik_ayah, nama_ayah, pekerjaan_ayah, penghasilan_ayah, pendidikan_ayah, tanggal_a, bulan_a, tahun_a,
            nik_ibu, nama_ibu, pekerjaan_ibu, penghasilan_ibu, pendidikan_ibu, tanggal_b, bulan_b, tahun_b
        } = req.body
        const id = req.params.id
        const tanggal_lahir_ayah = tahun_a + "- " + bulan_a + " - " + tanggal_a
        const tanggal_lahir_ibu = tahun_b + "- " + bulan_b + " - " + tanggal_b

        const mahasiswaUse = await mahasiswa.findOne({
            where: {
                id_mahasiswa: id
            }
        })
        if (!mahasiswaUse) return res.status(401).json({ message: "Data Mahasiswa tidak ditemukan" })
        await mahasiswa.update({
            nik_ayah: nik_ayah,
            nama_ayah: nama_ayah,
            tanggal_lahir_ayah: tanggal_lahir_ayah,
            pekerjaan_ayah: pekerjaan_ayah,
            penghasilan_ayah: penghasilan_ayah,
            pendidikan_ayah: pendidikan_ayah,
            nik_ibu: nik_ibu,
            nama_ibu: nama_ibu,
            tanggal_lahir_ibu: tanggal_lahir_ibu,
            pekerjaan_ibu: pekerjaan_ibu,
            penghasilan_ibu: penghasilan_ibu,
            pendidikan_ibu: pendidikan_ibu,
        }, {
            where: {
                id_mahasiswa: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data Mahasiswa success di tambahkan form 3"
                })
            }).
            catch(err => {
                next(err)
            })
    },

    createForm4: async (req, res, next) => {
        const { nik_wali, nama_wali, pekerjaan_wali, penghasilan_wali, pendidikan_wali, tanggal_w, bulan_w, tahun_w,
            code_jenjang_pendidikan, code_fakultas, code_prodi, mulai_semester
        } = req.body
        const id = req.params.id
        const tanggal_lahir_wali = tahun_w + "- " + bulan_w + " - " + tanggal_w
        const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        const mahasiswaUse = await mahasiswa.findOne({
            where: {
                id_mahasiswa: id
            }
        })
        if (!mahasiswaUse) return res.status(401).json({ message: "Data Mahasiswa tidak ditemukan" })
        const date_nim = new Date()
        const t_nim = date_nim.getFullYear().toString().substr(-2)
        const b_nim = ("0" + (date_nim.getMonth() + 1)).slice(-2)
        var kode_prodi_nim
        if (code_prodi == "S1S1THJH") {
            kode_prodi_nim = "01"
        } else {
            kode_prodi_nim = "02"
        }
        const no_urut_mhs_terakhir = await mahasiswa.count({
            where: {
                tanggal_masuk_kuliah: {
                    [Op.substring]: date_nim.getFullYear()
                }
            }
        })
        var no_urut_mhs
        if (no_urut_mhs_terakhir == null) {
            no_urut_mhs = "0001"
        } else {
            const code = "0000"
            const a = no_urut_mhs_terakhir.toString()
            const panjang = a.length
            const nomor = code.slice(panjang)
            const b = no_urut_mhs_terakhir + 1
            no_urut_mhs = nomor + b
        }
        const nim = t_nim + b_nim + kode_prodi_nim + no_urut_mhs
        await mahasiswa.update({
            nik_wali: nik_wali,
            nama_wali: nama_wali,
            tanggal_lahir_wali: tanggal_lahir_wali,
            pekerjaan_wali: pekerjaan_wali,
            penghasilan_wali: penghasilan_wali,
            pendidikan_wali: pendidikan_wali,
            code_jenjang_pendidikan: code_jenjang_pendidikan,
            code_fakultas: code_fakultas,
            code_prodi: code_prodi,
            mulai_semester: mulai_semester,
            status: "aktif",
            tanggal_masuk_kuliah: date,
            nim: nim
        }, {
            where: {
                id_mahasiswa: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data Mahasiswa success di tambahkan form 4"
                })
            }).
            catch(err => {
                next(err)
            })
    },
}