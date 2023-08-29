const contactMahasiswaModel = require('../models/contactMahasiswaModel.js')
const contactDosenModel = require('../models/contactDosenModel.js')
const { Sequelize, Op, DataTypes, QueryTypes } = require('sequelize')
const db = require('../config/database.js')


module.exports = {
    getContact: async (req, res, next) => {
        const contactMahasiswa = req.query.contactMahasiswa
        await db.query(`SELECT * FROM tb_detail_contact WHERE contact = ${contactMahasiswa}`, {
            nest: true,
            type: QueryTypes.SELECT
        }).then(result => {
            res.status(200).json({
                message: "Get all contact mahasiswa success",
                data: result
            })
        }).catch(err => {
            next(err)
        })
    },

    getContactByMahasiswa: async (req, res, next) => {
        const mahasiswa = req.query.mahasiswa
        const dataMemberMahasiswa = await db.query(`SELECT * FROM tb_detail_contact WHERE contact = ${mahasiswa}`, {
            nest: true,
            type: QueryTypes.SELECT
        })
        const setDataMemberMahasiswa = dataMemberMahasiswa.map(i => { return i.member_contact })
        console.log(setDataMemberMahasiswa);
        await contactDosenModel.findAll({
            where: {
                code_contact_dosen: {
                    [Op.not]: setDataMemberMahasiswa
                }
            }
        }).then(all => {
            res.status(200).json({
                message: "Get all contact dosen by Mahasiswa success",
                data: all
            })
        }).catch(err => {
            next(err)
        })
    },

    checkContactMahasiswa: async (req, res, next) => {
        const email = req.params.email
        await contactMahasiswaModel.findOne({
            where: {
                email: email,
                status: "aktif"
            }
        }).then(result => {
            if (!result) {
                return res.status(404).json({
                    message: "Data contact mahasiswa tidak ditemukan",
                    data: null
                })
            }
            res.status(201).json({
                message: "Data contact mahasiswa Ditemukan",
                data: result
            })
        }).catch(err => {
            next(err)
        })
    },

    registrasiContactMahasiswa: async (req, res, next) => {
        const { username, email } = req.body
        let codeContact = "mhs" + Math.floor(100000000 + Math.random() * 900000000)
        await contactMahasiswaModel.create({
            code_contact_mahasiswa: codeContact,
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

    memberContactMahasiswa: async (req, res, next) => {
        const { contactMahasiswa, contactMember } = req.body
        const dataMember = contactMember.map(async i => {
            await db.query(`INSERT INTO tb_detail_contact(id_detail_contact,contact,member_contact,status) VALUES(DEFAULT,${contactMahasiswa}, ${i},"aktif")`)
        })
        if (dataMember) {
            return res.status(201).json({ message: "Data contact member berhasil disimpan" })
        } else {
            next(err)
        }
    }
}