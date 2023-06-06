const plotingKelasModel = require('../models/plotingKelasModel.js')
const kelasModel = require('../models/kelasModel.js')
const ruangModel = require('../models/ruangModel.js')
const mahasiswaModel = require('../models/mahasiswaModel.js')
const { Op } = require('sequelize')

module.exports = {
    getAll: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = (currentPage - 1) * perPage
        const totalPage = await plotingKelasModel.count({
            include: [{
                model: mahasiswaModel,
                attributes: ['id_mahasiswa', 'nim', 'no_kk', 'nik', 'nisn', 'nama', 'status'],
                where: { status: "aktif" }
            },
            {
                model: ruangModel,
                attributes: ['id_ruang', 'code_ruang', 'nama_ruang', 'code_prodi',],
                where: { status: "aktif" }
            }, {
                model: kelasModel,
                attributes: ['id_kelas', 'code_kelas', 'nama_kelas', 'code_prodi',],
                where: { status: "aktif" }
            }],
            where: {
                [Op.or]: [
                    {
                        id_ploting_kelas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_ploting_kelas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nim: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_kelas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_ruang: {
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
        await plotingKelasModel.findAll({
            include: [{
                model: mahasiswaModel,
                attributes: ['id_mahasiswa', 'nim', 'no_kk', 'nik', 'nisn', 'nama', 'status'],
                where: { status: "aktif" }
            },
            {
                model: ruangModel,
                attributes: ['id_ruang', 'code_ruang', 'nama_ruang', 'code_prodi',],
                where: { status: "aktif" }
            }, {
                model: kelasModel,
                attributes: ['id_kelas', 'code_kelas', 'nama_kelas', 'code_prodi',],
                where: { status: "aktif" }
            }],
            where: {
                [Op.or]: [
                    {
                        id_ploting_kelas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_ploting_kelas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nim: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_kelas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_ruang: {
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
                ["id_ploting_kelas", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All ploting Kelas Success",
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
        await plotingKelasModel.findOne({
            include: [{
                model: mahasiswaModel,
                attributes: ['id_mahasiswa', 'nim', 'no_kk', 'nik', 'nisn', 'nama', 'status'],
                where: { status: "aktif" }
            },
            {
                model: ruangModel,
                attributes: ['id_ruang', 'code_ruang', 'nama_ruang', 'code_prodi',],
                where: { status: "aktif" }
            }, {
                model: kelasModel,
                attributes: ['id_kelas', 'code_kelas', 'nama_kelas', 'code_prodi',],
                where: { status: "aktif" }
            }],
            where: {
                id_ploting_Kelas: id,
                status: "aktif"
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data ploting Kelas Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data ploting Kelas Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    post: async (req, res, next) => {
        const data = req.body
        const dataDuplicate = data.map(y => {
            return y.nim.substr(6, 10) + y.code_kelas
        })
        console.log(dataDuplicate)
        const plotingKelasUse = await plotingKelasModel.findOne({
            where: {
                code_ploting_kelas: dataDuplicate
            },
        })
        if (plotingKelasUse) return res.status(401).json({ message: "data ploting Kelas sudah ada" })
        const data_body = data.map(record => {
            let datas = {
                code_ploting_kelas: record.nim.substr(6, 10) + record.code_kelas,
                nim: record.nim,
                code_kelas: record.code_kelas,
                code_ruang: record.code_ruang,
                status: "aktif",
            }
            return datas
        })
        await plotingKelasModel.bulkCreate(data_body).
            then(result => {
                res.status(201).json({
                    message: "Data ploting Kelas success Ditambahkan",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    put: async (req, res, next) => {
        const id = req.params.id
        const plotingKelasUseOne = await plotingKelasModel.findOne({
            include: [{
                model: mahasiswaModel,
                attributes: ['id_mahasiswa', 'nim', 'no_kk', 'nik', 'nisn', 'nama', 'status'],
                where: { status: "aktif" }
            },
            {
                model: ruangModel,
                attributes: ['id_ruang', 'code_ruang', 'nama_ruang', 'code_prodi',],
                where: { status: "aktif" }
            }, {
                model: kelasModel,
                attributes: ['id_kelas', 'code_kelas', 'nama_kelas', 'code_prodi',],
                where: { status: "aktif" }
            }],
            where: {
                id_ploting_Kelas: id,
                status: "aktif"
            }
        })
        if (!plotingKelasUseOne) return res.status(401).json({ message: "data ploting Kelas tidak ditemukan" })
        const { nim, code_mata_kuliah, code_kelas, code_ruang } = req.body
        const codeplotingKelas = nim.substr(6, 10) + code_kelas
        const plotingKelasUse = await plotingKelasModel.findOne({
            where: {
                code_ploting_kelas: codeplotingKelas,
                code_kelas: code_kelas,
                code_ruang: code_ruang
            }
        })
        if (plotingKelasUse) return res.status(401).json({ message: "data ploting Kelas sudah ada" })
        await plotingKelasModel.update({
            code_ploting_kelas: codeplotingKelas,
            nim: nim,
            code_kelas: code_kelas,
            code_ruang: code_ruang,
        }, {
            where: {
                id_ploting_kelas: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data ploting Kelas success Diupdate",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    delete: async (req, res, next) => {
        const id = req.params.id
        const plotingKelasModelUse = await plotingKelasModel.findOne({
            include: [{
                model: mahasiswaModel,
                attributes: ['id_mahasiswa', 'nim', 'no_kk', 'nik', 'nisn', 'nama', 'status'],
                where: { status: "aktif" }
            },
            {
                model: ruangModel,
                attributes: ['id_ruang', 'code_ruang', 'nama_ruang', 'code_prodi',],
                where: { status: "aktif" }
            }, {
                model: kelasModel,
                attributes: ['id_kelas', 'code_kelas', 'nama_kelas', 'code_prodi',],
                where: { status: "aktif" }
            }],
            where: {
                id_ploting_kelas: id,
                status: "aktif"
            }
        })
        if (!plotingKelasModelUse) return res.status(401).json({ message: "Data ploting Kelas tidak ditemukan" })
        await plotingKelasModel.update({
            status: "tidak",
        }, {
            where: {
                id_ploting_kelas: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "data ploting Kelas succes dihapus"
                })
            }).
            catch(err => {
                next(err)
            })
    }
}