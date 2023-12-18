const { Op } = require("sequelize")
const jadwalKuliahModel = require('../models/jadwalKuliahModel.js')
const jadwalPertemuanModel = require('../models/jadwalPertemuanModel.js')
const path = require('path')
const fs = require('fs')

module.exports = {
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
    }
}