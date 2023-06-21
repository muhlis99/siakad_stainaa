const { Op } = require("sequelize")
const jadwalKuliahModel = require('../models/jadwalKuliahModel.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const prodiModel = require('../models/prodiModel.js')
const semesterModel = require('../models/semesterModel.js')
const tahunAjaranModel = require('../models/tahunAjaranModel.js')
const kelasModel = require('../models/kelasModel.js')


module.exports = {
    get: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        let totalItems
        await jadwalKuliahModel.findAndCountAll({
            include: [{
                model: mataKuliahModel,
                where: { status: "aktif" }
            }, {
                model: semesterModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: kelasModel,
                where: { status: "aktif" }
            }],
            where: {
                [Op.or]: [
                    {
                        id_jadwal_kuliah: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_jadwal_kuliah: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        kapasitas: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: "aktif"
            }
        }).
            then(all => {
                totalItems = all.count
                return jadwalKuliahModel.findAll({
                    include: [{
                        model: mataKuliahModel,
                        where: { status: "aktif" }
                    }, {
                        model: semesterModel,
                        where: { status: "aktif" }
                    }, {
                        model: prodiModel,
                        where: { status: "aktif" }
                    }, {
                        model: tahunAjaranModel,
                        where: { status: "aktif" }
                    }, {
                        model: kelasModel,
                        where: { status: "aktif" }
                    }],
                    where: {
                        [Op.or]: [
                            {
                                id_jadwal_kuliah: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                code_jadwal_kuliah: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                kapasitas: {
                                    [Op.like]: `%${search}%`
                                }
                            }
                        ],
                        status: "aktif"
                    },
                    offset: (currentPage - 1) * perPage,
                    limit: perPage,
                    order: [
                        ["id_jadwal_kuliah", "DESC"]
                    ]
                })
            }).
            then(result => {
                const totalPage = Math.ceil(totalItems / perPage)
                res.status(200).json({
                    message: "Get All jadwal kuliah Success",
                    data: result,
                    total_data: totalItems,
                    per_page: perPage,
                    current_page: currentPage,
                    total_page: totalPage
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getById: async (req, res, next) => {
        const id = req.params.id
        await jadwalKuliahModel.findOne({
            include: [{
                model: mataKuliahModel,
                where: { status: "aktif" }
            }, {
                model: semesterModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: kelasModel,
                where: { status: "aktif" }
            }],
            where: {
                id_jadwal_kuliah: id,
                status: "aktif"
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data jadwal Kuliah Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data jadwal Kuliah Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    post: async (req, res, next) => {
        const { code_mata_kuliah, code_prodi, code_semester, code_tahun_ajaran,
            code_kelas, kapasitas, tanggal_mulai, tanggal_selesai, jumlah_pertemuan } = req.body
        function randomAngka(params) {
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var charLength = chars.length;
            var result = ''
            for (var i = 0; i < params; i++) {
                result += chars.charAt(Math.floor(Math.random() * charLength))
            }
            return result
        }
        let randomNumber = Math.floor(10000 + Math.random() * 90000)
        const codeJadwalKuliah = randomAngka(2) + randomNumber
        const duplicateData = await jadwalKuliahModel.findOne({
            include: [{
                model: mataKuliahModel,
                where: { status: "aktif" }
            }, {
                model: semesterModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: kelasModel,
                where: { status: "aktif" }
            }],
            where: {
                code_jadwal_kuliah: codeJadwalKuliah
            }
        })
        if (duplicateData) return res.status(401).json({ message: "Data jadwal kuliah sudah ada" })
        await jadwalKuliahModel.create({
            code_jadwal_kuliah: codeJadwalKuliah,
            code_mata_kuliah: code_mata_kuliah,
            code_prodi: code_prodi,
            code_semester: code_semester,
            code_tahun_ajaran: code_tahun_ajaran,
            code_kelas: code_kelas,
            kapasitas: kapasitas,
            tanggal_mulai: tanggal_mulai,
            tanggal_selesai: tanggal_selesai,
            jumlah_pertemuan: jumlah_pertemuan,
            status: "aktif"
        }).
            then(result => {
                res.status(201).json({
                    message: "Data jadwal kuliah  success Ditambahkan",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    put: async (req, res, next) => {
        const id = req.params.id
        const { code_mata_kuliah, code_prodi, code_semester, code_tahun_ajaran,
            code_kelas, kapasitas, tanggal_mulai, tanggal_selesai, jumlah_pertemuan } = req.body
        const jadwalKuliahModelUse = await jadwalKuliahModel.findOne({
            include: [{
                model: mataKuliahModel,
                where: { status: "aktif" }
            }, {
                model: semesterModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: kelasModel,
                where: { status: "aktif" }
            }],
            where: {
                id_jadwal_kuliah: id,
                status: "aktif"
            }
        })
        if (!jadwalKuliahModelUse) return res.status(401).json({ message: "Data jadwal kuliah tidak ditemukan" })
        // const duplicateData = await jadwalKuliahModel.findOne({
        //     where: {
        //         code_jadwal_kuliah: jadwalKuliahModelUse.code_jadwal_kuliah
        //     }
        // })
        // if (duplicateData) return res.status(401).json({ message: "Data jadwal kuliah sudah ada" })
        await jadwalKuliahModel.update({
            code_mata_kuliah: code_mata_kuliah,
            code_prodi: code_prodi,
            code_semester: code_semester,
            code_tahun_ajaran: code_tahun_ajaran,
            code_kelas: code_kelas,
            kapasitas: kapasitas,
            tanggal_mulai: tanggal_mulai,
            tanggal_selesai: tanggal_selesai,
            jumlah_pertemuan: jumlah_pertemuan,
            status: "aktif"
        }, {
            where: {
                id_jadwal_kuliah: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data jadwal kuliah success diupdate"
                })
            }).
            catch(err => {
                next(err)
            })
    },

    deleteStatus: async (req, res, next) => {
        const id = req.params.id
        const jadwalKuliahModelUse = await jadwalKuliahModel.findOne({
            include: [{
                model: mataKuliahModel,
                where: { status: "aktif" }
            }, {
                model: semesterModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: kelasModel,
                where: { status: "aktif" }
            }],
            where: {
                id_jadwal_kuliah: id,
                status: "aktif"
            }
        })
        if (!jadwalKuliahModelUse) return res.status(401).json({ message: "Data jadwal kuliah tidak ditemukan" })
        await jadwalKuliahModel.update({
            status: "tidak"
        }, {
            where: {
                id_jadwal_kuliah: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "data jadwal kuliah succes dihapus"
                })
            }).
            catch(err => {
                next(err)
            })
    }
}