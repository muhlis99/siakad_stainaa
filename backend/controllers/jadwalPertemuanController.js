const { Op } = require("sequelize")
const jadwalKuliahModel = require('../models/jadwalKuliahModel.js')
const jadwalPertemuanModel = require('../models/jadwalPertemuanModel.js')
const path = require('path')
const fs = require('fs')


module.exports = {
    get: async (req, res, next) => {
        const { codeJadkul } = req.params
        await jadwalPertemuanModel.findAll({
            include: [{
                model: jadwalKuliahModel,
                where: { status: "aktif" }
            }],
            where: {
                code_jadwal_kuliah: codeJadkul,
                status: "aktif"
            }
        }).then(all => {
            res.status(201).json({
                message: "Get All jadwal pertemuan Success",
                data: all,
            })
        }).catch(err => {
            next(err)
        })
    },

    getById: async (req, res, next) => {
        const { id } = req.params
        await jadwalPertemuanModel.findOne({
            include: [{
                model: jadwalKuliahModel,
                where: { status: "aktif" }
            }],
            where: {
                id_jadwal_pertemuan: id,
                status: "aktif"
            }
        }).then(all => {
            if (!all) {
                return res.status(404).json({
                    message: "Data jadwal pertemuan Tidak Ditemukan",
                    data: null
                })
            }
            res.status(201).json({
                message: "Data jadwal pertemuan Ditemukan",
                data: all
            })
        }).catch(err => {
            next(err)
        })
    },

    post: async (req, res, next) => {
        const { codeJadkul } = req.params
        const dataJadwalKuliah = await jadwalKuliahModel.findOne({
            where: {
                code_jadwal_kuliah: codeJadkul,
                status: "aktif"
            }
        })
        const dataJadwalPertemuan = await jadwalPertemuanModel.findOne({
            where: {
                code_jadwal_kuliah: codeJadkul,
                status: "aktif"
            }
        })
        if (dataJadwalPertemuan) return res.status(404).json({ message: "Data jadwal pertemuan sudah ada" })

        const jmlPert = dataJadwalKuliah.jumlah_pertemuan
        const hari = dataJadwalKuliah.hari
        const tanggalMulai = dataJadwalKuliah.tanggal_mulai

        const HR = ["minggu", "sennin", "selasa", "rabu", "kamis", "jum'at", "sabtu"]
        const indexHari = HR.indexOf(hari)

        let day = new Date(tanggalMulai)

        for (let i = 1; i <= jmlPert; i++) {

            function randomAngka(params) {
                let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                let charLength = chars.length;
                let result = ''
                for (let i = 0; i < params; i++) {
                    result += chars.charAt(Math.floor(Math.random() * charLength))
                }
                return result
            }
            let randomNumber = Math.floor(1000 + Math.random() * 9000)
            const codeJadwalPertemuan = randomAngka(2) + randomNumber

            let days = 7 - day.getDay() + indexHari;
            let nextDay = new Date(day.setDate(day.getDate() + days))

            await jadwalPertemuanModel.bulkCreate([{
                code_jadwal_pertemuan: codeJadwalPertemuan,
                code_jadwal_kuliah: codeJadkul,
                pertemuan: i,
                tanggal_pertemuan: nextDay.toISOString().slice(0, 10),
                jenis_pertemuan: "kuliah",
                metode_pembelajaran: "offline",
                url_online: "",
                rencana_materi: "",
                lampiran_materi: "",
                status_pertemuan: "terjadwal",
                status: "aktif"
            }])
        }

        try {
            res.status(201).json({
                message: "Data jadwal pertemuan success ditambahkan",
            })
        } catch (error) {
            next(error)
        }
    },

    put: async (req, res, next) => {
        const { id } = req.params
        const jadawalPertemuanUse = await jadwalPertemuanModel.findOne({
            include: [{
                model: jadwalKuliahModel,
                where: { status: "aktif" }
            }],
            where: {
                id_jadwal_pertemuan: id,
                status: "aktif"
            }
        })
        if (!jadawalPertemuanUse) return res.status(401).json({ message: "Data jadwal pertemuan tidak ditemukan" })

        let fileNameLampiranMateri = ""
        if (req.files != null) {
            if (jadawalPertemuanUse.lampiran_materi === "") {
                const file = req.files.lampiran_materi
                const fileSize = file.data.length
                const ext = path.extname(file.name)
                fileNameLampiranMateri = "lampiran_materi" + id + file.md5 + ext
                const allowedType = ['.rtf', '.doc', '.docx', '.pdf', '.xlsx', '.xls']
                if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "lampiran materi yang anda upload tidak valid" })
                if (fileSize > 5000000) return res.status(422).json({ msg: "lampiran materi diri yang anda upload tidak boleh lebih dari 5 mb" })
                file.mv(`../tmp_siakad/lampiranMateri/${fileNameLampiranMateri}`, (err) => {
                    if (err) return res.status(500).json({ message: err.message })
                })
            } else {
                const file = req.files.lampiran_materi
                const fileSize = file.data.length
                const ext = path.extname(file.name)
                fileNameLampiranMateri = "lampiran_materi" + id + file.md5 + ext
                const allowedType = ['.rtf', '.doc', '.docx', '.pdf', '.xlsx', '.xls']
                if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "lampiran materi yang anda upload tidak valid" })
                if (fileSize > 5000000) return res.status(422).json({ message: "lampiran materi yang anda upload tidak boleh lebih dari 5 mb" })
                const filepath = `../tmp_siakad/lampiranMateri/${jadawalPertemuanUse.lampiran_materi}`
                fs.unlinkSync(filepath)
                file.mv(`../tmp_siakad/lampiranMateri/${fileNameLampiranMateri}`, (err) => {
                    if (err) return res.status(500).json({ message: err.message })
                })
            }
        } else {
            fileNameLampiranMateri = ""
        }

        const { jenis_pertemuan, metode_pembelajaran,
            url_online, rencana_materi, status_pertemuan } = req.body

        try {
            await jadwalPertemuanModel.update({
                jenis_pertemuan: jenis_pertemuan,
                metode_pembelajaran: metode_pembelajaran,
                url_online: url_online,
                rencana_materi: rencana_materi,
                lampiran_materi: fileNameLampiranMateri,
                status_pertemuan: status_pertemuan,
            }, {
                where: {
                    id_jadwal_pertemuan: id
                }
            })
                .then(result => {
                    res.status(200).json({
                        message: "data jadwal pertemuan berhasil diupdate",
                    })
                })
        } catch (error) {
            next(error)
        }
    },

    deleteStatus: async (req, res, next) => {
        const { id } = req.params
        const jadawalPertemuanUse = await jadwalPertemuanModel.findOne({
            include: [{
                model: jadwalKuliahModel,
                where: { status: "aktif" }
            }],
            where: {
                id_jadwal_pertemuan: id,
                status: "aktif"
            }
        })
        if (!jadawalPertemuanUse) return res.status(401).json({ message: "Data jadwal pertemuan tidak ditemukan" })
        await jadwalPertemuanModel.update({
            status: "tidak"
        }, {
            where: {
                id_jadwal_pertemuan: id
            }
        }).then(all => {
            res.status(200).json({
                message: "data jadwal pertemuan berhasil dihapus",
            })
        }).catch(err => {
            next(err)
        })
    },

    setJenisPertemuan: async (req, res, next) => {
        const { id, jenis_pertemuan } = req.body
        await jadwalPertemuanModel.update({
            jenis_pertemuan: jenis_pertemuan
        }, {
            where: {
                id_jadwal_pertemuan: id
            }
        }).then(all => {
            res.status(200).json({
                message: "set jenis pertemuan berhasil dirubah",
            })
        }).catch(err => {
            next(err)
        })
    },

    setMetodePembelajaran: async (req, res, next) => {
        const { id, metode_pembelajaran } = req.body
        await jadwalPertemuanModel.update({
            metode_pembelajaran: metode_pembelajaran
        }, {
            where: {
                id_jadwal_pertemuan: id
            }
        }).then(all => {
            res.status(200).json({
                message: "set metode pembelajaran berhasil dirubah",
            })
        }).catch(err => {
            next(err)
        })
    }

}