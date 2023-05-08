const user = require('../models/loginModel.js')
const argon = require('argon2')
const nodemailer = require('nodemailer')

module.exports = {
    login: async (req, res, next) => {
        const userUse = await user.findOne({
            where: {
                name: req.body.name
            }
        })
        if (!userUse) return res.status(401).json({ msg: "data tidak ditemukan" })
        const verfiyPass = await argon.verify(userUse.password, req.body.password)
        if (!verfiyPass) return res.status(400).json({ msg: "password salah" })
        req.session.userId = userUse.id
        const id = userUse.id
        const name = userUse.name
        const email = userUse.email
        const role = userUse.role
        res.status(200).json({
            msg: "login suksess",
            id, name, email, role
        })
    },

    me: async (req, res, next) => {
        if (!req.session.userId) {
            return res.status(401).json({
                msg: "Mohon login menggunakan akun anda"
            })
        }
        const userUse = await user.findOne({
            attributes: ["id", "name", "email", "role"],
            where: {
                id: req.session.userId
            }
        })
        if (!userUse) return res.status(404).json({ msg: "user tidak ditemukan" })
        res.status(200).json({ msg: "selamat datang", data: userUse })
    },

    logout: async (req, res, next) => {
        try {
            req.session.destroy((err) => {
                if (err) return res.status(400).json({ msg: "Tidak dapat logout" })
                res.status(200).json({ msg: "Anda telah logout" })
            })
        } catch (err) {
            next(err)
        }
    },

    forgot: async (req, res, nest) => {
        const email = req.body.email
        let randomNumber = Math.floor(Math.random() * 1000000)
        const emailUse = await user.findOne({
            where: {
                email: email
            }
        })
        if (!emailUse) return res.status(404).json({ msg: "Tidak dapat menemukan akun email anda" })
        let testAccount = await nodemailer.createTestAccount()
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "muhammadbwi13@gmail.com",
                pass: "xzhltcpsznbllacw",
            }
        })

        try {
            await user.update({
                verify_code: randomNumber,
            }, {
                where: {
                    email: email
                }
            }).
                then(result => {
                    res.status(201).json({
                        msg: "Email >>>>>> ????"
                    })
                })

            await transporter.sendMail({
                from: 'muhammadbwi13@gmail.com',
                to: `${email}`,
                subject: "kode verivikasi anda",
                text: 'jangan disebarakan pada orang lain',
                html: `<div class="card" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title"> Ini Kode verifikasi anda ${email}</h5>
                                <p class="card-text">${randomNumber}</p>
                            </div>
                        </div>`
            })

        } catch (err) {
            next(err)
        }
    },

    verifyCode: async (req, res, next) => {
        const code = req.body.code
        const codeUse = await user.findOne({
            where: {
                verify_code: code
            }
        })
        if (!codeUse) return res.status(404).json({ msg: "data tidak ditemukan" })
        try {
            await user.update({
                verify_code: ""
            }, {
                where: {
                    id: codeUse.id
                }
            })
            req.session.userId = codeUse.id
            const id = codeUse.id
            const name = codeUse.name
            const email = codeUse.email
            const role = codeUse.role
            res.status(200).json({
                msg: "login suksess && ganti password berhasil",
                id, name, email, role
            })
        } catch (err) {
            next(err)
        }

    }
}