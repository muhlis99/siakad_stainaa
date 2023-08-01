const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const fakultasModel = require("../models/fakultasModel.js")
const prodiModel = require('../models/prodiModel.js')
const dosenModel = require('../models/dosenModel.js')
const pembimbingAkademik = require('../models/pembimbingAkademikModel.js')
const detailPembimbingAkademik = require('../models/detailPembimbingAkademikModel.js')
const mahasiswaModel = require('../models/mahasiswaModel.js')
const { Op } = require('sequelize')



module.exports = {
    get: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = req.query.perPage || 10
        const search = req.query.search || ""
        await pembimbingAkademik.findAndCountAll({
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
                model: dosenModel,
                where: { status: "aktif" }
            }],
            where: {
                [Op.or]: [
                    {
                        id_pembimbing_akademik: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_pembimbing_akademik: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        dosen: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_prodi: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: "aktif"
            }
        }).
            then(all => {
                totalItems = all.count
                return pembimbingAkademik.findAll({
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
                        attributes: ["nidn", "nip_ynaa", "nama"],
                        model: dosenModel,
                        where: { status: "aktif" }
                    }],
                    where: {
                        [Op.or]: [
                            {
                                id_pembimbing_akademik: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                code_pembimbing_akademik: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                dosen: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                code_prodi: {
                                    [Op.like]: `%${search}%`
                                }
                            }
                        ],
                        status: "aktif"
                    },
                    offset: (currentPage - 1) * parseInt(perPage),
                    limit: parseInt(perPage),
                    order: [
                        ["id_pembimbing_akademik", "DESC"]
                    ]
                })
            }).
            then(result => {
                const totalPage = Math.ceil(totalItems / perPage)
                res.status(200).json({
                    message: "Get All Pembimbing Akademik Success",
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

    getMhsByPembimbingAkademik: async (req, res, next) => {
        const codePendik = req.params.codePendik
        await detailPembimbingAkademik.findAll({
            include: [
                {
                    model: pembimbingAkademik,
                    status: "aktif"
                },
                {
                    model: mahasiswaModel,
                    status: "aktif"
                }
            ],
            where: {
                code_pembimbing_akademik: codePendik,
                status: "aktif"
            }
        }).then(all => {
            if (!all) {
                return res.status(404).json({
                    message: "Data akademik  Tidak Ditemukan",
                    data: null
                })
            }
            res.status(201).json({
                message: "Data akademik  Ditemukan",
                data: all
            })
        })

    },

    getById: async (req, res, next) => {
        const id = req.params.id
        await pembimbingAkademik.findOne({
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
                attributes: ["nidn", "nip_ynaa", "nama"],
                model: dosenModel,
                where: { status: "aktif" }
            }],
            where: {
                id_pembimbing_akademik: id,
                status: "aktif"
            }
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data akademik Pembimbing Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data akademik Pembimbing Ditemukan",
                    data: result
                })
            }).
            catch(err => {
                next(err)
            })
    },

    autocompleteDosen: async (req, res, next) => {
        const dataPembimbing = await pembimbingAkademik.findAll({
            include: [{
                attributes: ["nidn", "nip_ynaa", "nama"],
                model: dosenModel,
                where: { status: "aktif" }
            }],
            where: {
                status: "aktif"
            }
        })
        const dataDosenInPembimbing = dataPembimbing.map(i => {
            return i.dosen
        })
        await dosenModel.findAll({
            where: {
                nip_ynaa: {
                    [Op.notIn]: dataDosenInPembimbing
                },
                status: "aktif"
            }
        }).then(all => {
            res.status(201).json({
                message: "Data Dosen  Ditemukan",
                data: all
            })
        }).catch(err => {
            next(err)
        })
    },

    autocompleteMahasiswa: async (req, res, next) => {
        const { codeJnjPen, codeFks, codePrd } = req.params

        const dataDetailPembimbing = await detailPembimbingAkademik.findAll({
            include: [{
                model: mahasiswaModel,
                where: {
                    code_jenjang_pendidikan: codeJnjPen,
                    code_fakultas: codeFks,
                    code_prodi: codePrd,
                    status: "aktif"
                }
            }],
            where: {
                status: "aktif"
            }
        })
        const dataMahsiswaInDetailPembimbing = dataDetailPembimbing.map(i => {
            return i.nim
        })
        await mahasiswaModel.findAll({
            where: {
                nim: {
                    [Op.notIn]: dataMahsiswaInDetailPembimbing,
                },
                code_jenjang_pendidikan: codeJnjPen,
                code_fakultas: codeFks,
                code_prodi: codePrd,
                status: "aktif"
            }
        }).then(all => {
            if (!all) {
                res.status(201).json({
                    message: "Data mahsiswa  Ditemukan",
                    data: []
                })
            }
            res.status(201).json({
                message: "Data mahsiswa  Ditemukan",
                data: all
            })
        }).catch(err => {
            next(err)
        })
    },

    post: async (req, res, next) => {
        const { code_jenjang_pendidikan, code_fakultas, code_prodi, dosen, kouta_bimbingan } = req.body
        let randomNumber = Math.floor(10000000 + Math.random() * 90000000)
        await pembimbingAkademik.create({
            code_pembimbing_akademik: randomNumber,
            code_jenjang_pendidikan: code_jenjang_pendidikan,
            code_fakultas: code_fakultas,
            code_prodi: code_prodi,
            dosen: dosen,
            kouta_bimbingan: kouta_bimbingan,
            status: "aktif"
        }).
            then(result => {
                res.status(201).json({
                    message: "Data pembimbing akademik success Ditambahkan",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    put: async (req, res, next) => {
        const id = req.params.id
        const { code_jenjang_pendidikan, code_fakultas, code_prodi, dosen, kouta_bimbingan } = req.body
        const pembimbingAkademikUse = await pembimbingAkademik.findOne({
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
                attributes: ["nidn", "nip_ynaa", "nama"],
                model: dosenModel,
                where: { status: "aktif" }
            }],
            where: {
                id_pembimbing_akademik: id,
                status: "aktif"
            }
        })
        if (!pembimbingAkademikUse) return res.status(404).json({ message: "Data  Pembimbing akademik Tidak Ditemukan" })

        await pembimbingAkademik.update({
            code_jenjang_pendidikan: code_jenjang_pendidikan,
            code_fakultas: code_fakultas,
            code_prodi: code_prodi,
            dosen: dosen,
            kouta_bimbingan: kouta_bimbingan,
            status: "aktif"
        }, {
            where: {
                id_pembimbing_akademik: id,
                status: "aktif"
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data pembimbing akademik success Diupdate",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    delete: async (req, res, next) => {
        const id = req.params.id
        const pembimbingAkademikUse = await pembimbingAkademik.findOne({
            include: [{
                model: prodiModel,
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                where: { status: "aktif" }
            }, {
                model: jenjangPendidikanModel,
                where: { status: "aktif" }
            }, {
                model: dosenModel,
                where: { status: "aktif" }
            }],
            where: {
                id_pembimbing_akademik: id,
                status: "aktif"
            }
        })
        if (!pembimbingAkademikUse) return res.status(401).json({ message: "Data pembimbing Akademik tidak ditemukan" })
        await pembimbingAkademik.update({
            status: "tidak"
        }, {
            where: {
                id_pembimbing_akademik: id,
                status: "aktif"
            }
        })

        try {
            await detailPembimbingAkademik.update({
                status: "tidak"
            }, {
                where: {
                    code_pembimbing_akademik: pembimbingAkademikUse.code_pembimbing_akademik,
                    status: "aktif"
                }
            }).then(result => {
                res.status(201).json({
                    message: "data pembimbing Akademik succes dihapus"
                })
            })
        } catch (error) {
            next(error)
        }

    },

    postDetail: async (req, res, next) => {
        const { code_pembimbing_akademik, nim } = req.body
        let randomNumber = Math.floor(10000000 + Math.random() * 90000000)
        await detailPembimbingAkademik.create({
            code_detail_pembimbing_akademik: randomNumber,
            code_pembimbing_akademik: code_pembimbing_akademik,
            nim: nim,
            status: "aktif"
        }).
            then(result => {
                res.status(201).json({
                    message: "Data Detail pembimbing akademik success Ditambahkan",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    putDetail: async (req, res, next) => {
        const id = req.params.id
        const { code_pembimbing_akademik } = req.body
        const detailpembimbingAkademikUse = await detailPembimbingAkademik.findOne({
            include: [{
                model: pembimbingAkademik,
                where: { status: "aktif" }
            }, {
                model: mahasiswaModel,
                where: { status: "aktif" }
            },],
            where: {
                id_detail_pembimbing_akademik: id,
                status: "aktif"
            }
        })
        if (!detailpembimbingAkademikUse) return res.status(404).json({ message: "Data detail Pembimbing akademik Tidak Ditemukan" })

        await detailpembimbingAkademikUse.update({
            code_pembimbing_akademik: code_pembimbing_akademik,
            status: "aktif"
        }, {
            where: {
                id_detail_pembimbing_akademik: id,
                status: "aktif"
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data Detail pembimbing akademik success Diupdate",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    deleteDetail: async (req, res, next) => {
        const id = req.params.id
        const detailpembimbingAkademikUse = await detailPembimbingAkademik.findOne({
            include: [{
                model: pembimbingAkademik,
                where: { status: "aktif" }
            }, {
                model: mahasiswaModel,
                where: { status: "aktif" }
            },],
            where: {
                id_detail_pembimbing_akademik: id,
                status: "aktif"
            }
        })
        if (!detailpembimbingAkademikUse) return res.status(404).json({ message: "Data detail Pembimbing akademik Tidak Ditemukan" })

        await detailPembimbingAkademik.update({
            status: "tidak"
        }, {
            where: {
                id_detail_pembimbing_akademik: id,
                status: "aktif"
            }
        }).then(all => {
            res.status(201).json({
                message: "Data Detail pembimbing akademik success Diupdate",
            })
        }).catch(err => {
            next(err)
        })


    },
}