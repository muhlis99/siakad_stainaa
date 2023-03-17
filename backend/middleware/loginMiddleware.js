const user = require('../models/loginModel.js')

exports.modules = {
    verifyUser : async (req, res, next) => {
        if(!req.session.userId) {
            return res.status(401).json({
                message : "Mohon login menggunakan akun anda"
            })
        }
        const userUse = await user.findOne({
            where : {
                id : req.session.userId
            }
        })
        if (!userUse) return res.status(404).json({message:"user tidak ditemukan"})
        req.userId = user.id
        req.role =  user.role
        next()
    },

    adminOnly : async(req, res, next) => {
        const userUse = await user.findOne({
            where : {
                id : req.session.userId
            }
        })
        if (!userUse) return res.status(404).json({message:"user tidak ditemukan"})
        if (user.role !== "admin") return res.status(403).json({message:"Access terlarang"})
        next()
    }
}