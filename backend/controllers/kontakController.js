const kontakModel = require('../models/kontakModel.js')
const { Sequelize, Op, DataTypes, QueryTypes } = require('sequelize')
const db = require('../config/database.js')


module.exports = {
    getKontak: async (req, res, next) => {
        const kontak = req.query.codekontak
        const level = req.query.level
        await kontakModel.findAll({
            where: {
                code_kontak: {
                    [Op.not]: kontak,
                },
                level: {
                    [Op.not]: level
                },
                status: "aktif"
            }
        }).then(datas => {
            res.status(201).json({
                message: "Get all kontak",
                data: datas
            })
        }).catch(err => {
            console.log(err);
        })
    },

    getMemberByKontak: async (req, res, next) => {
        const kontak = req.query.kontak
        await db.query(`SELECT * FROM tb_detail_kontak INNER JOIN tb_kontak ON tb_detail_kontak.kontak=tb_kontak.code_kontak WHERE tb_detail_kontak.kontak="${kontak}"`, {
            nest: true,
            type: QueryTypes.SELECT
        }).then(result => {
            res.status(200).json({
                message: "Get all kontak by member",
                data: result
            })
        }).catch(err => {
            next(err)
        })
    },

    checkKontak: async (req, res, next) => {
        const email = req.params.email
        await kontakModel.findOne({
            where: {
                email: email,
                status: "aktif"
            }
        }).then(result => {
            if (!result) {
                return res.status(404).json({
                    message: "Data kontak tidak ditemukan",
                    data: null
                })
            }
            res.status(201).json({
                message: "Data kontak Ditemukan",
                data: result
            })
        }).catch(err => {
            next(err)
        })
    },

    registrasiKontak: async (req, res, next) => {
        const { username, email, level } = req.body
        let newLevel = ""
        if (level == "mahasiswa") {
            newLevel = "mhs"
        } else {
            newLevel = "dsn"
        }
        let codeKontak = newLevel + Math.floor(100000000 + Math.random() * 900000000)
        await kontakModel.create({
            code_kontak: codeKontak,
            username: username,
            email: email,
            status: "aktif",
            level: level
        }).then(result => {
            res.status(201).json({
                message: "Data registrasi berhasil disimpan"
            })
        }).catch(err => {
            console.log(err)
        })
    },

    createMemberKontak: async (req, res, next) => {
        const { kontak, memberKontak } = req.body
        const data = await db.query(`SELECT * FROM tb_detail_kontak WHERE member_kontak="${kontak}"`, {
            nest: true,
            type: QueryTypes.SELECT
        })
        if (data[0] == null) {
            const codeKontak = "dsn-mhs" + Math.floor(100000000000 + Math.random() * 900000000000)
            await db.query(`INSERT INTO tb_detail_kontak (id_detail_kontak,kontak,member_kontak,status,code_detail_kontak) VALUES (DEFAULT,"${kontak}","${memberKontak}","aktif","${codeKontak}")`)
                .then(result => {
                    res.status(201).json({ message: "Data kontak member berhasil disimpan" })
                })
        } else {
            if (memberKontak == data[0].kontak) {
                const codeDetailKontak = data[0].code_detail_kontak
                await db.query(`INSERT INTO tb_detail_kontak (id_detail_kontak,kontak,member_kontak,status,code_detail_kontak) VALUES (DEFAULT,"${kontak}","${memberKontak}","aktif","${codeDetailKontak}")`)
                    .then(result => {
                        res.status(201).json({ message: "Data kontak member berhasil disimpan" })
                    })
            } else {
                const codeKontak = "dsn-mhs" + Math.floor(100000000000 + Math.random() * 900000000000)
                await db.query(`INSERT INTO tb_detail_kontak (id_detail_kontak,kontak,member_kontak,status,code_detail_kontak) VALUES (DEFAULT,"${kontak}","${memberKontak}","aktif","${codeKontak}")`)
                    .then(result => {
                        res.status(201).json({ message: "Data kontak member berhasil disimpan" })
                    })
            }
        }
    }
}