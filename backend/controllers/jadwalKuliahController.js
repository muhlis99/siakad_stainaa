// controller jadwal kuliah disatukan dengan
// jadwal kuliah mingguan karena menyesuaikan dengan
// front end

const { Op } = require("sequelize")
const jadwalKuliahModel = require('../models/jadwalKuliahModel.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const prodiModel = require('../models/prodiModel.js')
const semesterModel = require('../models/semesterModel.js')
const tahunAjaranModel = require('../models/tahunAjaranModel.js')
const kelasModel = require('../models/kelasKuliahModel.js')
const jadwalKuliahMingguanModel = require("../models/jadwalKuliahMingguan.js")


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
        const jadwalKuliah = await jadwalKuliahModel.create({
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
        })
        if (jadwalKuliah) {
            const { dataMingguan } = req.body
            const lastCodeMakul = jadwalKuliah.lastCode
            const data_body = dataMingguan.map(record => {
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
                let datas = {
                    code_jadwal_kuliah_mingguan: randomAngka(3) + randomNumber,
                    code_jadwal_kuliah: lastCodeMakul,
                    hari: record.hari,
                    jam_mulai: record.jam_mulai,
                    jam_selesai: record.jam_selesai,
                    metode_pembelajaran: record.metode_pembelajaran,
                    ruang: record.ruang,
                    status: "aktif",
                }
                return datas
            })

            await jadwalKuliahMingguanModel.bulkCreate(data_body).
                then(result => {
                    res.status(201).json({
                        message: "Data jadwal kuliah success Ditambahkan",
                    })
                }).
                catch(err => {
                    next(err)
                })
        }

    },

    put: async (req, res, next) => {
        const id = req.params.id
        const { code_mata_kuliah, code_prodi, code_semester, code_tahun_ajaran,
            code_kelas, kapasitas, tanggal_mulai, tanggal_selesai, jumlah_pertemuan } = req.body
        const jadwalKuliahModelUse = await jadwalKuliahModel.findOne({
            include: [
                {
                    model: mataKuliahModel,
                    where: { status: "aktif" }
                },
                {
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
        const jadwalKuliah = await jadwalKuliahModel.update({
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
        })
        if (jadwalKuliah) {
            const { dataMingguan } = req.body
            const codeJadwalKuliah = jadwalKuliahModelUse.code_jadwal_kuliah
            const entryCodeJakulMingguan = await jadwalKuliahMingguanModel.findAll({
                attributes: ['id_jadwal_kuliah_mingguan'],
                where: {
                    code_jadwal_kuliah: codeJadwalKuliah
                }
            })
            const data_body = dataMingguan.map(record => {
                let datas = {
                    hari: record.hari,
                    jam_mulai: record.jam_mulai,
                    jam_selesai: record.jam_selesai,
                    metode_pembelajaran: record.metode_pembelajaran,
                    ruang: record.ruang,
                    status: "aktif",
                }
                return datas
            })

            //  belum selesai
            dataMingguan.forEach(element => {
                jadwalKuliahMingguanModel.update(element, {
                    where: {
                        id_jadwal_kuliah_mingguan: 1
                    }
                })
            });


        }
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
        const jadwalKuliah = await jadwalKuliahModel.update({
            status: "tidak"
        }, {
            where: {
                id_jadwal_kuliah: id
            }
        })
        if (jadwalKuliah) {
            const codeJadwalKuliah = jadwalKuliahModelUse.code_jadwal_kuliah
            const entryCodeJakulMingguan = await jadwalKuliahMingguanModel.findAll({
                attributes: ['id_jadwal_kuliah_mingguan'],
                where: {
                    code_jadwal_kuliah: codeJadwalKuliah
                }
            })
            const idJadwalKuliahMingguan = entryCodeJakulMingguan.map(result => {
                return result.id_jadwal_kuliah_mingguan
            })

            await jadwalKuliahMingguanModel.update({ status: "tidak" }, {
                where: {
                    id_jadwal_kuliah_mingguan: idJadwalKuliahMingguan
                }
            }).then(result => {
                res.status(201).json({
                    message: "Data jadwal kuliah success Dihapus",
                })
            }).
                catch(err => {
                    next(err)
                })
        }
    }
}