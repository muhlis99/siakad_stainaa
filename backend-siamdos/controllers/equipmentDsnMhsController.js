const { alatTransportasi, agama, jalurPendaftaran, jenisPendaftaran,
    jenisTinggal, pekerjaan, pendidikan, penghasilan,
    negara, provinsi, kabupaten, kecamatan, desa } = require('../models/equipmentDsnMhsModel.js')
const { Op } = require('sequelize')

module.exports = {
    alatTransportasiAll: async (req, res, next) => {
        await alatTransportasi.findAll({
            order: [
                ["id_alat_transportasi", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All alat transportasi Success",
                    data: result,
                })
            }).
            catch(err => {
                next(err)
            })
    },

    alatTransportasiGetById: async (req, res, next) => {
        const id = req.params.id
        await alatTransportasi.findOne({
            where: {
                id_alat_transportasi: id
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data alat transportasi Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data alat transportasi Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },


    alatTransportasiGetByCode: async (req, res, next) => {
        const code = req.params.code
        await alatTransportasi.findOne({
            where: {
                code_alat_transportasi: code
            }
        }).
            then(getByCode => {
                if (!getByCode) {
                    return res.status(404).json({
                        message: "Data alat transportasi Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data alat transportasi Ditemukan",
                    data: getByCode
                })
            }).
            catch(err => {
                next(err)
            })
    },

    // agama
    agamaAll: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        let totalItems
        await agama.findAndCountAll({
            where: {
                [Op.or]: [
                    {
                        id_agama: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_agama: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nama_agama: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            }
        }).
            then(all => {
                totalItems = all.count
                return agama.findAll({
                    where: {
                        [Op.or]: [
                            {
                                id_agama: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                code_agama: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                nama_agama: {
                                    [Op.like]: `%${search}%`
                                }
                            }
                        ]
                    },
                    offset: (currentPage - 1) * perPage,
                    limit: perPage,
                    order: [
                        ["id_agama", "DESC"]
                    ]
                })
            }).
            then(result => {
                const totalPage = Math.ceil(totalItems / perPage)
                res.status(200).json({
                    message: "Get All agama Success",
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

    agamaGetById: async (req, res, next) => {
        const id = req.params.id
        await agama.findOne({
            where: {
                id_agama: id
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data agama Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data agama Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    // jalur_pendaftaran
    jalurPendaftaranAll: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        let totalItems
        await jalurPendaftaran.findAndCountAll({
            where: {
                [Op.or]: [
                    {
                        id_jalur_pendaftaran: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_jalur_pendaftaran: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nama_jalur_pendaftaran: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            }
        }).
            then(all => {
                totalItems = all.count
                return jalurPendaftaran.findAll({
                    where: {
                        [Op.or]: [
                            {
                                id_jalur_pendaftaran: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                code_jalur_pendaftaran: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                nama_jalur_pendaftaran: {
                                    [Op.like]: `%${search}%`
                                }
                            }
                        ]
                    },
                    offset: (currentPage - 1) * perPage,
                    limit: perPage,
                    order: [
                        ["id_jalur_pendaftaran", "DESC"]
                    ]
                })
            }).
            then(result => {
                const totalPage = Math.ceil(totalItems / perPage)
                res.status(200).json({
                    message: "Get All jalur_pendaftaran Success",
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

    jalurPendaftaranGetById: async (req, res, next) => {
        const id = req.params.id
        await jalurPendaftaran.findOne({
            where: {
                id_jalur_pendaftaran: id
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data jalur pendaftaran Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data jalur pendaftaran Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    jalurPendaftaranGetByCode: async (req, res, next) => {
        const code = req.params.code
        await jalurPendaftaran.findOne({
            where: {
                code_jalur_pendaftaran: code
            }
        }).
            then(getByCode => {
                if (!getByCode) {
                    return res.status(404).json({
                        message: "Data jalur pendaftaran Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data jalur pendaftaran Ditemukan",
                    data: getByCode
                })
            }).
            catch(err => {
                next(err)
            })
    },

    // jenis_pendaftaran
    jenisPendaftaranAll: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        let totalItems
        await jenisPendaftaran.findAndCountAll({
            where: {
                [Op.or]: [
                    {
                        id_jenis_pendaftaran: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_jenis_pendaftaran: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nama_jenis_pendaftaran: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            }
        }).
            then(all => {
                totalItems = all.count
                return jenisPendaftaran.findAll({
                    where: {
                        [Op.or]: [
                            {
                                id_jenis_pendaftaran: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                code_jenis_pendaftaran: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                nama_jenis_pendaftaran: {
                                    [Op.like]: `%${search}%`
                                }
                            }
                        ]
                    },
                    offset: (currentPage - 1) * perPage,
                    limit: perPage,
                    order: [
                        ["id_jenis_pendaftaran", "DESC"]
                    ]
                })
            }).
            then(result => {
                const totalPage = Math.ceil(totalItems / perPage)
                res.status(200).json({
                    message: "Get All jenis_pendaftaran Success",
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

    jenisPendaftaranGetById: async (req, res, next) => {
        const id = req.params.id
        await jenisPendaftaran.findOne({
            where: {
                id_jenis_pendaftaran: id
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data jenis pendaftaran Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data jenis pendaftaran Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    jenisPendaftaranGetByCode: async (req, res, next) => {
        const code = req.params.code
        await jenisPendaftaran.findOne({
            where: {
                code_jenis_pendaftaran: code
            }
        }).
            then(getByCode => {
                if (!getByCode) {
                    return res.status(404).json({
                        message: "Data jenis pendaftaran Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data jenis pendaftaran Ditemukan",
                    data: getByCode
                })
            }).
            catch(err => {
                next(err)
            })
    },

    // jenis_tinggal
    jenisTinggalAll: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        let totalItems
        await jenisTinggal.findAndCountAll({
            where: {
                [Op.or]: [
                    {
                        id_jenis_tinggal: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_jenis_tinggal: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nama_jenis_tinggal: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            }
        }).
            then(all => {
                totalItems = all.count
                return jenisTinggal.findAll({
                    where: {
                        [Op.or]: [
                            {
                                id_jenis_tinggal: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                code_jenis_tinggal: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                nama_jenis_tinggal: {
                                    [Op.like]: `%${search}%`
                                }
                            }
                        ]
                    },
                    offset: (currentPage - 1) * perPage,
                    limit: perPage,
                    order: [
                        ["id_jenis_tinggal", "DESC"]
                    ]
                })
            }).
            then(result => {
                const totalPage = Math.ceil(totalItems / perPage)
                res.status(200).json({
                    message: "Get All jenis_tinggal Success",
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

    jenisTinggalGetById: async (req, res, next) => {
        const id = req.params.id
        await jenisTinggal.findOne({
            where: {
                id_jenis_tinggal: id
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data jenis tinggal Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data jenis tinggal Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    jenisTinggalGetByCode: async (req, res, next) => {
        const code = req.params.code
        await jenisTinggal.findOne({
            where: {
                code_jenis_tinggal: code
            }
        }).
            then(getByCode => {
                if (!getByCode) {
                    return res.status(404).json({
                        message: "Data jenis tinggal Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data jenis tinggal Ditemukan",
                    data: getByCode
                })
            }).
            catch(err => {
                next(err)
            })
    },

    // pekerjaan
    // pekerjaanAll: async (req, res, next) => {
    //     const currentPage = parseInt(req.query.page) || 1
    //     const perPage = parseInt(req.query.perPage) || 10
    //     const search = req.query.search || ""
    //     let totalItems
    //     await pekerjaan.findAndCountAll({
    //         where: {
    //             [Op.or]: [
    //                 {
    //                     id_pekerjaan: {
    //                         [Op.like]: `%${search}%`
    //                     }
    //                 },
    //                 {
    //                     code_pekerjaan: {
    //                         [Op.like]: `%${search}%`
    //                     }
    //                 },
    //                 {
    //                     nama_pekerjaan: {
    //                         [Op.like]: `%${search}%`
    //                     }
    //                 }
    //             ]
    //         }
    //     }).
    //         then(all => {
    //             totalItems = all.count
    //             return pekerjaan.findAll({
    //                 where: {
    //                     [Op.or]: [
    //                         {
    //                             id_pekerjaan: {
    //                                 [Op.like]: `%${search}%`
    //                             }
    //                         },
    //                         {
    //                             code_pekerjaan: {
    //                                 [Op.like]: `%${search}%`
    //                             }
    //                         },
    //                         {
    //                             nama_pekerjaan: {
    //                                 [Op.like]: `%${search}%`
    //                             }
    //                         }
    //                     ]
    //                 },
    //                 offset: (currentPage - 1) * perPage,
    //                 limit: perPage,
    //                 order: [
    //                     ["id_pekerjaan", "DESC"]
    //                 ]
    //             })
    //         }).
    //         then(result => {
    //             const totalPage = Math.ceil(totalItems / perPage)
    //             res.status(200).json({
    //                 message: "Get All pekerjaan Success",
    //                 data: result,
    //                 total_data: totalItems,
    //                 per_page: perPage,
    //                 current_page: currentPage,
    //                 total_page: totalPage
    //             })
    //         }).
    //         catch(err => {
    //             next(err)
    //         })
    // },
    pekerjaanAll: async (req, res, next) => {
        await pekerjaan.findAll({
            order: [
                ["id_pekerjaan", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All Pekerjaan Success",
                    data: result,
                })
            }).
            catch(err => {
                next(err)
            })
    },

    pekerjaanGetById: async (req, res, next) => {
        const id = req.params.id
        await pekerjaan.findOne({
            where: {
                id_pekerjaan: id
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data pekerjaan Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data pekerjaan Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    pekerjaanGetByCode: async (req, res, next) => {
        const code = req.params.code
        await pekerjaan.findOne({
            where: {
                code_pekerjaan: code
            }
        }).
            then(getByCode => {
                if (!getByCode) {
                    return res.status(404).json({
                        message: "Data pekerjaan Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data pekerjaan Ditemukan",
                    data: getByCode
                })
            }).
            catch(err => {
                next(err)
            })
    },

    // pendidikan
    // pendidikanAll: async (req, res, next) => {
    //     const currentPage = parseInt(req.query.page) || 1
    //     const perPage = parseInt(req.query.perPage) || 10
    //     const search = req.query.search || ""
    //     let totalItems
    //     await pendidikan.findAndCountAll({
    //         where: {
    //             [Op.or]: [
    //                 {
    //                     id_pendidikan: {
    //                         [Op.like]: `%${search}%`
    //                     }
    //                 },
    //                 {
    //                     code_pendidikan: {
    //                         [Op.like]: `%${search}%`
    //                     }
    //                 },
    //                 {
    //                     nama_pendidikan: {
    //                         [Op.like]: `%${search}%`
    //                     }
    //                 }
    //             ]
    //         }
    //     }).
    //         then(all => {
    //             totalItems = all.count
    //             return pendidikan.findAll({
    //                 where: {
    //                     [Op.or]: [
    //                         {
    //                             id_pendidikan: {
    //                                 [Op.like]: `%${search}%`
    //                             }
    //                         },
    //                         {
    //                             code_pendidikan: {
    //                                 [Op.like]: `%${search}%`
    //                             }
    //                         },
    //                         {
    //                             nama_pendidikan: {
    //                                 [Op.like]: `%${search}%`
    //                             }
    //                         }
    //                     ]
    //                 },
    //                 offset: (currentPage - 1) * perPage,
    //                 limit: perPage,
    //                 order: [
    //                     ["id_pendidikan", "DESC"]
    //                 ]
    //             })
    //         }).
    //         then(result => {
    //             const totalPage = Math.ceil(totalItems / perPage)
    //             res.status(200).json({
    //                 message: "Get All pendidikan Success",
    //                 data: result,
    //                 total_data: totalItems,
    //                 per_page: perPage,
    //                 current_page: currentPage,
    //                 total_page: totalPage
    //             })
    //         }).
    //         catch(err => {
    //             next(err)
    //         })
    // },

    pendidikanAll: async (req, res, next) => {
        await pendidikan.findAll({
            order: [
                ["id_pendidikan", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All alat transportasi Success",
                    data: result,
                })
            }).
            catch(err => {
                next(err)
            })
    },

    pendidikanGetById: async (req, res, next) => {
        const id = req.params.id
        await pendidikan.findOne({
            where: {
                id_pendidikan: id
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data pendidikan Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data pendidikan Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    pendidikanGetByCode: async (req, res, next) => {
        const code = req.params.code
        await pendidikan.findOne({
            where: {
                code_pendidikan: code
            }
        }).
            then(getByCode => {
                if (!getByCode) {
                    return res.status(404).json({
                        message: "Data pendidikan Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data pendidikan Ditemukan",
                    data: getByCode
                })
            }).
            catch(err => {
                next(err)
            })
    },

    // penghasilan
    penghasilanAll: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        let totalItems
        await penghasilan.findAndCountAll({
            where: {
                [Op.or]: [
                    {
                        id_penghasilan: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_penghasilan: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nama_penghasilan: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            }
        }).
            then(all => {
                totalItems = all.count
                return penghasilan.findAll({
                    where: {
                        [Op.or]: [
                            {
                                id_penghasilan: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                code_penghasilan: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                nama_penghasilan: {
                                    [Op.like]: `%${search}%`
                                }
                            }
                        ]
                    },
                    offset: (currentPage - 1) * perPage,
                    limit: perPage,
                    order: [
                        ["id_penghasilan", "DESC"]
                    ]
                })
            }).
            then(result => {
                const totalPage = Math.ceil(totalItems / perPage)
                res.status(200).json({
                    message: "Get All penghasilan Success",
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

    penghasilanGetById: async (req, res, next) => {
        const id = req.params.id
        await penghasilan.findOne({
            where: {
                id_penghasilan: id
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data penghasilan Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data penghasilan Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    penghasilanGetByCode: async (req, res, next) => {
        const code = req.params.code
        await penghasilan.findOne({
            where: {
                code_penghasilan: code
            }
        }).
            then(getByCode => {
                if (!getByCode) {
                    return res.status(404).json({
                        message: "Data penghasilan Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data penghasilan Ditemukan",
                    data: getByCode
                })
            }).
            catch(err => {
                next(err)
            })
    },

    // negara
    negaraAll: async (req, res, next) => {
        await negara.findAll().
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data negara Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(200).json({
                    message: "Get All negara Success",
                    data: result,
                })
            }).
            catch(err => {
                next(err)
            })
    },

    negaraGetByCode: async (req, res, next) => {
        const code = req.params.code
        await negara.findOne({
            where: {
                code_negara: code
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data negara Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data negara Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    // provinsi
    provinsiAll: async (req, res, next) => {
        await provinsi.findAll().
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data provinsi Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(200).json({
                    message: "Get All provinsi Success",
                    data: result,
                })
            }).
            catch(err => {
                next(err)
            })
    },

    provinsiGetByCode: async (req, res, next) => {
        const code = req.params.code
        await provinsi.findOne({
            where: {
                code_provinsi: code
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data provinsi Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data provinsi Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    provinsiGetByCodeNegara: async (req, res, next) => {
        const code = req.params.code
        await provinsi.findAll({
            where: {
                code_negara: code
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data provinsi Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data provinsi Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    // kabupaten
    kabupatenAll: async (req, res, next) => {
        await kabupaten.findAll().
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data kabupaten Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(200).json({
                    message: "Get All kabupaten Success",
                    data: result,
                })
            }).
            catch(err => {
                next(err)
            })
    },

    kabupatenGetByCode: async (req, res, next) => {
        const code = req.params.code
        await kabupaten.findOne({
            where: {
                code_kabupaten: code
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data kabupaten Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data kabupaten Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    kabupatenGetByCodeProvinsi: async (req, res, next) => {
        const code = req.params.code
        await kabupaten.findAll({
            where: {
                code_provinsi: code
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data kabupaten Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data kabupaten Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    // kecamatan
    kecamatanAll: async (req, res, next) => {
        await kecamatan.findAll().
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data kecamatan Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(200).json({
                    message: "Get All kecamatan Success",
                    data: result,
                })
            }).
            catch(err => {
                next(err)
            })
    },

    kecamatanGetByCode: async (req, res, next) => {
        const code = req.params.code
        await kecamatan.findOne({
            where: {
                code_kecamatan: code
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data kecamatan Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data kecamatan Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    kecamatanGetByCodeKabupaten: async (req, res, next) => {
        const code = req.params.code
        await kecamatan.findAll({
            where: {
                code_kabupaten: code
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data kecamatan Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data kecamatan Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    // desa
    desaAll: async (req, res, next) => {
        await desa.findAll().
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data desa Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(200).json({
                    message: "Get All desa Success",
                    data: result,
                })
            }).
            catch(err => {
                next(err)
            })
    },

    desaGetByCode: async (req, res, next) => {
        const code = req.params.code
        await desa.findOne({
            where: {
                code_desa: code
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data desa Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data desa Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    desaGetByCodeKecamatan: async (req, res, next) => {
        const code = req.params.code
        await desa.findAll({
            where: {
                code_kecamatan: code
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data desa Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data desa Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },
}

