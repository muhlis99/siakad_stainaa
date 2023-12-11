const dosen = require('../models/dosenModel.js')
const { pendidikan, alatTransportasi } = require('../models/equipmentDsnMhsModel.js')
const { desa, kecamatan, kabupaten, provinsi, negara } = require('../models/equipmentDsnMhsModel.js')
const { Op } = require('sequelize')
const path = require('path')
const fs = require('fs')
const QRCode = require("qrcode");
const { createCanvas, loadImage } = require("canvas");
const registrasi = require('../models/loginModel.js')
const argon = require('argon2')

module.exports = {
    getById: async (req, res, next) => {
        const id = req.params.id
        await dosen.findOne({
            include: [{
                model: pendidikan
            }, {
                model: alatTransportasi
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
                id_dosen: id,
                status: 'aktif'
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data dosen Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data dosen Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },
    // user dosen
    getByNipy: async (req, res, next) => {
        const nipy = req.params.nipy
        await dosen.findOne({
            include: [{
                model: pendidikan
            }, {
                model: alatTransportasi
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
                nip_ynaa: nipy,
                status: 'aktif'
            }
        }).
            then(getByNipy => {
                if (!getByNipy) {
                    return res.status(404).json({
                        message: "Data dosen Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data dosen Ditemukan",
                    data: getByNipy
                })
            }).
            catch(err => {
                next(err)
            })
    },
}