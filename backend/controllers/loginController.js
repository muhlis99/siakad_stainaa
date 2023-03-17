const user = require('../models/loginModel.js')
const argon = require('argon2')

module.exports = {
    login : async (req, res, next) => {
        const userUse = await user.findOne({
            where : {
                name : req.body.name
            }
        })
        if(!userUse) return res.status(401).json({message : "data tidak ditemukan"})
        const verfiyPass = await argon.verify(userUse.password, req.body.password)
        if(!verfiyPass) return res.status(400).json({message : "password salah"})
        req.session.userId = userUse.id
        const id = userUse.id
        const name = userUse.name
        const email = userUse.email
        const role = userUse.role
        res.status(200).json({
            message:"login suksess",
            id,name,email,role
        })
    },

    me : async (req, res, next) => {
        if(!req.session.userId) {
            return res.status(401).json({
                message : "Mohon login menggunakan akun anda"
            })
        }
        const userUse = await user.findOne({
            attributes : ["id","name","email","role"],
            where : {
                id : req.session.userId
            }
        })
        if (!userUse) return res.status(404).json({message:"user tidak ditemukan"})
        res.status(200).json({message : "selamat datang", data:userUse})
    },

    logout : async (req, res, next) => {
        try {
            req.session.destroy((err) => {
                if(err) return res.status(400).json({message:"Tidak dapat logout"})
                res.status(200).json({message:"Anda telah logout"})
            })
        } catch (err) {
            next(err)
        }
    }
}