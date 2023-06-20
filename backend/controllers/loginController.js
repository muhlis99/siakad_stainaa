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
        if (!userUse) return res.status(401).json({ message: "data tidak ditemukan" })
        const verfiyPass = await argon.verify(userUse.password, req.body.password)
        if (!verfiyPass) return res.status(400).json({ message: "password salah" })
        req.session.userId = userUse.id
        const id = userUse.id
        const name = userUse.name
        const email = userUse.email
        const role = userUse.role
        res.status(200).json({
            message: "login suksess",
            id, name, email, role
        })
    },

    me: async (req, res, next) => {
        if (!req.session.userId) {
            return res.status(401).json({
                message: "Mohon login menggunakan akun anda"
            })
        }
        const userUse = await user.findOne({
            attributes: ["id", "name", "email", "role"],
            where: {
                id: req.session.userId
            }
        })
        if (!userUse) return res.status(404).json({ message: "user tidak ditemukan" })
        res.status(200).json({ message: "selamat datang", data: userUse })
    },

    logout: async (req, res, next) => {
        try {
            req.session.destroy((err) => {
                if (err) return res.status(400).json({ message: "Tidak dapat logout" })
                res.status(200).json({ message: "Anda telah logout" })
            })
        } catch (err) {
            next(err)
        }
    },

    forgot: async (req, res, nest) => {
        const email = req.body.email
        let randomNumber = Math.floor(10000000 + Math.random() * 90000000)
        const emailUse = await user.findOne({
            where: {
                email: email
            }
        })
        if (!emailUse) return res.status(404).json({ message: "Tidak dapat menemukan akun email anda" })
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
                        message: "code verifikasi telah terkirim"
                    })
                })

            await transporter.sendMail({
                from: 'muhammadbwi13@gmail.com',
                to: `${email}`,
                subject: "Atur Ulang Kata Kunci Apliaksi Mahasiswa STAINAA",
                text: 'jangan disebarakan pada orang lain',
                html: `<div class="card" style="width: 60%; border: 1px solid black">
                            <div class="card-body">
                                <h5 class="card-title">Atur ulang kata kunci tinggal selangkah lagi.</h5>
                                <h5>Silahkan klik copy nomor dibawah ini untuk mengatur ulang kata kunci Anda; </h5>
                                <h3 style="color:blue" class="card-text">${randomNumber}</h3>
                                <h6>Catatan :</h6>
                                <h6>1. ini adalah email yang dikirim oleh server STAINAA atas permintaan anda ${new Date()}
                                untuk mengatur ulang kata kunci pada aplikasi SIAKAD STAINAA.</h6>
                                <h6>2. Abaikan email ini jika anda merasa tidak melakukannya.</h6>
                                <h6>3. ini adalah email otomatis, mohon tidak membalas email ini</h6>
                                <hr>
                                <h6>banyuwangi, ${new Date()} WIB </h6>
                                <h6>Sekolah Tinggi Agama Islam Nurul Abror Al-Robbaniyin </h6>
                                <h6>Pondok Pesantren Nurul Abror Al-Robbaniyin 68453 email : muhlis_ganteng@gmail.com</h6>
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
        if (!codeUse) return res.status(404).json({ message: "data tidak ditemukan" })
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
                message: "................",
                id, name, email, role
            })
        } catch (err) {
            next(err)
        }
    },

    resetPasswordByForgot: async (req, res, next) => {
        const id = req.params.id
        const { newPassword, confirmNewPassword } = req.body
        if (newPassword != confirmNewPassword) return res.status(400).json({ message: "Password yang anda masukkan salah" })
        const hashPassword = await argon.hash(newPassword)
        await user.update({
            password: hashPassword,
        }, {
            where: {
                id: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "...........>>>>>>>>>>>>"
                })
            })
    }
}