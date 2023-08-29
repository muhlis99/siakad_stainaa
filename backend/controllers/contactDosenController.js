const contactMahasiswaModel = require('../models/contactMahasiswaModel.js')
const contactDosenModel = require('../models/contactDosenModel.js')
const { Sequelize, Op, DataTypes, QueryTypes } = require('sequelize')
const db = require('../config/database.js')


module.exports = {
    getContact: async (req, res, next) => {
        const contactDosen = req.query.contactDosen
        await db.query(`SELECT * FROM tb_detail_contact WHERE contact = ${contactDosen}`, {
            nest: true,
            type: QueryTypes.SELECT
        }).then(result => {
            res.status(200).json({
                message: "Get all contact dosen success",
                data: result
            })
        }).catch(err => {
            next(err)
        })
    },

    getContactByDosen: async (req, res, next) => {
        const dosen = req.query.dosen
        const dataMemberDosen = await db.query(`SELECT * FROM tb_detail_contact WHERE contact = ${dosen}`, {
            nest: true,
            type: QueryTypes.SELECT
        })
        const setDataMemberDosen = dataMemberDosen.map(i => { return i.member_contact })
        await contactMahasiswaModel.findAll({
            where: {
                code_contact_mahasiswa: {
                    [Op.not]: setDataMemberDosen
                }
            }
        }).then(all => {
            res.status(200).json({
                message: "Get all contact mahasiswa by Dosen success",
                data: all
            })
        }).catch(err => {
            next(err)
        })
    },

    checkContactDosen: async (req, res, next) => {
        const email = req.params.email
        await contactDosenModel.findOne({
            where: {
                email: email,
                status: "aktif"
            }
        }).then(result => {
            if (!result) {
                return res.status(404).json({
                    message: "Data contact dosen tidak ditemukan",
                    data: null
                })
            }
            res.status(201).json({
                message: "Data contact dosenDitemukan",
                data: result
            })
        }).catch(err => {
            next(err)
        })
    },

    registrasiContactDosen: async (req, res, next) => {
        const { username, email } = req.body
        let codeContact = "dns" + Math.floor(100000000 + Math.random() * 900000000)
        await contactDosenModel.create({
            code_contact_dosen: codeContact,
            username: username,
            email: email,
            status: "aktif"
        }).then(result => {
            res.status(201).json({
                message: "Data registrasi berhasil disimpan"
            })
        }).catch(err => {
            next(err)
        })
    },

    memberContactDosen: async (req, res, next) => {
        const { contactDosen, contactMember } = req.body
        const dataMember = contactMember.map(async i => {
            await db.query(`INSERT INTO tb_detail_contact(id_detail_contact,contact,member_contact,status) VALUES(DEFAULT,${contactDosen}, ${i},"aktif")`)
        })
        if (dataMember) {
            return res.status(201).json({ message: "Data contact member berhasil disimpan" })
        } else {
            next(err)
        }
    }
}