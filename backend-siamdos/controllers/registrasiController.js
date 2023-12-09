const registrasi = require('../models/loginModel.js')
const argon = require('argon2')
const { Op } = require('sequelize')

module.exports = {
    getById: async (req, res, next) => {
        const id = req.params.id
        await registrasi.findOne({
            where: {
                id: id,
                status: "aktif"
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data Registrasi Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data Registrasi Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    put: async (req, res, next) => {
        const id = req.params.id
        const registrasiUse = await registrasi.findOne({
            where: {
                id: id,
                status: "aktif"
            }
        })
        if (!registrasiUse) return res.status(401).json({ message: "user tidak ditemukan" })
        const { username, email, password, confirmPassword, role } = req.body
        if (password != confirmPassword) return res.status(400).json({ message: "Password yang anda masukkan salah" })
        let hashPassword
        if (password === "" || password === null) {
            hashPassword = registrasiUse.password
        } else {
            hashPassword = await argon.hash(password)
        }
        try {
            await registrasi.update({
                username: username,
                email: email,
                password: hashPassword,
                role: role
            }, {
                where: {
                    id: id,
                    status: "aktif"
                }
            }).
                then(result => {
                    res.status(201).json({
                        message: "Data success diupdate"
                    })
                })
        } catch (err) {
            next(err)
        }
    }
}