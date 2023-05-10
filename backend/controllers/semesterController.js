const semesterModel = require('../models/semesterModel.js')
const tahunAjaran = require('../models/tahunAjaranModel.js')
const { Op } = require('sequelize')

module.exports = {
    getAll: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = (currentPage - 1) * perPage
        const totalPage = await semesterModel.count({
            include: [{
                model: tahunAjaran,
                where: { status: "aktif" }
            }],
            where: {
                [Op.or]: [
                    {
                        id_semester: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_semester: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_tahun_ajaran: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        semester: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        keterangan: {
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
        await semesterModel.findAll({
            include: [{
                model: tahunAjaran,
                where: { status: "aktif" }
            }],
            where: {
                [Op.or]: [
                    {
                        id_semester: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_semester: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_tahun_ajaran: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        semester: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        keterangan: {
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
                ["id_semester", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All Semester Success",
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
        await semesterModel.findOne({
            include: [{
                model: tahunAjaran,
                where: { status: "aktif" }
            }],
            where: {
                id_semester: id,
                status: "aktif"
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data Semester Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data Semester Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    post: async (req, res, next) => {
        const { code_tahun_ajaran, semester, tanggal_aktif, keterangan } = req.body
        const tahunAjaranUse = await tahunAjaran.findOne({
            where: {
                code_tahun_ajaran: code_tahun_ajaran
            }
        })
        const codeSemester = tahunAjaranUse.code_tahun_ajaran + semester
        // const tglAktif = date.format((new Date(tanggal_aktif)), 'YYYY-MM-DD')
        await semesterModel.create({
            code_semester: codeSemester,
            code_tahun_ajaran: code_tahun_ajaran,
            semester: semester,
            tanggal_aktif: tanggal_aktif,
            tanggal_non_aktif: "",
            keterangan: keterangan,
            status: "aktif",
        }).
            then(result => {
                res.status(201).json({
                    message: "Data semester success Ditambahkan",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    put: async (req, res, next) => {
        const id = req.params.id
        const { code_tahun_ajaran, semester, tanggal_aktif, keterangan } = req.body
        const semesterModelUse = await semesterModel.findOne({
            where: {
                id_semester: id,
                status: "aktif"
            }
        })
        if (!semesterModelUse) return res.status(401).json({ message: "Data semester tidak ditemukan" })
        const tahunAjaranUse = await tahunAjaran.findOne({
            where: {
                code_tahun_ajaran: code_tahun_ajaran
            }
        })
        const codeSemester = tahunAjaranUse.code_tahun_ajaran + semester
        // const tglAktif = date.format((new Date(tanggal_aktif)), 'YYYY-MM-DD')
        await semesterModel.update({
            code_semester: codeSemester,
            code_tahun_ajaran: code_tahun_ajaran,
            semester: semester,
            tanggal_aktif: tanggal_aktif,
            tanggal_non_aktif: "",
            keterangan: keterangan,
            status: "aktif",
        }, {
            where: {
                id_semester: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data semester success Diupdate",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    delete: async (req, res, next) => {
        const id = req.params.id
        const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        const semesterModelUse = await semesterModel.findOne({
            where: {
                id_semester: id,
                status: "aktif"
            }
        })
        if (!semesterModelUse) return res.status(401).json({ message: "Data Semester tidak ditemukan" })
        await semesterModel.update({
            status: "tidak",
            tanggal_non_aktif: date
        }, {
            where: {
                id_semester: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "data semester succes dihapus"
                })
            }).
            catch(err => {
                next(err)
            })
    }
}