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
                where: { status: "aktif" }
            }, {
                model: kelasModel,
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
                where: { status: "aktif" }
            }, {
                model: kelasModel,
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
                where: { status: "aktif" }
            }, {
                model: kelasModel,
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
        const datas = data.map(record => {
            return record.nim
        })
        console.log(datas);
        // const codePlotingKelas = code_kelas + nim
        // const codePlotingKelas = code_kelas + nim.substr(6, 10)
        // const plotingKelasUse = await plotingKelasModel.findAll({
        //     where: {
        //         [Op.and]: [{ nim: nim }]
        //     },
        // })
        // if (plotingKelasUse) return res.status(401).json({ message: "data ploting Kelas sudah ada" })
        // await plotingKelasModel.create({
        //     code_plotingKelas: codeplotingKelas,
        //     nama_plotingKelas: namaplotingKelas,
        //     code_jenjang_pendidikan: code_jenjang_pendidikan,
        //     code_fakultas: code_fakultas,
        //     code_prodi: code_prodi,
        //     code_ruang: code_ruang,
        //     dosen_wali: dosen_wali,
        //     status: "aktif",
        // }).
        //     then(result => {
        //         res.status(201).json({
        //             message: "Data plotingKelas success Ditambahkan",
        //         })
        //     }).
        //     catch(err => {
        //         next(err)
        //     })
    },

    put: async (req, res, next) => {
        const id = req.params.id
        const plotingKelasUseOne = await plotingKelasModel.findOne({
            include: [{
                model: jenjangPendidikanModel,
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }, {
                model: ruangModel,
                where: { status: "aktif" }
            }, {
                model: dosenModel,
                where: { status: "aktif" }
            }], include: [{
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
                id_plotingKelas: id,
                status: "aktif"
            }
        })
        if (!plotingKelasUseOne) return res.status(401).json({ message: "data plotingKelas tidak ditemukan" })
        const { nama_plotingKelas, identy_plotingKelas, code_ruang, code_jenjang_pendidikan, code_fakultas, code_prodi, dosen_wali } = req.body
        const namaplotingKelas = nama_plotingKelas + identy_plotingKelas
        const codeplotingKelas = code_prodi + identy_plotingKelas.replace(/ /g, '')
        const plotingKelasUse = await plotingKelasModel.findOne({
            where: {
                code_plotingKelas: codeplotingKelas,
                nama_plotingKelas: namaplotingKelas,
                dosen_wali: dosen_wali
            }
        })
        if (plotingKelasUse) return res.status(401).json({ message: "data plotingKelas sudah ada" })
        await plotingKelasModel.update({
            code_plotingKelas: codeplotingKelas,
            nama_plotingKelas: namaplotingKelas,
            code_jenjang_pendidikan: code_jenjang_pendidikan,
            code_fakultas: code_fakultas,
            code_prodi: code_prodi,
            code_ruang: code_ruang,
            dosen_wali: dosen_wali,
        }, {
            where: {
                id_plotingKelas: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data plotingKelas success Diupdate",
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
                model: jenjangPendidikanModel,
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }, {
                model: ruangModel,
                where: { status: "aktif" }
            }, {
                model: dosenModel,
                where: { status: "aktif" }
            }], include: [{
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
                id_plotingKelas: id,
                status: "aktif"
            }
        })
        if (!plotingKelasModelUse) return res.status(401).json({ message: "Data plotingKelas tidak ditemukan" })
        await plotingKelasModel.update({
            status: "tidak",
        }, {
            where: {
                id_plotingKelas: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "data plotingKelas succes dihapus"
                })
            }).
            catch(err => {
                next(err)
            })
    }
}