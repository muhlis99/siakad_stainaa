const { Op, Sequelize } = require("sequelize")
const dosenModel = require("../models/dosenModel")
const mahasiswaModel = require("../models/mahasiswaModel")
const prodiModel = require("../models/prodiModel")

module.exports = {
    totalMahasiswaPutera: async (req, res, next) => {
        await mahasiswaModel.count({
            where: {
                jenis_kelamin: "l",
                status: "aktif"
            }
        }).then(result => {
            res.status(200).json({
                message: "total mahasisawa putera succes",
                data: result,
            })
        }).catch(err => {
            next(err)
        })
    },

    totalMahasiswaPuteri: async (req, res, next) => {
        await mahasiswaModel.count({
            where: {
                jenis_kelamin: "p",
                status: "aktif"
            }
        }).then(result => {
            res.status(200).json({
                message: "total mahasisawa puteri succes",
                data: result,
            })
        }).catch(err => {
            next(err)
        })
    },

    totalDosen: async (req, res, next) => {
        await dosenModel.count({
            where: {
                status: "aktif"
            }
        }).then(result => {
            res.status(200).json({
                message: "total dosen  succes",
                data: result,
            })
        }).catch(err => {
            next(err)
        })
    },

    totalProdi: async (req, res, next) => {
        await prodiModel.count({
            where: {
                status: "aktif"
            }
        }).then(result => {
            res.status(200).json({
                message: "total prodi  succes",
                data: result,
            })
        }).catch(err => {
            next(err)
        })
    },

    diagramMahasiswa: async (req, res, next) => {
        await mahasiswaModel.findAll({
            attributes: [
                [Sequelize.literal('YEAR(tanggal_masuk_kuliah)'), 'tahun'],
                [Sequelize.literal('COUNT(id_mahasiswa)'), 'jumlahMahasiswa']
            ],
            where: {
                nim: { [Op.ne]: null },
                tanggal_masuk_kuliah: { [Op.ne]: null },
                status: "aktif",
            },
            group: [[Sequelize.literal('YEAR(tanggal_masuk_kuliah)')]]
        }).then(result => {
            res.status(200).json({
                message: "total prodi  succes",
                data: result,
            })
        }).catch(err => {
            console.log(err);
        })
    }
}