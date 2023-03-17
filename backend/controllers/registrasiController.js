const registrasi = require('../models/registrasiModel.js')
const argon = require('argon2')

module.exports = {
    all : async (req, res, next) => {
        const currentPage = req.query.page || 1
        const perPage = req.query.perPage || 10
        let totalItems
        await registrasi.findAndCountAll().
            then(all => {
                totalItems = all.count
                return registrasi.findAll({
                    offset : (parseInt(currentPage) - 1) * parseInt(perPage),
                    limit : parseInt(perPage)
                })
            }).
            then(result => {
                res.status(200).json({
                    message : "Get All Registrasi Success",
                    data : result,
                    total_data : totalItems,
                    per_page : perPage,
                    current_page : currentPage
                })
            }).
            catch(err => {
                next(err)
            })
        },

    getById : async(req, res, next) => {
        const id = req.params.id
        await registrasi.findOne({
            where : {
                id : id
            }
        }).
        then(getById => {
            if (!getById) {
                return res.status(404).json({
                    message : "Data Registrasi Tidak Ditemukan",
                    data : null
                })
            }
            res.status(201).json({
                message : "Data Registrasi Ditemukan",
                data : getById
            })
        }).
        catch(err => {
            next(err)
        })
    },

    post : async(req, res, next) => {
            const {name, email, password, confirmPassword, role} = req.body
            if(password !== confirmPassword) return res.status(404).json({
                message:"Password dan Confirm Password Salah"
            })
            const hashPassword = await argon.hash(password)
            await registrasi.create({
                name : name,
                email : email,
                password : hashPassword,
                role : role,
                verify_code : ""
            }).
            then(result => {
                res.status(201).json({
                    message : "Data Registrasi success Ditambahkan",
                    data : result
                })
            }).
            catch(err => {
                next(err)
            })
    },
}