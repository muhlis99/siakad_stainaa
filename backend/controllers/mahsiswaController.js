const mahasiswa = require('../models/mahasiswaModel.js')
const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const fakultasModel = require('../models/fakultasModel.js')
const prodiModel = require('../models/prodiModel.js')
const historyMahasiswa = require('../models/historyMahasiswaModel.js')
const { desa, kecamatan, kabupaten, provinsi, negara } = require('../models/equipmentDsnMhsModel.js')
const { Op, DataTypes } = require('sequelize')
const Sequelize = require('../config/database.js')
const path = require('path')
const fs = require('fs')
const readXlsxFile = require('read-excel-file/node')

module.exports = {
    get: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = (currentPage - 1) * perPage
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


    getByCreateFirst: async (req, res, next) => {
        const id = req.params.id
        const mahasiswaUse = await mahasiswa.findOne({
            include: [{
                model: jenjangPendidikanModel,
            }, {
                model: fakultasModel,
            }, {
                model: prodiModel,
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
        const tanggal_lahir_ayah = tahun_a + "-" + bulan_a + "-" + tanggal_a
        const tanggal_lahir_ibu = tahun_b + "-" + bulan_b + "-" + tanggal_b

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
        const tanggal_lahir_wali = tahun_w + "-" + bulan_w + "-" + tanggal_w
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
        if (code_prodi == "S1AIPAI") {
            kode_prodi_nim = "01"
        }
        //  else if (code_prodi == "S1") {

        // } 
        else {
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
        try {
            await historyMahasiswa.create({
                nim: mahasiswaUse.nim,
                code_semester: mulai_semester,
                code_jenjang_pendidikan: code_jenjang_pendidikan,
                code_fakultas: code_fakultas,
                code_prodi: code_prodi,
                status: "aktif"
            })
        } catch (error) {
            next(error)
        }
    },

    createFile: async (req, res, next) => {
        const id = req.params.id
        // const { foto_diri, foto_kk, foto_ktp, foto_ijazah, foto_kip } = req.body
        const mahasiswaUse = await mahasiswa.findOne({
            where: {
                id_mahasiswa: id
            }
        })
        if (!mahasiswaUse) return res.status(401).json({ message: "Data Mahasiswa tidak ditemukan" })

        // ----------- foto diri ------------- //
        let fileNameFotoDiri = ""
        if (mahasiswaUse.foto_diri === "") {
            const file = req.files.foto_diri
            if (!file) return res.status(400).json({ message: "foto diri tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoDiri = "foto_diri" + id + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto diri yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ msg: "file foto diri yang anda upload tidak boleh lebih dari 5 mb" })
            file.mv(`./tmp/mahasiswa/diri/${fileNameFotoDiri}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        } else {
            const file = req.files.foto_diri
            if (!file) return res.status(400).json({ message: "foto diri tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoDiri = "foto_diri" + id + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto diri yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ message: "file foto diri yang anda upload tidak boleh lebih dari 5 mb" })
            const filepath = `./tmp/mahasiswa/diri/${mahasiswaUse.foto_diri}`
            fs.unlinkSync(filepath)
            file.mv(`./tmp/mahasiswa/diri/${fileNameFotoDiri}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        }
        // ---------------- end foto diri --------------//


        // ----------- foto kk ------------- //
        let fileNameFotoKK = ""
        if (mahasiswaUse.foto_kk === "") {
            const file = req.files.foto_kk
            if (!file) return res.status(400).json({ message: "foto kk tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoKK = "foto_kk" + id + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto kk yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ msg: "file foto kk yang anda upload tidak boleh lebih dari 5 mb" })
            file.mv(`./tmp/mahasiswa/kk/${fileNameFotoKK}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        } else {
            const file = req.files.foto_kk
            if (!file) return res.status(400).json({ message: "foto kk tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoKK = "foto_kk" + id + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto kk yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ message: "file foto kk yang anda upload tidak boleh lebih dari 5 mb" })
            const filepath = `./tmp/mahasiswa/kk/${mahasiswaUse.foto_kk}`
            fs.unlinkSync(filepath)
            file.mv(`./tmp/mahasiswa/kk/${fileNameFotoKK}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        }
        // ---------------- end foto kk --------------//

        //----------- foto ktp------------- //
        let fileNameFotoKtp = ""
        if (mahasiswaUse.foto_ktp === "") {
            const file = req.files.foto_ktp
            if (!file) return res.status(400).json({ message: "foto ktp tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoKtp = "foto_ktp" + id + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto ktp yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ msg: "file foto ktp yang anda upload tidak boleh lebih dari 5 mb" })
            file.mv(`./tmp/mahasiswa/ktp/${fileNameFotoKtp}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        } else {
            const file = req.files.foto_ktp
            if (!file) return res.status(400).json({ message: "foto ktp tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoKtp = "foto_ktp" + id + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto ktp yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ message: "file foto ktp yang anda upload tidak boleh lebih dari 5 mb" })
            const filepath = `./tmp/mahasiswa/ktp/${mahasiswaUse.foto_ktp}`
            fs.unlinkSync(filepath)
            file.mv(`./tmp/mahasiswa/ktp/${fileNameFotoKtp}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        }
        // ---------------- end foto ktp --------------//

        //----------- foto ijazah------------- //
        let fileNameFotoIjazah = ""
        if (mahasiswaUse.foto_ijazah === "") {
            const file = req.files.foto_ijazah
            if (!file) return res.status(400).json({ message: "foto ijazah tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoIjazah = "foto_ijazah" + id + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto ijazah yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ msg: "file foto ijazah yang anda upload tidak boleh lebih dari 5 mb" })
            file.mv(`./tmp/mahasiswa/ijazah/${fileNameFotoIjazah}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        } else {
            const file = req.files.foto_ijazah
            if (!file) return res.status(400).json({ message: "foto ijazah tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoIjazah = "foto_ijazah" + id + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto ijazah yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ message: "file foto ijazah yang anda upload tidak boleh lebih dari 5 mb" })
            const filepath = `./tmp/mahasiswa/ijazah/${mahasiswaUse.foto_ijazah}`
            fs.unlinkSync(filepath)
            file.mv(`./tmp/mahasiswa/ijazah/${fileNameFotoIjazah}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        }
        // ---------------- end foto ijazah --------------//

        //----------- foto kip------------- //
        let fileNameFotoKip = ""
        if (mahasiswaUse.foto_kip === "") {
            const file = req.files.foto_kip
            if (!file) return res.status(400).json({ message: "foto kip tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoKip = "foto_kip" + id + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto kip yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ msg: "file foto kip yang anda upload tidak boleh lebih dari 5 mb" })
            file.mv(`./tmp/mahasiswa/kip/${fileNameFotoKip}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        } else {
            const file = req.files.foto_kip
            if (!file) return res.status(400).json({ message: "foto kip tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoKip = "foto_kip" + id + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto kip yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ message: "file foto kip yang anda upload tidak boleh lebih dari 5 mb" })
            const filepath = `./tmp/mahasiswa/kip/${mahasiswaUse.foto_kip}`
            fs.unlinkSync(filepath)
            file.mv(`./tmp/mahasiswa/kip/${fileNameFotoKip}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        }
        // ---------------- end foto kip --------------//

        try {
            await mahasiswa.update({
                foto_diri: fileNameFotoDiri,
                foto_kk: fileNameFotoKK,
                foto_ktp: fileNameFotoKtp,
                foto_ijazah: fileNameFotoIjazah,
                foto_kip: fileNameFotoKip,
            }, {
                where: {
                    id_mahasiswa: id
                }
            })
                .then(result => {
                    res.status(200).json({ message: "Data file mahasiswa berhasil ditambahkan" })
                })
        } catch (error) {
            next(error)
        }
    },

    nonAktif: async (req, res, next) => {
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
            }],
            where: {
                id_mahasiswa: id,
                status: "aktif"
            }
        })
        if (!mahasiswaUse) return res.status(401).json({ message: "Data Mahasiswa tidak ditemukan" })
        await mahasiswa.update({
            status: "tidak"
        }, {
            where: {
                id_mahasiswa: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "data mahasiswa succes dihapus"
                })
            }).
            catch(err => {
                next(err)
            })
    },

    delete: async (req, res, next) => {
        const id = req.params.id
        const mahasiswaUse = await mahasiswa.findOne({
            where: {
                id_mahasiswa: id
            }
        })
        if (!mahasiswaUse) return res.status(401).json({ message: "Data Mahasiswa tidak ditemukan" })
        await mahasiswa.destroy({
            where: {
                id_mahasiswa: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "data mahasiswa succes dibatalkan"
                })
            }).
            catch(err => {
                next(err)
            })
    },

    importEcxel: async (req, res, next) => {
        const file = req.files.import_excel
        if (!file) return res.status(400).json({ message: "file tidak boleh kosong" })
        const fileSize = file.data.length
        const ext = path.extname(file.name)
        fileExcel = file.md5 + ext
        const allowedType = ['.csv', '.xls', '.xlsx']
        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file yang anda upload tidak valid" })
        file.mv(`./tmp/excel/${fileExcel}`, (err) => {
            if (err) return res.status(500).json({ message: err.message })
        })

        const pathFileExcel = path.join(__dirname, `../tmp/excel/${fileExcel}`)
        const schema = {
            'tanggal_lahir': {
                prop: 'date',
                type: Date
            }
        }
        const a = readXlsxFile(pathFileExcel).then(rows => {
            rows.shift()
            const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
            rows.map(row => (
                mahasiswa.bulkCreate([{
                    nim: "",
                    nik: row[1],
                    no_kk: row[2],
                    no_kps: row[3],
                    nisn: row[4],
                    npwp: row[5],
                    nama: row[6],
                    tanggal_lahir: row[7],
                    tempat_lahir: row[8],
                    jenis_kelamin: row[9],
                    jalan: row[10],
                    dusun: row[11],
                    rt: row[12],
                    rw: row[13],
                    kode_pos: row[14],
                    desa: row[15],
                    kecamatan: row[16],
                    kabupaten: row[17],
                    provinsi: row[18],
                    negara: row[19],
                    alat_transportasi: row[20],
                    jalur_pendaftaran: row[21],
                    jenis_pendaftaran: row[22],
                    jenis_tinggal: row[23],
                    penerima_kps: row[24],
                    mulai_semester: row[25],
                    email: row[26],
                    no_hp: row[27],
                    no_telepon: row[28],
                    nik_ayah: row[29],
                    nama_ayah: row[30],
                    tanggal_lahir_ayah: row[31],
                    pekerjaan_ayah: row[32],
                    penghasilan_ayah: row[33],
                    pendidikan_ayah: row[34],
                    nik_ibu: row[35],
                    nama_ibu: row[36],
                    tanggal_lahir_ibu: row[37],
                    pekerjaan_ibu: row[38],
                    penghasilan_ibu: row[39],
                    pendidikan_ibu: row[40],
                    nik_wali: row[41],
                    nama_wali: row[42],
                    tanggal_lahir_wali: row[43],
                    pekerjaan_wali: row[44],
                    penghasilan_wali: row[45],
                    pendidikan_wali: row[46],
                    code_jenjang_pendidikan: row[47],
                    code_fakultas: row[48],
                    code_prodi: row[49],
                    tanggal_masuk_kuliah: date,
                    status: "aktif",
                    foto_diri: "",
                    foto_kk: "",
                    foto_ktp: "",
                    foto_ijazah: "",
                    foto_kip: "",
                    individualHooks: true
                }])
                    .then((result) => {
                        res.json({
                            message: "Data berhasil disimpan"
                        })
                    }).catch((err) => {
                    })
            ))
        })
    }

}