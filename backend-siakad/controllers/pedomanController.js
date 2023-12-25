const { Op } = require('sequelize')
const path = require('path')
const fs = require('fs')
const pedomanModel = require('../models/pedomanModel.js')



module.exports = {
    getAll: async (req, res, next) => {
        await pedomanModel.findAll({
            where: {
                status: "aktif"
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data pedoman Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data pedoman Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getById: async (req, res, next) => {
        const id = req.params.id
        await pedomanModel.findOne({
            where: {
                id_pedoman: id
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data pedoman Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data pedoman Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    post: async (req, res, next) => {
        const { judul_pedoman, deskripsi, level, tanggal_terbit } = req.body

        let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)
        let file_pedoman = ""
        const file = req.files.file_pedoman
        const fileSize = file.data.length
        const ext = path.extname(file.name)
        file_pedoman = "lampiran_pedoman" + randomNumber + file.md5 + ext
        const allowedType = ['.rtf', '.doc', '.docx', '.pdf', '.xlsx', '.xls', '.pdf', '.pptx']
        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "lampiran materi yang anda upload tidak valid" })
        if (fileSize > 500000000) return res.status(422).json({ msg: "lampiran pedoman  yang anda upload tidak boleh lebih dari 500 mb" })
        file.mv(`../tmp_siakad/lampiranPedoman/${file_pedoman}`, (err) => {
            if (err) return res.status(500).json({ message: err.message })
        })

        await pedomanModel.create({
            code_pedoman: randomNumber,
            judul_pedoman: judul_pedoman,
            deskripsi: deskripsi,
            file_pedoman: file_pedoman,
            tanggal_terbit: tanggal_terbit,
            level: level,
            status: "aktif"
        }).then(result => {
            res.status(201).json({
                message: "Data pedoman Ditambahkan",
            })
        }).catch(err => {
            console.log(err)
        })
    },

    put: async (req, res, next) => {
        const id = req.params.id
        const pedomanUse = await pedomanModel.findOne({
            where: {
                id_pedoman: id
            }
        })
        if (!pedomanUse) return res.status(500).json({ message: "data tidak ditemukan" })
        const { judul_pedoman, deskripsi, level, tanggal_terbit } = req.body

        let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)
        let file_pedoman = ""
        if (req.files != null) {
            if (pedomanUse.file_pedoman === "") {
                const file = req.files.file_pedoman
                const fileSize = file.data.length
                const ext = path.extname(file.name)
                file_pedoman = "lampiran_pedoman" + randomNumber + file.md5 + ext
                const allowedType = ['.rtf', '.doc', '.docx', '.pdf', '.xlsx', '.xls', '.pdf', '.pptx']
                if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "lampiran materi yang anda upload tidak valid" })
                if (fileSize > 500000000) return res.status(422).json({ msg: "lampiran pedoman  yang anda upload tidak boleh lebih dari 500 mb" })
                file.mv(`../tmp_siakad/lampiranPedoman/${file_pedoman}`, (err) => {
                    if (err) return res.status(500).json({ message: err.message })
                })
            } else {
                const file = req.files.file_pedoman
                const fileSize = file.data.length
                const ext = path.extname(file.name)
                file_pedoman = "lampiran_pedoman" + randomNumber + file.md5 + ext
                const allowedType = ['.rtf', '.doc', '.docx', '.pdf', '.xlsx', '.xls', '.pdf', '.pptx']
                if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "lampiran materi yang anda upload tidak valid" })
                if (fileSize > 500000000) return res.status(422).json({ msg: "lampiran pedoman  yang anda upload tidak boleh lebih dari 500 mb" })
                const filepath = `../tmp_siakad/lampiranPedoman/${pedomanUse.file_pedoman}`
                fs.unlinkSync(filepath)
                file.mv(`../tmp_siakad/lampiranPedoman/${file_pedoman}`, (err) => {
                    if (err) return res.status(500).json({ message: err.message })
                })
            }
        } else {
            file_pedoman = pedomanUse.file_pedoman
        }
        await pedomanModel.update({
            judul_pedoman: judul_pedoman,
            deskripsi: deskripsi,
            file_pedoman: file_pedoman,
            tanggal_terbit: tanggal_terbit,
            level: level,
            status: "aktif"
        }, {
            where: {
                id_pedoman: id
            }
        }).then(result => {
            res.status(201).json({
                message: "Data pedoman Diupdate",
            })
        }).catch(err => {
            console.log(err)
        })
    },

    delete: async (req, res, next) => {
        const id = req.params.id
        const pedomanUse = await pedomanModel.findOne({
            where: {
                id_pedoman: id
            }
        })
        if (!pedomanUse) return res.status(500).json({ message: "data tidak ditemukan" })
        await pedomanModel.update({
            status: "tidak"
        }, {
            where: {
                id_pedoman: id
            }
        }).then(result => {
            res.status(201).json({
                message: "Data pedoman Dihapus",
            })
        }).catch(err => {
            console.log(err)
        })
    }
}