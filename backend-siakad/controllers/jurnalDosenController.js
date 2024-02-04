const dosenModel = require('../models/dosenModel.js')
const jadwalKuliahModel = require('../models/jadwalKuliahModel.js')
const jadwalPertemuanModel = require('../models/jadwalPertemuanModel.js')
const jurnalDosenModel = require('../models/jurnalDosenModel.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const sebaranMataKuliah = require('../models/sebaranMataKuliah.js')
const { Op } = require('sequelize')


module.exports = {
    getAll: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = (currentPage - 1) * perPage
        const { codeJadkul } = req.params
        const dataJadwalKuliah = await jadwalPertemuanModel.findAll({
            where: {
                code_jadwal_kuliah: codeJadkul,
                status: "aktif"
            }
        })
        const dataJadwalKuliahUse = dataJadwalKuliah.map(rs => { return rs.code_jadwal_pertemuan })

        const totalPage = await jurnalDosenModel.count({
            include: [{
                attributes: ["nama", "nip_ynaa"],
                model: dosenModel,
            }],
            where: {
                [Op.or]: [
                    {
                        id_jurnal_dosen: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_jurnal_dosen: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nip_ynaa: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        tanggal: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        materi_pembahasan: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: "aktif",
                code_jadwal_pertemuan: dataJadwalKuliahUse
            }
        })
        const totalItems = Math.ceil(totalPage / perPage)
        await jurnalDosenModel.findAll({
            include: [{
                attributes: ["nama", "nip_ynaa"],
                model: dosenModel,
            }],
            where: {
                [Op.or]: [
                    {
                        id_jurnal_dosen: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_jurnal_dosen: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nip_ynaa: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        tanggal: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        materi_pembahasan: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: "aktif",
                code_jadwal_pertemuan: dataJadwalKuliahUse
            },
            offset: offset,
            limit: perPage,
            order: [
                ["id_jurnal_dosen", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All jurnal dosen Success",
                    data: result,
                    total_data: totalPage,
                    per_page: perPage,
                    current_page: currentPage,
                    total_page: totalItems
                })
            }).
            catch(err => {
                console.log(err)
            })
    },

    getById: async (req, res, next) => {
        const id = req.params.id
        await jurnalDosenModel.findOne({
            include: [{
                attributes: ["nama", "nip_ynaa"],
                model: dosenModel,
            }],
            where: {
                id_jurnal_dosen: id,
                status: "aktif"
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data jurnal dosen Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data jurnal dosen Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getMakul: async (req, res, next) => {
        const { thn, smt, jnj, fks, prd } = req.params
        await jadwalKuliahModel.findAll({
            include: [
                {
                    attributes: ["id_sebaran", "code_sebaran", "status_makul", "status_bobot_makul"],
                    model: sebaranMataKuliah,
                    where: {
                        code_tahun_ajaran: thn,
                        code_semester: smt,
                        status: "aktif"
                    },
                    include: [{
                        attributes: ["id_mata_kuliah", "nama_mata_kuliah", "jenis_mata_kuliah", "sks"],
                        model: mataKuliahModel
                    }]
                },
                {
                    attributes: ['nama'],
                    model: dosenModel,
                    as: "dosenPengajar"
                }
            ],
            where: {
                code_tahun_ajaran: thn,
                code_semester: smt,
                code_jenjang_pendidikan: jnj,
                code_fakultas: fks,
                code_prodi: prd,
                status: "aktif"
            }
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data mata kuliah yang diampu Tidak Ditemukan",
                        data: []
                    })
                }
                res.status(201).json({
                    message: "Data mata kuliah yang diampu Ditemukan",
                    data: result
                })
            }).
            catch(err => {
                next(err)
            })
    }
}