const tugasModel = require('../models/tugasModel.js')
const dosenModel = require('../models/dosenModel.js')
const jadwalKuliahModel = require('../models/jadwalKuliahModel.js')
const jadwalPertemuanModel = require('../models/jadwalPertemuanModel.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const { Sequelize, Op, literal, QueryTypes } = require('sequelize')
const path = require('path')
const fs = require('fs')
const sebaranMataKuliah = require('../models/sebaranMataKuliah.js')
const historyMahasiswa = require('../models/historyMahasiswaModel.js')
const krsModel = require('../models/krsModel.js')
const detailTugasModel = require('../models/detailTugasModel.js')
const mahasiswaModel = require('../models/mahasiswaModel.js')
const db = require('../config/database.js')


module.exports = {
    // mahasiswa
    getByCodeTugas: async (req, res, next) => {
        const code = req.params.code
        await detailTugasModel.findAll({
            where: {
                code_tugas: code
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data Tugas Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data Tugas Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getById: async (req, res, next) => {
        const id = req.params.id
        await detailTugasModel.findOne({
            where: {
                id_detail_tugas: id
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data Tugas Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data Tugas Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    post: async (req, res, next) => {
        const { code_tugas, nim, jawaban } = req.body
        const date = new Date().toLocaleDateString('en-CA')
        let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)
        let file_jawaban = ""
        const file = req.files.file_jawaban
        const fileSize = file.data.length
        const ext = path.extname(file.name)
        file_jawaban = "lampiran_jawaban" + randomNumber + file.md5 + ext
        const allowedType = ['.rtf', '.doc', '.docx', '.pdf', '.xlsx', '.xls', '.pdf', '.pptx']
        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "lampiran materi yang anda upload tidak valid" })
        if (fileSize > 500000000) return res.status(422).json({ msg: "lampiran jawaban  yang anda upload tidak boleh lebih dari 500 mb" })
        file.mv(`../tmp_siakad/lampiranJawaban/${file_jawaban}`, (err) => {
            if (err) return res.status(500).json({ message: err.message })
        })

        await detailTugasModel.create({
            code_detail_tugas: randomNumber,
            code_tugas: code_tugas,
            nim: nim,
            jawaban: jawaban,
            file_jawaban: file_jawaban,
            tanggal_pengumpulan: date,
            status: "terkumpul"
        }).then(result => {
            res.status(201).json({
                message: "Data Tugas Ditambahkan",
            })
        }).catch(err => {
            console.log(err)
        })
    },

    put: async (req, res, next) => {
        const date = new Date().toLocaleDateString('en-CA')
        const id = req.params.id
        const detailtugasUse = await detailTugasModel.findOne({
            where: {
                id_detail_tugas: id
            }
        })
        if (!detailtugasUse) return res.status(500).json({ message: "data tidak ditemukan" })
        const { code_tugas, nim, jawaban } = req.body

        let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)
        let file_jawaban = ""
        if (req.files != null) {
            if (detailtugasUse.file_jawaban === "") {
                const file = req.files.file_jawaban
                const fileSize = file.data.length
                const ext = path.extname(file.name)
                file_jawaban = "lampiran_jawaban" + randomNumber + file.md5 + ext
                const allowedType = ['.rtf', '.doc', '.docx', '.pdf', '.xlsx', '.xls', '.pdf', '.pptx']
                if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "lampiran materi yang anda upload tidak valid" })
                if (fileSize > 500000000) return res.status(422).json({ msg: "lampiran jawaban  yang anda upload tidak boleh lebih dari 500 mb" })
                file.mv(`../tmp_siakad/lampiranJawaban/${file_jawaban}`, (err) => {
                    if (err) return res.status(500).json({ message: err.message })
                })
            } else {
                const file = req.files.file_jawaban
                const fileSize = file.data.length
                const ext = path.extname(file.name)
                file_jawaban = "lampiran_jawaban" + randomNumber + file.md5 + ext
                const allowedType = ['.rtf', '.doc', '.docx', '.pdf', '.xlsx', '.xls', '.pdf', '.pptx']
                if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "lampiran materi yang anda upload tidak valid" })
                if (fileSize > 500000000) return res.status(422).json({ msg: "lampiran jawaban  yang anda upload tidak boleh lebih dari 500 mb" })
                const filepath = `../tmp_siakad/lampiranJawaban/${detailtugasUse.file_jawaban}`
                fs.unlinkSync(filepath)
                file.mv(`../tmp_siakad/lampiranJawaban/${file_jawaban}`, (err) => {
                    if (err) return res.status(500).json({ message: err.message })
                })
            }
        } else {
            file_jawaban = detailtugasUse.file_jawaban
        }
        await detailTugasModel.update({
            jawaban: jawaban,
            file_jawaban: file_jawaban,
            tanggal_pengumpulan: date,
        }, {
            where: {
                id_detail_tugas: id
            }
        }).then(result => {
            res.status(201).json({
                message: "Data Tugas Diupdate",
            })
        }).catch(err => {
            console.log(err)
        })
    },

    delete: async (req, res, next) => {
        const id = req.params.id
        const detailtugasUse = await detailTugasModel.findOne({
            where: {
                id_detail_tugas: id
            }
        })
        if (!detailtugasUse) return res.status(500).json({ message: "data tidak ditemukan" })
        const filepath = `../tmp_siakad/lampiranJawaban/${detailtugasUse.file_jawaban}`
        fs.unlinkSync(filepath)
        await detailTugasModel.destroy({
            where: {
                id_detail_tugas: id
            }
        }).then(result => {
            res.status(201).json({
                message: "Data Tugas Dihapus",
            })
        }).catch(err => {
            console.log(err)
        })
    },

    // dosen
    getAlldosen: async (req, res, next) => {
        const { nipy, thnAjr, smt, jnjPen, fks, prd, codejadper } = req.params
        const dataDosen = await dosenModel.findOne({
            where: {
                nip_ynaa: nipy,
                status: "aktif"
            }
        })
        if (!dataDosen) return res.status(404).json({ message: "dosen tidak ditemukan" })
        const jadwalPertemuan = await jadwalPertemuanModel.findOne({
            where: {
                code_jadwal_pertemuan: codejadper,
                status: "aktif"
            }
        })
        const jadwalKuliah = await jadwalKuliahModel.findOne({
            dosen_pengajar: nipy,
            code_tahun_ajaran: thnAjr,
            code_semester: smt,
            code_jenjang_pendidikan: jnjPen,
            code_fakultas: fks,
            code_prodi: prd,
            code_jadwal_kuliah: jadwalPertemuan.code_jadwal_kuliah,
            status: "aktif"
        })


        await db.query(`SELECT tb_mahasiswa.nama,tb_krs.code_mata_kuliah,case when (tb_krs.nim = tb_detail_tugas.nim) then "ya" else "tidak" END as checkdatatugas FROM tb_detail_tugas, tb_krs 
            INNER JOIN tb_mahasiswa ON tb_mahasiswa.nim = tb_krs.nim 
            WHERE tb_krs.code_mata_kuliah="${jadwalKuliah.code_mata_kuliah}" AND tb_krs.code_jenjang_pendidikan="${jnjPen}"
            AND tb_krs.code_fakultas="${fks}" AND tb_krs.code_prodi="${prd}" AND tb_krs.code_tahun_ajaran="${thnAjr}"
            AND tb_krs.code_semester="${smt}"`, {
            nest: true,
            type: QueryTypes.SELECT
        })
            .then(async result => {
                res.status(201).json({
                    message: "Data mahasiswa tugas ",
                    data: result
                })
            }).catch(err => {
                console.log(err)
            })
    }
}