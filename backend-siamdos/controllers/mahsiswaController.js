const mahasiswa = require('../models/mahasiswaModel.js')
const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const fakultasModel = require('../models/fakultasModel.js')
const prodiModel = require('../models/prodiModel.js')
const historyMahasiswa = require('../models/historyMahasiswaModel.js')
const { desa, kecamatan, kabupaten, provinsi, negara } = require('../models/equipmentDsnMhsModel.js')
const { Op, DataTypes } = require('sequelize')
const Sequelize = require('../config/database.js')
const path = require('path')
const fs = require('fs')
const readXlsxFile = require('read-excel-file/node')
const QRCode = require("qrcode");
const { createCanvas, loadImage } = require("canvas");
const registrasi = require('../models/loginModel.js')
const argon = require('argon2')

module.exports = {

    getById: async (req, res, next) => {
        const id = req.params.id
        const mahasiswaUse = await mahasiswa.findOne({
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
                model: negara
            }, {
                model: provinsi
            }, {
                model: kabupaten
            }, {
                model: kecamatan
            }, {
                model: desa
            }],
            where: {
                id_mahasiswa: id,
                status: "aktif"
            }
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data Mahasiswa Tidak Ditemukan",
                        data: []
                    })
                }
                res.status(201).json({
                    message: "Data Mahasiswa Ditemukan",
                    data: result
                })
            }).
            catch(err => {
                next(err)
            })
    },
    //  user
    getByNim: async (req, res, next) => {
        const nim = req.params.nim
        const mahasiswaUse = await mahasiswa.findOne({
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
                model: negara
            }, {
                model: provinsi
            }, {
                model: kabupaten
            }, {
                model: kecamatan
            }, {
                model: desa
            }],
            where: {
                nim: nim,
                status: "aktif"
            }
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data Mahasiswa Tidak Ditemukan",
                        data: []
                    })
                }
                res.status(201).json({
                    message: "Data Mahasiswa Ditemukan",
                    data: result
                })
            }).
            catch(err => {
                next(err)
            })
    },
}

