const { Op } = require('sequelize')
const pengajuanStudi = require('../models/pengajuanStudiModel')
const tahunAjaranModel = require('../models/tahunAjaranModel')
const semesterModel = require('../models/semesterModel')
const jenjangPendidikanModel = require('../models/jenjangPendidikanModel')
const fakultasModel = require('../models/fakultasModel')
const prodiModel = require('../models/prodiModel')
const mahasiswaModel = require('../models/mahasiswaModel')
const historyMahasiswa = require('../models/historyMahasiswaModel')
const detailStudi = require('../models/detailStudiModel')


module.exports = {
    get: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = (currentPage - 1) * perPage
        const totalPage = await pengajuanStudi.count({
            include: [{
                attributes: ['nim', 'nama'],
                model: mahasiswaModel,
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: semesterModel,
                where: { status: "aktif" }
            }, {
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
                        id_pengajuan_studi: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nim: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        tanggal_pengajuan: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        pengajuan: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        alasan: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            }
        })
        const totalItems = Math.ceil(totalPage / perPage)
        await pengajuanStudi.findAll({
            include: [{
                attributes: ['nim', 'nama'],
                model: mahasiswaModel,
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: semesterModel,
                where: { status: "aktif" }
            }, {
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
                        id_pengajuan_studi: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nim: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        tanggal_pengajuan: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        pengajuan: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        alasan: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            },
            offset: offset,
            limit: perPage,
            order: [
                ["id_pengajuan_studi", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All pengajun studi Success",
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

    getAdmin: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = (currentPage - 1) * perPage
        const totalPage = await historyMahasiswa.count({
            include: [
                // {
                //     attributes: ['nim', 'nama'],
                //     model: mahasiswaModel,
                //     where: { status: "aktif" }
                // },
                // {
                //     model: tahunAjaranModel,
                //     where: { status: "aktif" }
                // },
                // {
                //     model: semesterModel,
                //     where: { status: "aktif" }
                // },
                // {
                //     model: jenjangPendidikanModel,
                //     where: { status: "aktif" }
                // },
                // {
                //     model: fakultasModel,
                //     where: { status: "aktif" }
                // },
                // {
                //     model: prodiModel,
                //     where: { status: "aktif" }
                // }

            ],
            where: {
                [Op.or]: [
                    {
                        nim: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_tahun_ajaran: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_semester: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_jenjang_pendidikan: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_semester: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_prodi: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: {
                    [Op.not]: ['tidak', 'aktif'],
                }
            }
        })
        const totalItems = Math.ceil(totalPage / perPage)
        await historyMahasiswa.findAll({
            include: [
                // {
                //     attributes: ['nim', 'nama'],
                //     model: mahasiswaModel,
                //     where: { status: "aktif" }
                // },
                // {
                //     model: tahunAjaranModel,
                //     where: { status: "aktif" }
                // },
                // {
                //     model: semesterModel,
                //     where: { status: "aktif" }
                // },
                // {
                //     model: jenjangPendidikanModel,
                //     where: { status: "aktif" }
                // },
                // {
                //     model: fakultasModel,
                //     where: { status: "aktif" }
                // },
                // {
                //     model: prodiModel,
                //     where: { status: "aktif" }
                // }
            ],
            where: {
                [Op.or]: [
                    {
                        nim: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_tahun_ajaran: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_semester: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_jenjang_pendidikan: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_semester: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_prodi: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: {
                    [Op.not]: ['tidak', 'aktif'],
                }
            },
            offset: offset,
            limit: perPage,
            order: [
                ["id_history", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All pengajun studi Success",
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
        const prodiUse = await pengajuanStudi.findOne({
            include: [{
                attributes: ['nim', 'nama'],
                model: mahasiswaModel,
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: semesterModel,
                where: { status: "aktif" }
            }, {
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
                id_pengajuan_studi: id,
            }
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data pengajuan studi Tidak Ditemukan",
                        data: []
                    })
                }
                res.status(201).json({
                    message: "Data pengajuan studi Ditemukan",
                    data: result
                })
            }).
            catch(err => {
                next(err)
            })
    },


    postMahasiswa: async (req, res, next) => {
        const { code_tahun_ajaran, code_semester, code_jenjang_pendidikan, code_fakultas, code_prodi,
            nim, tanggal_pengajuan, pengajuan, alasan } = req.body

        const dataMahasiswaUse = await historyMahasiswa.findOne({
            include: [{
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: semesterModel,
                where: { status: "aktif" }
            }, {
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
                code_tahun_ajaran: code_tahun_ajaran,
                code_semester: code_semester,
                code_jenjang_pendidikan: code_jenjang_pendidikan,
                code_fakultas: code_fakultas,
                code_prodi: code_prodi,
                nim: nim,
                status: {
                    [Op.notIn]: ['tidak', 'berhenti']
                }
            }
        })

        if (!dataMahasiswaUse) return res.status(404).json({ message: "Mahasiswa sudah berhenti" })

        let randomNumber = Math.floor(100000 + Math.random() * 900000)
        await pengajuanStudi.create({
            code_pengajuan_studi: randomNumber,
            code_tahun_ajaran: code_tahun_ajaran,
            code_semester: code_semester,
            code_jenjang_pendidikan: code_jenjang_pendidikan,
            code_fakultas: code_fakultas,
            code_prodi: code_prodi,
            nim: nim,
            tanggal_pengajuan: tanggal_pengajuan,
            pengajuan: pengajuan,
            alasan: alasan,
            status: "proses"
        }).
            then(result => {
                res.status(201).json({
                    message: "Data pengajuan succes Ditambahkan",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    createAdmin: async (req, res, next) => {
        const { code_tahun_ajaran, code_semester, code_jenjang_pendidikan, code_fakultas, code_prodi,
            nim, tanggal_pengajuan, pengajuan, alasan } = req.body

        const dataMahasiswaUse = await historyMahasiswa.findOne({
            include: [
                {
                    model: tahunAjaranModel,
                    where: { status: "aktif" }
                }, {
                    model: semesterModel,
                    where: { status: "aktif" }
                }, {
                    model: jenjangPendidikanModel,
                    where: { status: "aktif" }
                }, {
                    model: fakultasModel,
                    where: { status: "aktif" }
                }, {
                    model: prodiModel,
                    where: { status: "aktif" }
                }
            ],
            where: {
                code_jenjang_pendidikan: code_jenjang_pendidikan,
                code_fakultas: code_fakultas,
                code_prodi: code_prodi,
                code_semester: code_semester,
                code_tahun_ajaran: code_tahun_ajaran,
                nim: nim,
                status: {
                    [Op.notIn]: ['tidak', 'berhenti']
                }
            }
        })
        if (!dataMahasiswaUse) return res.status(404).json({ message: "Mahasiswa sudah berhenti" })

        if (pengajuan === "reaktif") {
            let randomNumberHS = Math.floor(100000 + Math.random() * 900000)
            await historyMahasiswa.create({
                nim: nim,
                code_history: randomNumberHS,
                code_jenjang_pendidikan: code_jenjang_pendidikan,
                code_fakultas: code_fakultas,
                code_prodi: code_prodi,
                code_semester: code_semester,
                code_tahun_ajaran: code_tahun_ajaran,
                status: "aktif"
            })

            let randomNumberDS = Math.floor(100000 + Math.random() * 900000)
            await detailStudi.create({
                code_detail_studi: randomNumberDS,
                code_history: randomNumberHS,
                status_studi: pengajuan,
                tanggal: tanggal_pengajuan,
                alasan: alasan
            }).then(all => {
                res.status(201).json({
                    message: "Data pengajuan studi success di approve"
                })
            })
        } else if (pengajuan === "cuti") {
            let randomNumber = Math.floor(100000 + Math.random() * 900000)
            await historyMahasiswa.update({
                status: pengajuan
            }, {
                where: {
                    id_history: dataMahasiswaUse.id_history
                }
            })

            await detailStudi.create({
                code_detail_studi: randomNumber,
                code_history: dataMahasiswaUse.code_history,
                status_studi: pengajuan,
                tanggal: tanggal_pengajuan,
                alasan: alasan
            }).then(all => {
                res.status(201).json({
                    message: "Data pengajuan studi success di approve"
                })
            })
        } else if (pengajuan === "berhenti") {
            let randomNumber = Math.floor(100000 + Math.random() * 900000)
            await mahasiswaModel.update({
                status: "tidak"
            }, {
                where: {
                    nim: nim
                }
            })
            await historyMahasiswa.update({
                status: pengajuan
            }, {
                where: {
                    id_history: dataMahasiswaUse.id_history
                }
            })

            await detailStudi.create({
                code_detail_studi: randomNumber,
                code_history: dataMahasiswaUse.code_history,
                status_studi: pengajuan,
                tanggal: tanggal_pengajuan,
                alasan: alasan
            }).then(all => {
                res.status(201).json({
                    message: "Data pengajuan studi success di approve"
                })
            })
        }
    },

    approveDosen: async (req, res, next) => {
        const id = req.params.id
        const pengajuanStudiUse = await pengajuanStudi.findOne({
            include: [{
                attributes: ['nim', 'nama'],
                model: mahasiswaModel,
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: semesterModel,
                where: { status: "aktif" }
            }, {
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
                id_pengajuan_studi: id,
                status: "proses"
            }
        })
        if (!pengajuanStudiUse) return res.status(401).json({ message: "Data Pengajuan Studi tidak ditemukan" })

        await pengajuanStudi.update({
            status: "disetujui1"
        }, {
            where: {
                id_pengajuan_studi: id,
                status: "proses"
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data pengajuan studi success di approve"
                })
            }).
            catch(err => {
                next(err)
            })
    },


    approveBuak: async (req, res, next) => {
        const id = req.params.id
        const pengajuanStudiUse = await pengajuanStudi.findOne({
            include: [{
                attributes: ['nim', 'nama'],
                model: mahasiswaModel,
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: semesterModel,
                where: { status: "aktif" }
            }, {
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
                id_pengajuan_studi: id,
                status: "disetujui1"
            }
        })
        if (!pengajuanStudiUse) return res.status(401).json({ message: "Data Pengajuan Studi tidak ditemukan" })

        const dataHistoryMhsUse = await historyMahasiswa.findOne({
            where: {
                nim: pengajuanStudiUse.nim,
                code_jenjang_pendidikan: pengajuanStudiUse.code_jenjang_pendidikan,
                code_fakultas: pengajuanStudiUse.code_fakultas,
                code_prodi: pengajuanStudiUse.code_prodi,
                code_semester: pengajuanStudiUse.code_semester,
                code_tahun_ajaran: pengajuanStudiUse.code_tahun_ajaran,
            }
        })

        await pengajuanStudi.update({
            status: "disetujui2"
        }, {
            where: {
                id_pengajuan_studi: id,
                status: "disetujui1"
            }
        })

        if (pengajuanStudiUse.pengajuan === "reaktif") {
            let randomNumberHS = Math.floor(100000 + Math.random() * 900000)
            await historyMahasiswa.create({
                nim: pengajuanStudiUse.nim,
                code_history: randomNumberHS,
                code_jenjang_pendidikan: pengajuanStudiUse.code_jenjang_pendidikan,
                code_fakultas: pengajuanStudiUse.code_fakultas,
                code_prodi: pengajuanStudiUse.code_prodi,
                code_semester: pengajuanStudiUse.code_semester,
                code_tahun_ajaran: pengajuanStudiUse.code_tahun_ajaran,
                status: "aktif"
            })

            let randomNumberDS = Math.floor(100000 + Math.random() * 900000)
            await detailStudi.create({
                code_detail_studi: randomNumberDS,
                code_history: randomNumberHS,
                status_studi: pengajuanStudiUse.pengajuan,
                tanggal: pengajuanStudiUse.tanggal_pengajuan,
                alasan: pengajuanStudiUse.alasan
            }).then(all => {
                res.status(201).json({
                    message: "Data pengajuan studi success di approve"
                })
            })
        } else if (pengajuanStudiUse.pengajuan === "cuti") {
            let randomNumber = Math.floor(100000 + Math.random() * 900000)
            await historyMahasiswa.update({
                status: pengajuanStudiUse.pengajuan
            }, {
                where: {
                    id_history: dataHistoryMhsUse.id_history
                }
            })

            await detailStudi.create({
                code_detail_studi: randomNumber,
                code_history: dataHistoryMhsUse.code_history,
                status_studi: pengajuanStudiUse.pengajuan,
                tanggal: pengajuanStudiUse.tanggal_pengajuan,
                alasan: pengajuanStudiUse.alasan
            }).then(all => {
                res.status(201).json({
                    message: "Data pengajuan studi success di approve"
                })
            })
        } else if (pengajuanStudiUse.pengajuan === "berhenti") {
            let randomNumber = Math.floor(100000 + Math.random() * 900000)
            await mahasiswaModel.update({
                status: "tidak"
            }, {
                where: {
                    nim: pengajuanStudiUse.nim
                }
            })
            await historyMahasiswa.update({
                status: pengajuanStudiUse.pengajuan
            }, {
                where: {
                    id_history: dataHistoryMhsUse.id_history
                }
            })

            await detailStudi.create({
                code_detail_studi: randomNumber,
                code_history: dataHistoryMhsUse.code_history,
                status_studi: pengajuanStudiUse.pengajuan,
                tanggal: pengajuanStudiUse.tanggal_pengajuan,
                alasan: pengajuanStudiUse.alasan
            }).then(all => {
                res.status(201).json({
                    message: "Data pengajuan studi success di approve"
                })
            })
        }

    },

    deleteStatus: async (req, res, next) => {
        const id = req.params.id
        const pengajuanStudiUse = await pengajuanStudi.findOne({
            include: [{
                attributes: ['nim', 'nama'],
                model: mahasiswaModel,
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: semesterModel,
                where: { status: "aktif" }
            }, {
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
                id_pengajuan_studi: id,
                status: {
                    [Op.ne]: 'tidak'
                }
            }
        })
        if (!pengajuanStudiUse) return res.status(401).json({ message: "Data Pengajuan Studi tidak ditemukan" })
        await pengajuanStudiUse.update({
            status: "tidak"
        }, {
            where: {
                id_pengajuan_studi: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "data Pengajuan Studi succes dihapus"
                })
            }).
            catch(err => {
                next(err)
            })
    }
}