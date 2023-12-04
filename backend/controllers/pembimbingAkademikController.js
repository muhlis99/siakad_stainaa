const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const fakultasModel = require("../models/fakultasModel.js")
const prodiModel = require('../models/prodiModel.js')
const dosenModel = require('../models/dosenModel.js')
const pembimbingAkademik = require('../models/pembimbingAkademikModel.js')
const detailPembimbingAkademik = require('../models/detailPembimbingAkademikModel.js')
const mahasiswaModel = require('../models/mahasiswaModel.js')
const { Op, Sequelize, col, fn, where } = require('sequelize')



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
        const currentPage = parseInt(req.query.page) || 1
        const perPage = req.query.perPage || 10
        const search = req.query.search || ""
        await detailPembimbingAkademik.findAndCountAll({
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
                [Op.or]: [
                    {
                        id_detail_pembimbing_akademik: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nim: {
                            [Op.like]: `%${search}%`
                        }
                    },
                ],
                code_pembimbing_akademik: codePendik,
                status: "aktif"
            }
        }).
            then(all => {
                totalItems = all.count
                return detailPembimbingAkademik.findAll({
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
                        [Op.or]: [
                            {
                                id_detail_pembimbing_akademik: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                nim: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                        ],
                        code_pembimbing_akademik: codePendik,
                        status: "aktif"
                    },
                    offset: (currentPage - 1) * parseInt(perPage),
                    limit: parseInt(perPage),
                    order: [
                        ["id_detail_pembimbing_akademik", "DESC"]
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
                console.log(err)
            })
    },

    getMhsForInsert: async (req, res, next) => {
        const jnjPen = req.params.jnjPen
        const fks = req.params.fks
        const prd = req.params.prd
        const codePemdik = req.params.codePemdik
        const dataDetail = await detailPembimbingAkademik.findAll({
            where: {
                code_pembimbing_akademik: codePemdik,
                status: "aktif"
            }
        })
        const dataValidasiDetail = dataDetail.map(el => {
            return el.nim
        })
        await mahasiswaModel.findAll({
            attributes: ['nim', 'nama', 'code_jenjang_pendidikan', 'code_fakultas', 'code_prodi'],
            where: {
                code_jenjang_pendidikan: jnjPen,
                code_fakultas: fks,
                code_prodi: prd,
                status: "aktif",
                nim: {
                    [Op.notIn]: dataValidasiDetail
                },
            }
        }).then(result => {
            if (!result) {
                return res.status(404).json({
                    message: "Data mahasiswa Tidak Ditemukan",
                    data: []
                })
            }
            res.status(201).json({
                message: "Data mahasiswa Ditemukan",
                data: result
            })
        }).catch(err => {
            console.log(err)
        })
    },

    post: async (req, res, next) => {
        const { code_jenjang_pendidikan, code_fakultas, code_prodi, dosen, kouta_bimbingan } = req.body
        let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)
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
        const { kouta_bimbingan } = req.body
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
            kouta_bimbingan: kouta_bimbingan
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
        const data = req.body
        const dataPostDetail = data.map(el => {
            let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)
            return {
                code_detail_pembimbing_akademik: randomNumber,
                code_pembimbing_akademik: el.code_pembimbing_akademik,
                nim: el.nim,
                status: "aktif"
            }
        })
        await detailPembimbingAkademik.bulkCreate(dataPostDetail).
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
        const { code_pembimbing_akademik, id } = req.body
        const dataIdMhs = id.map(el => { return el })
        await detailPembimbingAkademik.update({
            code_pembimbing_akademik: code_pembimbing_akademik,
            status: "aktif"
        }, {
            where: {
                id_detail_pembimbing_akademik: dataIdMhs,
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

    //  user dosen
    mahasiswaByDosenPembimbing: async (req, res, next) => {
        const { codeJnjPen, codeFks, codePrd, nipy, thnAngkatan } = req.params
        const dosenUse = await dosenModel.findOne({
            where: {
                nip_ynaa: nipy,
                status: "aktif"
            }
        })
        if (!dosenUse) return res.status(404).json({ message: "Data Tidak Ditemukan" })
        const dataPembimbing = await pembimbingAkademik.findOne({
            include: [{
                attributes: ["id_dosen", "nip_ynaa", "nama"],
                model: dosenModel,
                where: {
                    status: "aktif"
                },
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
                code_jenjang_pendidikan: codeJnjPen,
                code_fakultas: codeFks,
                code_prodi: codePrd,
                dosen: nipy,
                status: "aktif"
            }
        })
        if (!dataPembimbing) return res.status(404).json({ message: "Data Tidak Ditemukan" })
        await detailPembimbingAkademik.findAll({
            include: [
                {
                    attributes: ["id_mahasiswa", "nim", "nama", "tanggal_masuk_kuliah"],
                    model: mahasiswaModel,
                    where: {
                        tanggal_masuk_kuliah: Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('tanggal_masuk_kuliah')), thnAngkatan),
                        status: "aktif"
                    }
                }
            ],
            where: {
                code_pembimbing_akademik: dataPembimbing.code_pembimbing_akademik,
                status: "aktif"
            }
        }).then(result => {
            res.status(201).json({
                message: "Data ditemukan",
                identitas: {
                    nip_ynaa: dataPembimbing.dosens[0].nip_ynaa,
                    nama: dataPembimbing.dosens[0].nama,
                    kouta_bimbingan: dataPembimbing.kouta_bimbingan,
                    jenjang_pendidikan: dataPembimbing.jenjangPendidikans[0].nama_jenjang_pendidikan,
                    fakultas: dataPembimbing.fakultas[0].nama_fakultas,
                    prodi: dataPembimbing.prodis[0].nama_prodi
                },
                data: result
            })
        }).catch(err => {
            next(err)
        })
    },

    verifikasiDosenPembimbing: async (req, res, next) => {
        const nipy = req.params.nipy
        const dosenUse = await dosenModel.findOne({
            where: {
                nip_ynaa: nipy,
                status: "aktif"
            }
        })
        if (!dosenUse) return res.status(404).json({ message: "Data Tidak Ditemukan" })
        await pembimbingAkademik.findOne({
            where: {
                dosen: nipy,
                status: "aktif"
            }
        }).then(result => {
            res.status(201).json({
                message: "Data ditemukan",
                data: result
            })
        }).catch(err => {
            next(err)
        })
    }
}