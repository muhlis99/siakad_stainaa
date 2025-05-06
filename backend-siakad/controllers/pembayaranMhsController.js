const historyMahasiswa = require('../models/historyMahasiswaModel.js')
const mahasiswaModel = require('../models/mahasiswaModel.js')
const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const fakultasModel = require('../models/fakultasModel.js')
const prodi = require('../models/prodiModel.js')
const tahunAjaranModel = require('../models/tahunAjaranModel.js')
const semesterModel = require('../models/semesterModel.js')
const { Op } = require('sequelize')

module.exports = {
    getAllMahasiswa : async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = (currentPage - 1) * perPage
        const totalPage = await mahasiswaModel.count({
            include: [{
                model: jenjangPendidikanModel,
                attributes: ["nama_jenjang_pendidikan"],
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                attributes: ["nama_fakultas"],
                where: { status: "aktif" }
            }, {
                model: prodi,
                attributes: ["nama_prodi"],
                where: { status: "aktif" }
            }],
            where: {
                [Op.or]: [
                    {
                        id_mahasiswa: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nim: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nama: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: "aktif"
            }
        })
        const totalItems = Math.ceil(totalPage / perPage)
        await mahasiswaModel.findAll({
            include: [{
                model: jenjangPendidikanModel,
                attributes: ["nama_jenjang_pendidikan"],
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                attributes: ["nama_fakultas"],
                where: { status: "aktif" }
            }, {
                model: prodi,
                attributes: ["nama_prodi"],
                where: { status: "aktif" }
            }],
            where: {
                [Op.or]: [
                    {
                        id_mahasiswa: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nim: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nama: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: "aktif",
            },
            offset: offset,
            limit: perPage,
            order: [
                ["id_mahasiswa", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All Mahasiswa Success",
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

    getDetailMhs : async (req, res, next) => {
        const nim = req.params.nim
        await historyMahasiswa.findAll({
            include : [{
                model : mahasiswaModel,
                attributes : ["nama", "nim", "tanggal_lahir", "jenis_kelamin"]
            },{
                model : tahunAjaranModel,
                attributes : ["tahun_ajaran"]
            },{
                model : semesterModel,
                attributes : ["semester","keterangan"],
            },{
                model : jenjangPendidikanModel,
                attributes : ["nama_jenjang_pendidikan"]
            },{
                model : fakultasModel,
                attributes : ["nama_fakultas"]
            },{
                model : prodi,
                attributes : ["nama_prodi"]
            }],
            where: {
                nim: nim
            }
        }).
        then(getByNim => {
            if (!getByNim) {
                return res.status(404).json({
                    message: "Data Mahasiswa Tidak Ditemukan",
                    data: null
                })
            }
            res.status(201).json({
                message: "Data Mahasiswa Ditemukan",
                data: getByNim
            })
        }).
        catch(err => {
            next(err)
        })
    },

    // event update and insert pembayaran MHS
    updatePembayaran : async (req, res, next) => {
        const id = req.params.id
        const mahasiswaUse = await historyMahasiswa.findOne({
            where: {
                id_history: id,
                pembayaran: "tidak"
            }
        })
        if (!mahasiswaUse) return res.status(401).json({ message: "wrong" })
        await historyMahasiswa.update({
            pembayaran: "lunas"
        }, {
            where: {
                id_history: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "success"
                })
            }).
            catch(err => {
                next(err)
            })
    }


    
}