const dosen = require('../models/dosenModel.js')
const { pendidikan, alatTransportasi } = require('../models/equipmentDsnMhsModel.js')
const { desa, kecamatan, kabupaten, provinsi, negara } = require('../models/equipmentDsnMhsModel.js')
const { Op } = require('sequelize')
const path = require('path')
const fs = require('fs')
const QRCode = require("qrcode");
const { createCanvas, loadImage } = require("canvas");

module.exports = {
    getAll: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        let totalItems
        await dosen.findAndCountAll({
            where: {
                status: "aktif"
            }
        }).
            then(all => {
                totalItems = all.count
                return dosen.findAll({
                    include: [{
                        model: pendidikan
                    }, {
                        model: alatTransportasi
                    }],
                    attributes: ["id_dosen", "nama", "nidn", "jenis_kelamin", "qrcode", "status"],
                    where: {
                        [Op.or]: [
                            {
                                nama: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                nidn: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                nip_ynaa: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                jenis_kelamin: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                status: {
                                    [Op.like]: `%${search}%`
                                }
                            }
                        ],
                        status: "aktif"
                    },
                    offset: (currentPage - 1) * perPage,
                    limit: perPage,
                    order: [
                        ["id_dosen", "DESC"]
                    ]
                })
            }).
            then(result => {
                const totalPage = Math.ceil(totalItems / perPage)
                res.status(200).json({
                    message: "Get All Dosen Success",
                    data: result,
                    total_data: totalItems,
                    per_page: perPage,
                    current_page: currentPage,
                    total_page: totalPage
                })
            }).
            catch(err => {
                // next(err)
                res.status(404).json({
                    data: err
                })
            })
    },

    getById: async (req, res, next) => {
        const id = req.params.id
        await dosen.findOne({
            include: [{
                model: pendidikan
            }, {
                model: alatTransportasi
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
                id_dosen: id,
                status: 'aktif'
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data dosen Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data dosen Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getByCreateFirst: async (req, res, next) => {
        const id = req.params.id
        await dosen.findOne({
            include: [{
                model: pendidikan
            }, {
                model: alatTransportasi
            }],
            where: {
                id_dosen: id,
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data dosen Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data dosen Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    createFirts: async (req, res, next) => {
        await dosen.create({
            nama: "",
            nidn: "",
            nip_ynaa: "",
            tempat_lahir: "",
            tanggal_lahir: "",
            jenis_kelamin: "",
            alamat_lengkap: "",
            desa: "",
            kecamatan: "",
            kabupaten: "",
            provinsi: "",
            negara: "",
            kode_pos: "",
            email: "",
            no_hp: "",
            no_telepon: "",
            pendidikan_terakhir: "",
            alat_transportasi: "",
            foto_diri: "",
            foto_ktp: "",
            foto_sehat_rohani: "",
            foto_sehat_jasmani: "",
            foto_sk_bebas_narkotika: "",
            foto_sk_dari_pimpinan_pt: "",
            foto_surat_perjanjian_kerja: "",
            foto_sk_dosen: "",
            foto_sk_aktif_melaksanakan_tridma_pt: "",
            tanggal_mulai: "",
            tanggal_berhenti: "",
            status_kepegawaian: "",
            status: ""
        }).
            then(result => {
                res.status(201).json({
                    message: "Data dosen First success Ditambahkan",
                    data: result.id_dosen
                })
            }).
            catch(err => {
                next(err)
            })
    },

    createForm1: async (req, res, next) => {
        const id = req.params.id
        const { nama, nidn, nip_ynaa, tempat_lahir,
            tahun, bulan, tanggal, jenis_kelamin,
            email, no_hp, no_telepon } = req.body
        const dosenUse = await dosen.findOne({
            where: {
                id_dosen: id
            }
        })
        if (!dosenUse) return res.status(401).json({ message: "Data dosen tidak ditemukan" })
        const tanggal_lahir = tahun + "-" + bulan + "-" + tanggal
        await dosen.update({
            nidn: nidn,
            nama: nama,
            nip_ynaa: nip_ynaa,
            jenis_kelamin: jenis_kelamin,
            tempat_lahir: tempat_lahir,
            tanggal_lahir: tanggal_lahir,
            email: email,
            no_hp: no_hp,
            no_telepon: no_telepon,
        }, {
            where: {
                id_dosen: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data dosen success di tambahkan form 1"
                })
            }).
            catch(err => {
                next(err)
            })
    },

    createForm2: async (req, res, next) => {
        async function createQrCode(dataForQRcode, center_image, width, cwidth) {
            const canvas = createCanvas(width, width)
            QRCode.toCanvas(
                canvas,
                dataForQRcode,
                {
                    errorCorrectionLevel: "H",
                    width: 500,
                    margin: 1,
                    color: {
                        dark: "#000000",
                        light: "#ffffff",
                    },
                }
            )

            const ctx = canvas.getContext("2d")
            const img = await loadImage(center_image)
            const center = (width - cwidth) / 1
            ctx.drawImage(img, 200, 190, cwidth, cwidth)
            return canvas.toDataURL("image/png")
        }

        async function mainQrCode(nip_ynaa, qrCodeNew, qrCodeOld = "") {
            if (qrCodeOld != "") {
                const data = nip_ynaa
                const centerImageBase64 = fs.readFileSync(
                    path.resolve('./stainaa.png')
                )
                const dataQrWithLogo = Buffer.from(centerImageBase64).toString('base64url')
                const qrCode = await createQrCode(
                    data,
                    `data:image/png;base64,${dataQrWithLogo}`,
                    150,
                    100
                )
                const base64Data = qrCode.replace(/^data:image\/png;base64,/, "");
                fs.unlinkSync(`../tmp_siakad/dosen/qrcode/${qrCodeOld}`)
                let filename = `../tmp_siakad/dosen/qrcode/${qrCodeNew}.png`;
                fs.writeFile(filename, base64Data, "base64url", (err) => {
                    if (!err) console.log(`${filename} created successfully!`)
                })
            } else {
                const data = nip_ynaa
                const centerImageBase64 = fs.readFileSync(
                    path.resolve('./stainaa.png')
                )
                const dataQrWithLogo = Buffer.from(centerImageBase64).toString('base64url')
                const qrCode = await createQrCode(
                    data,
                    `data:image/png;base64,${dataQrWithLogo}`,
                    150,
                    100
                )
                const base64Data = qrCode.replace(/^data:image\/png;base64,/, "");
                let filename = `../tmp_siakad/dosen/qrcode/${qrCodeNew}.png`;
                fs.writeFile(filename, base64Data, "base64url", (err) => {
                    if (!err) console.log(`${filename} created successfully!`)
                })
            }
        }


        const id = req.params.id
        const { alamat_lengkap, desa, kecamatan,
            kabupaten, provinsi, negara, kode_pos, alat_transportasi,
            pendidikan_terakhir, status_kepegawaian } = req.body
        const dosenUse = await dosen.findOne({
            where: {
                id_dosen: id
            }
        })
        if (!dosenUse) return res.status(401).json({ message: "Data dosen tidak ditemukan" })
        const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        let dataQrCode
        let dataQrCodeOld = dosenUse.qrCode
        if (dataQrCodeOld != "") {
            let nip_ynaa = dosenUse.nip_ynaa
            dataQrCode = "dosenQrcode" + Buffer.from(nip_ynaa).toString('base64url')
            mainQrCode(nip_ynaa, dataQrCode, dataQrCodeOld)
        } else {
            let nip_ynaa = dosenUse.nip_ynaa
            dataQrCode = "dosenQrcode" + Buffer.from(nip_ynaa).toString('base64url')
            mainQrCode(nip_ynaa, dataQrCode)
        }

        await dosen.update({
            alamat_lengkap: alamat_lengkap,
            desa: desa,
            kecamatan: kecamatan,
            kabupaten: kabupaten,
            provinsi: provinsi,
            negara: negara,
            kode_pos: kode_pos,
            alat_transportasi: alat_transportasi,
            pendidikan_terakhir: pendidikan_terakhir,
            status_kepegawaian: status_kepegawaian,
            tanggal_mulai: date,
            qrcode: dataQrCode + ".png",
            status: "aktif"
        }, {
            where: {
                id_dosen: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data dosen success di tambahkan form 2"
                })
            }).
            catch(err => {
                next(err)
            })
    },

    createFromUpload1: async (req, res, next) => {
        const id = req.params.id
        const dosenUse = await dosen.findOne({
            where: {
                id_dosen: id
            }
        })
        if (!dosenUse) return res.status(401).json({ message: "Data dosen tidak ditemukan" })
        // ----------- foto diri ------------- //
        let fileNameFotoDiri = ""
        if (dosenUse.foto_diri === "") {
            const file = req.files.foto_diri
            if (!file) return res.status(400).json({ message: "foto diri tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoDiri = "foto_diri" + id + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto diri yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ msg: "file foto diri yang anda upload tidak boleh lebih dari 5 mb" })
            file.mv(`../tmp_siakad/dosen/diri/${fileNameFotoDiri}`, (err) => {
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
            const filepath = `../tmp_siakad/dosen/diri/${dosenUse.foto_diri}`
            fs.unlinkSync(filepath)
            file.mv(`../tmp_siakad/dosen/diri/${fileNameFotoDiri}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        }
        // ---------------- end foto diri --------------//

        // ----------- foto ktp ------------- //
        let fileNameFotoKtp = ""
        if (dosenUse.foto_ktp === "") {
            const file = req.files.foto_ktp
            if (!file) return res.status(400).json({ message: "foto ktp tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoKtp = "foto_ktp" + id + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto ktp yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ msg: "file foto ktp yang anda upload tidak boleh lebih dari 5 mb" })
            file.mv(`../tmp_siakad/dosen/ktp/${fileNameFotoKtp}`, (err) => {
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
            const filepath = `../tmp_siakad/dosen/ktp/${dosenUse.foto_ktp}`
            fs.unlinkSync(filepath)
            file.mv(`../tmp_siakad/dosen/ktp/${fileNameFotoKtp}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        }
        // ---------------- end foto ktp --------------//

        // ----------- foto Sehat Rohani ------------- //
        let fileNameFotoSehatRohani = ""
        if (dosenUse.foto_sehat_rohani === "") {
            const file = req.files.foto_sehat_rohani
            if (!file) return res.status(400).json({ message: "foto Sehat Rohani tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoSehatRohani = "foto_sehat_rohani" + id + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto sehat rohani yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ msg: "file foto sehat rohani yang anda upload tidak boleh lebih dari 5 mb" })
            file.mv(`../tmp_siakad/dosen/sehatRohani/${fileNameFotoSehatRohani}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        } else {
            const file = req.files.foto_sehat_rohani
            if (!file) return res.status(400).json({ message: "foto Sehat Rohani tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoSehatRohani = "foto_sehat_rohani" + id + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto sehat rohani yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ message: "file foto sehat rohani yang anda upload tidak boleh lebih dari 5 mb" })
            const filepath = `../tmp_siakad/dosen/sehatRohani/${dosenUse.foto_sehat_rohani}`
            fs.unlinkSync(filepath)
            file.mv(`../tmp_siakad/dosen/SehatRohani/${fileNameFotoSehatRohani}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        }
        // ---------------- end foto Sehat Rohani --------------//

        // ----------- foto Sehat Jasmani ------------- //
        let fileNameFotoSehatJasmani = ""
        if (dosenUse.foto_sehat_jasmani === "") {
            const file = req.files.foto_sehat_jasmani
            if (!file) return res.status(400).json({ message: "foto Sehat Jasmani tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoSehatJasmani = "foto_sehat_jasmani" + id + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto sehat jasmani yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ msg: "file foto sehat jasmani yang anda upload tidak boleh lebih dari 5 mb" })
            file.mv(`../tmp_siakad/dosen/sehatJasmani/${fileNameFotoSehatJasmani}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        } else {
            const file = req.files.foto_sehat_jasmani
            if (!file) return res.status(400).json({ message: "foto Sehat jasmani tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoSehatJasmani = "foto_sehat_jasmani" + id + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto sehat jasmani yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ message: "file foto sehat jasmani yang anda upload tidak boleh lebih dari 5 mb" })
            const filepath = `../tmp_siakad/dosen/sehatJasmani/${dosenUse.foto_sehat_jasmani}`
            fs.unlinkSync(filepath)
            file.mv(`../tmp_siakad/dosen/SehatJasmani/${fileNameFotoSehatJasmani}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        }
        // ---------------- end foto Sehat Jasmani --------------//

        // ----------- foto Sehat Surat Perjanjian Kerja ------------- //
        let fileNameFotoSuratPerjanjianKerja = ""
        if (dosenUse.foto_surat_perjanjian_kerja === "") {
            const file = req.files.foto_surat_perjanjian_kerja
            if (!file) return res.status(400).json({ message: "foto surat perjanian kerja tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoSuratPerjanjianKerja = "foto_surat_perjanjian_kerja" + id + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto surat perjanian kerja yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ msg: "file foto surat perjanian kerja yang anda upload tidak boleh lebih dari 5 mb" })
            file.mv(`../tmp_siakad/dosen/suratPerjanjianKerja/${fileNameFotoSuratPerjanjianKerja}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        } else {
            const file = req.files.foto_surat_perjanjian_kerja
            if (!file) return res.status(400).json({ message: "foto surat perjanian kerja tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoSuratPerjanjianKerja = "foto_surat_perjanjian_kerja" + id + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto surat perjanian kerja yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ message: "file foto surat perjanian kerja yang anda upload tidak boleh lebih dari 5 mb" })
            const filepath = `../tmp_siakad/dosen/suratPerjanjianKerja/${dosenUse.foto_surat_perjanjian_kerja}`
            fs.unlinkSync(filepath)
            file.mv(`../tmp_siakad/dosen/suratPerjanjianKerja/${fileNameFotoSuratPerjanjianKerja}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        }
        // ---------------- end foto Sehat Jasmani --------------//

        try {
            await dosen.update({
                foto_diri: fileNameFotoDiri,
                foto_ktp: fileNameFotoKtp,
                foto_sehat_rohani: fileNameFotoSehatRohani,
                foto_sehat_jasmani: fileNameFotoSehatJasmani,
                foto_surat_perjanjian_kerja: fileNameFotoSuratPerjanjianKerja,
            }, {
                where: {
                    id_dosen: id
                }
            })
                .then(result => {
                    res.status(200).json({ message: "Data file dosen berhasil ditambahkan" })
                })
        } catch (error) {
            next(error)
        }
    },

    createFromUpload2: async (req, res, next) => {
        const id = req.params.id
        const dosenUse = await dosen.findOne({
            where: {
                id_dosen: id
            }
        })
        if (!dosenUse) return res.status(401).json({ message: "Data dosen tidak ditemukan" })
        // ----------- foto sk dosen ------------- //
        let fileNameFotoSkDosen = ""
        if (dosenUse.foto_sk_dosen === "") {
            const file = req.files.foto_sk_dosen
            if (!file) return res.status(400).json({ message: "foto sk dosen tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoSkDosen = "foto_sk_dosen" + id + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto sk dosen yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ msg: "file foto sk dosen yang anda upload tidak boleh lebih dari 5 mb" })
            file.mv(`../tmp_siakad/dosen/skDosen/${fileNameFotoSkDosen}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        } else {
            const file = req.files.foto_sk_dosen
            if (!file) return res.status(400).json({ message: "foto sk dosen tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoSkDosen = "foto_sk_dosen" + id + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto sk dosen yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ message: "file foto sk dosen yang anda upload tidak boleh lebih dari 5 mb" })
            const filepath = `../tmp_siakad/dosen/skDosen/${dosenUse.foto_sk_dosen}`
            fs.unlinkSync(filepath)
            file.mv(`../tmp_siakad/dosen/skDosen/${fileNameFotoSkDosen}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        }
        // ---------------- end foto sk dosen --------------//

        // ----------- foto sk bebas narkotika  ------------- //
        let fileNameFotoSkBebasNarkotika = ""
        if (dosenUse.foto_sk_bebas_narkotika === "") {
            const file = req.files.foto_sk_bebas_narkotika
            if (!file) return res.status(400).json({ message: "foto sk bebas narkotika tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoSkBebasNarkotika = "foto_sk_bebas_narkotika" + id + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto sk bebas narkotika yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ msg: "file foto sk bebas narkotika yang anda upload tidak boleh lebih dari 5 mb" })
            file.mv(`../tmp_siakad/dosen/skBebasNarkotika/${fileNameFotoSkBebasNarkotika}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        } else {
            const file = req.files.foto_sk_bebas_narkotika
            if (!file) return res.status(400).json({ message: "foto sk bebas narkotika tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoSkBebasNarkotika = "foto_sk_bebas_narkotika" + id + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto sk bebas narkotika yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ message: "file foto sk bebas narkotika yang anda upload tidak boleh lebih dari 5 mb" })
            const filepath = `../tmp_siakad/dosen/skBebasNarkotika/${dosenUse.foto_sk_bebas_narkotika}`
            fs.unlinkSync(filepath)
            file.mv(`../tmp_siakad/dosen/skBebasNarkotika/${fileNameFotoSkBebasNarkotika}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        }
        // ---------------- end foto sk bebas narkotika --------------//

        // ----------- foto sk dari pimpinan pt  ------------- //
        let fileNameFotoSkDariPimpinanPt = ""
        if (dosenUse.foto_sk_dari_pimpinan_pt === "") {
            const file = req.files.foto_sk_dari_pimpinan_pt
            if (!file) return res.status(400).json({ message: "foto sk dari pimpinan pt tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoSkDariPimpinanPt = "foto_sk_dari_pimpinan_pt" + id + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto sk dari pimpinan pt yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ msg: "file foto sk dari pimpinan pt yang anda upload tidak boleh lebih dari 5 mb" })
            file.mv(`../tmp_siakad/dosen/skDariPimpinanPt/${fileNameFotoSkDariPimpinanPt}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        } else {
            const file = req.files.foto_sk_dari_pimpinan_pt
            if (!file) return res.status(400).json({ message: "foto sk dari pimpinan pt tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoSkDariPimpinanPt = "foto_sk_dari_pimpinan_pt" + id + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto sk dari pimpinan pt yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ message: "file foto sk dari pimpinan pt yang anda upload tidak boleh lebih dari 5 mb" })
            const filepath = `../tmp_siakad/dosen/skDariPimpinanPt/${dosenUse.foto_sk_dari_pimpinan_pt}`
            fs.unlinkSync(filepath)
            file.mv(`../tmp_siakad/dosen/skDariPimpinanPt/${fileNameFotoSkDariPimpinanPt}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        }
        // ---------------- end foto sk dari pimpinan pt --------------//

        // ----------- foto sk aktif melaksanakan tridma pt  ------------- //
        let fileNameFotoSkAktifMelaksanakanTridmaPt = ""
        if (dosenUse.foto_sk_aktif_melaksanakan_tridma_pt === "") {
            const file = req.files.foto_sk_aktif_melaksanakan_tridma_pt
            if (!file) return res.status(400).json({ message: "foto sk aktif melaksanakan tridma pt tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoSkAktifMelaksanakanTridmaPt = "foto_sk_aktif_melaksanakan_tridma_pt" + id + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto sk aktif melaksanakan tridma pt yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ msg: "file foto sk aktif melaksanakan tridma pt yang anda upload tidak boleh lebih dari 5 mb" })
            file.mv(`../tmp_siakad/dosen/skAktifMelaksanakanTridmaPt/${fileNameFotoSkAktifMelaksanakanTridmaPt}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        } else {
            const file = req.files.foto_sk_aktif_melaksanakan_tridma_pt
            if (!file) return res.status(400).json({ message: "foto sk aktif melaksanakan tridma pt tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoSkAktifMelaksanakanTridmaPt = "foto_sk_aktif_melaksanakan_tridma_pt" + id + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto sk aktif melaksanakan tridma pt yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ message: "file foto sk aktif melaksanakan tridma pt yang anda upload tidak boleh lebih dari 5 mb" })
            const filepath = `../tmp_siakad/dosen/skAktifMelaksanakanTridmaPt/${dosenUse.foto_sk_aktif_melaksanakan_tridma_pt}`
            fs.unlinkSync(filepath)
            file.mv(`../tmp_siakad/dosen/skAktifMelaksanakanTridmaPt/${fileNameFotoSkAktifMelaksanakanTridmaPt}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        }
        // ---------------- end foto sk aktif melaksanakan tridma pt --------------//

        try {
            await dosen.update({
                foto_sk_dosen: fileNameFotoSkDosen,
                foto_sk_bebas_narkotika: fileNameFotoSkBebasNarkotika,
                foto_sk_dari_pimpinan_pt: fileNameFotoSkDariPimpinanPt,
                foto_sk_aktif_melaksanakan_tridma_pt: fileNameFotoSkAktifMelaksanakanTridmaPt
            }, {
                where: {
                    id_dosen: id
                }
            })
                .then(result => {
                    res.status(200).json({ message: "Data file dosen berhasil ditambahkan" })
                })
        } catch (error) {
            next(error)
        }
    },

    nonAktif: async (req, res, next) => {
        const id = req.params.id
        const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        const dosenUse = await dosen.findOne({
            include: [{
                model: pendidikan
            }, {
                model: alatTransportasi
            }],
            where: {
                id_dosen: id,
                status: 'aktif'
            }
        })
        if (!dosenUse) return res.status(401).json({ message: "Data dosen tidak ditemukan" })
        await dosen.update({
            status: "tidak",
            tanggal_berhenti: date
        }, {
            where: {
                id_dosen: id,
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data dosen success di hapus"
                })
            }).
            catch(err => {
                next(err)
            })
    },

    delete: async (req, res, next) => {
        const id = req.params.id
        const dosenUse = await dosen.findOne({
            where: {
                id_dosen: id
            }
        })
        if (!dosenUse) return res.status(401).json({ message: "Data dosen tidak ditemukan" })
        await dosen.destroy({
            where: {
                id_dosen: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "data dosen succes dibatalkan"
                })
            }).
            catch(err => {
                next(err)
            })
    },

    validasiEmail: async (req, res, next) => {
        const email = req.params.email
        const dosenUse = await dosen.findOne({
            where: {
                email: email
            }
        })
        if (dosenUse) return res.status(401).json({ message: "Email sudah ada" })
    }
}