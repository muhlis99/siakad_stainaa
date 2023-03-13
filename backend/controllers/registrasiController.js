const registrasi = require('../models/registrasiModel.js')

module.exports = {
    all : async (req, res, next) => {
        await registrasi.findAll().
            then(all => {
                res.status(200).json({
                    message : "Data Berhasil",
                    data : all
                })
            }).
            catch(error => {
                next()
            })
    }
}