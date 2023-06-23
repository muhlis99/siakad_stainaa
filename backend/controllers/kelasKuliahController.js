const kelasModel = require('../models/kelasKuliahModel.js')
const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const fakultasModel = require('../models/fakultasModel.js')
const prodiModel = require('../models/prodiModel.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const historyMahasiswaModel = require('../models/historyMahasiswaModel.js')
const krsModel = require('../models/krsModel.js')
const { Op } = require('sequelize')

module.exports = {
    getAll: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = (currentPage - 1) * perPage
        const totalPage = await kelasModel.count({
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
                [Op.or]: [
                    {
                        id_kelas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_kelas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nama_kelas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_jenjang_pendidikan: {
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
                    },
                    {
                        status: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: "aktif"
            }
        })
        const totalItems = Math.ceil(totalPage / perPage)
        await kelasModel.findAll({
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
                [Op.or]: [
                    {
                        id_kelas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_kelas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nama_kelas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_jenjang_pendidikan: {
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
                    },
                    {
                        status: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: "aktif"
            },
            offset: offset,
            limit: perPage,
            order: [
                ["id_kelas", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All kelas Success",
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
        await kelasModel.findOne({
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
                id_kelas: id,
                status: "aktif"
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data kelas Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data kelas Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },
    //  jumlah mhs semester
    jumlahMhs: async (req, res, next) => {
        const { smt, jnjPen, fkts, prd } = req.params
        await historyMahasiswaModel.findAndCountAll(
            {
                where: {
                    code_jenjang_pendidikan: jnjPen,
                    code_fakultas: fkts,
                    code_prodi: prd,
                    code_semester: smt,
                    status: "aktif"
                }
            }
        ).then(all => {
            res.status(201).json({
                message: "Data jumlah mahasiswa success Ditambahkan",
                data: all.count
            })
        }).catch(err => {
            next(err)
        })
    },


    //  ploting kelas
    post: async (req, res, next) => {
        const { code_jenjang_pendidikan, code_fakultas,
            code_prodi, code_semester, code_tahun_ajaran,
            nama_kelas, kapasitas } = req.body
        const makul = await mataKuliahModel.findAll({
            attributes: ['code_mata_kuliah'],
            where: {
                code_semester: code_semester,
                status_makul: "paket"
            }
        })

        makul.map(M => {
            const Mkul = M.code_mata_kuliah
            const MM = nama_kelas.map(K => {
                let D = {
                    code_mata_kuliah: Mkul,
                    nama_kelas: K
                }
                return D
            })
            kelasModel.bulkCreate(MM)
        })

    },

    put: async (req, res, next) => {
        const id = req.params.id
        const kelasUseOne = await kelasModel.findOne({
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
                id_kelas: id,
                status: "aktif"
            }
        })
        if (!kelasUseOne) return res.status(401).json({ message: "data kelas tidak ditemukan" })
        const { nama_kelas, identy_kelas, code_jenjang_pendidikan, code_fakultas, code_prodi } = req.body
        const namaKelas = nama_kelas + identy_kelas
        const codeKelas = code_prodi + identy_kelas.replace(/ /g, '')
        const kelasUse = await kelasModel.findOne({
            where: {
                code_kelas: codeKelas,
                nama_kelas: namaKelas,
            }
        })
        if (kelasUse) return res.status(401).json({ message: "data kelas sudah ada" })
        await kelasModel.update({
            code_kelas: codeKelas,
            nama_kelas: namaKelas,
            code_jenjang_pendidikan: code_jenjang_pendidikan,
            code_fakultas: code_fakultas,
            code_prodi: code_prodi,
        }, {
            where: {
                id_kelas: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data kelas success Diupdate",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    delete: async (req, res, next) => {
        const id = req.params.id
        const kelasModelUse = await kelasModel.findOne({
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
                id_kelas: id,
                status: "aktif"
            }
        })
        if (!kelasModelUse) return res.status(401).json({ message: "Data kelas tidak ditemukan" })
        await kelasModel.update({
            status: "tidak",
        }, {
            where: {
                id_kelas: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "data kelas succes dihapus"
                })
            }).
            catch(err => {
                next(err)
            })
    }
}