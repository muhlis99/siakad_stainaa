const dosenModel = require('../models/dosenModel.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const prodiModel = require('../models/prodiModel.js')
const fakultasModel = require('../models/fakultasModel.js')
const tahunAjaranModel = require('../models/tahunAjaranModel.js')
const semesterModel = require('../models/semesterModel.js')
const rpsModel = require('../models/rpsModel.js')
const sebaranMataKuliah = require('../models/sebaranMataKuliah.js')
const jadwalKuliahModel = require('../models/jadwalKuliahModel.js')
const { Op } = require('sequelize')
const path = require('path')
const fs = require('fs')

module.exports = {
    getAll: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = (currentPage - 1) * perPage
        const codeDosen = req.params.codeDosen
        const totalPage = await rpsModel.count({
            where: {
                [Op.or]: [
                    {
                        id_rps: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_rps: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_fakultas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_prodi: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: "aktif",
                code_dosen : codeDosen
            }
        })
        const totalItems = Math.ceil(totalPage / perPage)
        await rpsModel.findAll({
            include: [{
                model: jenjangPendidikanModel,
                where: { status: "aktif" }
            },{
                model: fakultasModel,
                where: { status: "aktif" }
            },{
                model: prodiModel,
                where: { status: "aktif" }
            },{
                model: tahunAjaranModel,
                where: { status: "aktif" }
            },{
                model: semesterModel,
                where: { status: "aktif" }
            }, {
                model : mataKuliahModel,
                attributes : ["code_mata_kuliah","nama_mata_kuliah"]
            }],
            where: {
                [Op.or]: [
                    {
                        id_rps: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_rps: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_fakultas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_prodi: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: "aktif",
                code_dosen : codeDosen
            },
            offset: offset,
            limit: perPage,
            order: [
                ["id_rps", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All rps Success",
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
    
    getMakulByDosen: async (req, res, next) => {
        const { nipy, thn, smt, jnj, fks, prd } = req.params
        await jadwalKuliahModel.findAll({
            include: [
                {
                    attributes: ["id_sebaran", "code_sebaran", "status_makul", "status_bobot_makul"],
                    model: sebaranMataKuliah,
                    where: {
                        code_tahun_ajaran: thn,
                        code_semester: smt,
                        status: "aktif"
                    },
                    include: [{
                        attributes: ["id_mata_kuliah", "nama_mata_kuliah", "jenis_mata_kuliah", "sks"],
                        model: mataKuliahModel
                    }]
                },
                {
                    attributes: ['nama'],
                    model: dosenModel,
                    as: "dosenPengajar"
                }
            ],
            where: {
                dosen_pengajar: nipy,
                code_tahun_ajaran: thn,
                code_semester: smt,
                code_jenjang_pendidikan: jnj,
                code_fakultas: fks,
                code_prodi: prd,
                status: "aktif"
            }
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data mata kuliah yang diampu Tidak Ditemukan",
                        data: []
                    })
                }
                res.status(201).json({
                    message: "Data mata kuliah yang diampu Ditemukan",
                    data: result
                })
            }).
            catch(err => {
                next(err)
            })
    },

    post: async (req, res, next) => {
        // const date = new Date().toLocaleDateString('en-CA')
        const { codeThn, codeSmt, codeJnj, codeFks, codePrd,
            nipy,codeMakul, deskripsi,tanggal } = req.body
        let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)

        let file_rps = ""
        const files = req.files
        if (files == null) {
            file_rps = ""
        } else {
            const file = files.file_rps
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            file_rps = "lampiran_rps" + randomNumber + file.md5 + ext
            const allowedType = ['.rtf', '.doc', '.docx', '.pdf', '.xlsx', '.xls', '.pdf', '.pptx']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "lampiran rps yang anda upload tidak valid" })
            if (fileSize > 500000000) return res.status(422).json({ msg: "lampiran rps  yang anda upload tidak boleh lebih dari 500 mb" })
            file.mv(`../tmp_siakad/lampiranRps/${file_rps}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        }

        await rpsModel.create({
            code_jurnal_dosen: randomNumber,
            rps : file_rps,
            code_mata_kuliah: codeMakul,
            code_tahun_ajaran: codeThn,
            code_semester: codeSmt,
            code_jenjang_pendidikan: codeJnj,
            code_fakultas: codeFks,
            code_prodi: codePrd,
            code_dosen: nipy,
            tanggal: tanggal,
            deskripsi: deskripsi,
            status: "aktif",
        }).
            then(result => {
                res.status(201).json({
                    message: "Data RPS success Ditambahkan",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    put: async (req, res, next) => {
        const id = req.params.id
        const rpsUse = await rpsModel.findOne({
            where: {
                id_rps: id
            }
        })
        if (!rpsUse) return res.status(500).json({ message: "data tidak ditemukan" })
        const { deskripsi, tanggal } = req.body

        let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)
        let file_rps = ""
        if (req.files != null) {
            if (rpsUse.file_rps === "") {
                const file = req.files.file_rps
                const fileSize = file.data.length
                const ext = path.extname(file.name)
                file_rps = "lampiran_rps" + randomNumber + file.md5 + ext
                const allowedType = ['.rtf', '.doc', '.docx', '.pdf', '.xlsx', '.xls', '.pdf', '.pptx']
                if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "lampiran RPS yang anda upload tidak valid" })
                if (fileSize > 500000000) return res.status(422).json({ msg: "lampiran RPS  yang anda upload tidak boleh lebih dari 500 mb" })
                file.mv(`../tmp_siakad/lampiranRps/${file_rps}`, (err) => {
                    if (err) return res.status(500).json({ message: err.message })
                })
            } else {
                const file = req.files.file_rps
                const fileSize = file.data.length
                const ext = path.extname(file.name)
                file_rps = "lampiran_rps" + randomNumber + file.md5 + ext
                const allowedType = ['.rtf', '.doc', '.docx', '.pdf', '.xlsx', '.xls', '.pdf', '.pptx']
                if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "lampiran RPS yang anda upload tidak valid" })
                if (fileSize > 500000000) return res.status(422).json({ msg: "lampiran RPS  yang anda upload tidak boleh lebih dari 500 mb" })
                const filepath = `../tmp_siakad/lampiranRps/${rpsUse.rps}`
                fs.unlinkSync(filepath)
                file.mv(`../tmp_siakad/lampiranRps/${file_rps}`, (err) => {
                    if (err) return res.status(500).json({ message: err.message })
                })
            }
        } else {
            file_rps = rpsUse.file_rps
        }
        await rpsModel.update({
            deskripsi: deskripsi,
            rps: file_rps,
            tanggal: tanggal,
        }, {
            where: {
                id_rps: id
            }
        }).then(result => {
            res.status(201).json({
                message: "Data rps Diupdate",
            })
        }).catch(err => {
            console.log(err)
        })
    },

    delete: async (req, res, next) => {
        const id = req.params.id
        const rpsUse = await rpsModel.findOne({
            where: {
                id_rps: id,
                status: "aktif"
            }
        })
        if (!rpsUse) return res.status(401).json({ message: "Data RPS tidak ditemukan" })
        await rpsModel.update({
            status: "tidak",
        }, {
            where: {
                id_rps: id,
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "data RPS succes dihapus"
                })
            }).
            catch(err => {
                next(err)
            })
    },

    // MAHASISWA
    getMakul: async (req, res, next) => {
        const {thn, smt, jnj, fks, prd } = req.params
        await jadwalKuliahModel.findAll({
            include: [
                {
                    attributes: ["id_sebaran", "code_sebaran", "status_makul", "status_bobot_makul"],
                    model: sebaranMataKuliah,
                    where: {
                        code_tahun_ajaran: thn,
                        code_semester: smt,
                        status: "aktif"
                    },
                    include: [{
                        attributes: ["id_mata_kuliah", "nama_mata_kuliah", "jenis_mata_kuliah", "sks"],
                        model: mataKuliahModel
                    }]
                },
                {
                    attributes: ['nama'],
                    model: dosenModel,
                    as: "dosenPengajar"
                }
            ],
            where: {
                // dosen_pengajar: nipy,
                code_tahun_ajaran: thn,
                code_semester: smt,
                code_jenjang_pendidikan: jnj,
                code_fakultas: fks,
                code_prodi: prd,
                status: "aktif"
            }
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data mata kuliah yang diampu Tidak Ditemukan",
                        data: []
                    })
                }
                res.status(201).json({
                    message: "Data mata kuliah yang diampu Ditemukan",
                    data: result
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getbyId : async (req, res, next) => {
        const id = req.params.id
        const rpsUse = await rpsModel.findOne({
            include: [{
                model: jenjangPendidikanModel,
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                where: { status: "aktif" }
            }, {
                model : mataKuliahModel,
                attributes : ["code_mata_kuliah","nama_mata_kuliah"]
            }],
            where: {
                id_rps: id,
                status: "aktif"
            }
        }).
        then(result => {
            if (!result) {
                return res.status(404).json({
                    message: "Data RPS Tidak Ditemukan",
                    data: []
                })
            }
            res.status(201).json({
                message: "Data RPS Ditemukan",
                data: result
            })
        }).
        catch(err => {
            next(err)
        })
    }
}