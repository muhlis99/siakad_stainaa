const registrasi = require('../models/loginModel.js')
const argon = require('argon2')
const { Op } = require('sequelize')

module.exports = {
    get: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = req.query.perPage || 10
        const search = req.query.search || ""
        await registrasi.findAndCountAll({
            where: {
                [Op.or]: [
                    {
                        id: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        username: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        email: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        role: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            }
        }).
            then(all => {
                totalItems = all.count
                return registrasi.findAll({
                    where: {
                        [Op.or]: [
                            {
                                id: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                username: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                email: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                role: {
                                    [Op.like]: `%${search}%`
                                }
                            }
                        ]
                    },
                    offset: (currentPage - 1) * parseInt(perPage),
                    limit: parseInt(perPage),
                    order: [
                        ["id", "DESC"]
                    ]
                })
            }).
            then(result => {
                const totalPage = Math.ceil(totalItems / perPage)
                res.status(200).json({
                    message: "Get All Jenjang Pendidikan Success",
                    data: result,
                    total_data: totalItems,
                    per_page: perPage,
                    current_page: currentPage,
                    total_page: totalPage
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getById: async (req, res, next) => {
        const id = req.params.id
        await registrasi.findOne({
            where: {
                id: id
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

    post: async (req, res, next) => {
        const { username, email, password, confirmPassword, role } = req.body
        const hashPassword = await argon.hash(password)
        await registrasi.create({
            username: username,
            email: email,
            password: hashPassword,
            role: role,
            verify_code: ""
        }).
            then(result => {
                res.status(201).json({
                    message: "Data Registrasi success Ditambahkan",
                    data: result
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
                id: id
            }
        })
        if (!registrasiUse) return res.status(401).json({ message: "user tidak ditemukan" })
        const { username, email, password, confirmPassword, role } = req.body
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
                    id: id
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
    },

    delete: async (req, res, next) => {
        const id = req.params.id
        const registrasiUse = await registrasi.findOne({
            where: {
                id: id
            }
        })
        if (!registrasiUse) return res.status(401).json({ message: "user tidak ditemukan" })
        try {
            await registrasi.destroy({
                where: {
                    id: registrasiUse.id
                }
            }).
                then(result => {
                    res.status(201).json({
                        message: "data success dihapus",
                    })
                })
        } catch (err) {
            next(err)
        }
    }
}