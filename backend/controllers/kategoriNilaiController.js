const kategoriNilaiModel = require('../models/kategoriNilaiModel.js')
const { Op } = require('sequelize')
const tahunAjaranModel = require('../models/tahunAjaranModel.js')

module.exports = {
    getAll: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = (currentPage - 1) * perPage
        const totalPage = await kategoriNilaiModel.count({
            include: [{
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }],
            where: {
                [Op.or]: [
                    {
                        id_kategori_nilai: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_kategori_nilai: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nilai_angka: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nilai_huruf: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        keterangan: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        status: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: "aktif"
            }
        })
        const totalItems = Math.ceil(totalPage / perPage)
        await kategoriNilaiModel.findAll({
            include: [{
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }],
            where: {
                [Op.or]: [
                    {
                        id_kategori_nilai: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        code_kategori_nilai: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nilai_angka: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nilai_huruf: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        keterangan: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        status: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status: "aktif"
            },
            offset: offset,
            limit: perPage,
            order: [
                ["id_kategori_nilai", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All kategori Nilai Success",
                    data: result,
                    total_data: totalPage,
                    per_page: perPage,
                    current_page: currentPage,
                    total_page: totalItems
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getById: async (req, res, next) => {
        const id = req.params.id
        await kategoriNilaiModel.findOne({
            include: [{
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }],
            where: {
                id_kategori_nilai: id,
                status: "aktif"
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data kategori Nilai Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data kategori Nilai Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    post: async (req, res, next) => {
        const { code_tahun_ajaran, nilai_angka, nilai_huruf, interfal_skor, kategori, keterangan } = req.body
        const codekategoriNilai = nilai_huruf.replace(/[^\w\s]/g, '') + nilai_angka.replace(/[^\w\s]/g, '')
        const kategoriNilaiModelUse = await kategoriNilaiModel.findOne({
            where: {
                code_tahun_ajaran: code_tahun_ajaran,
                code_kategori_nilai: codekategoriNilai,
                nilai_angka: nilai_angka,
                nilai_huruf: nilai_huruf,
                interfal_skor: interfal_skor,
            }
        })
        if (kategoriNilaiModelUse) return res.status(401).json({ message: "data kategori Nilai sudah ada" })
        await kategoriNilaiModel.create({
            code_tahun_ajaran: code_tahun_ajaran,
            code_kategori_nilai: codekategoriNilai,
            nilai_angka: nilai_angka,
            nilai_huruf: nilai_huruf,
            interfal_skor: interfal_skor,
            kategori: kategori,
            keterangan: keterangan,
            status: "aktif",
        }).
            then(result => {
                res.status(201).json({
                    message: "Data kategori Nilai success Ditambahkan",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    put: async (req, res, next) => {
        const id = req.params.id
        const kategoriNilaiModelUse = await kategoriNilaiModel.findOne({
            where: {
                id_kategori_nilai: id,
                status: "aktif"
            }
        })
        if (!kategoriNilaiModelUse) return res.status(401).json({ message: "Data kategori Nilai tidak ditemukan" })
        const { code_tahun_ajaran, nilai_angka, nilai_huruf, interfal_skor, kategori, keterangan } = req.body
        const codekategoriNilai = nilai_huruf.replace(/[^\w\s]/g, '') + nilai_angka.replace(/[^\w\s]/g, '')
        const kategoriNilaiModelDuplicate = await kategoriNilaiModel.findOne({
            where: {
                code_tahun_ajaran: code_tahun_ajaran,
                code_kategori_nilai: codekategoriNilai,
                nilai_angka: nilai_angka,
                nilai_huruf: nilai_huruf,
                interfal_skor: interfal_skor,
            }
        })
        if (kategoriNilaiModelDuplicate) return res.status(401).json({ message: "data kategori Nilai sudah ada" })
        await kategoriNilaiModel.update({
            code_tahun_ajaran: code_tahun_ajaran,
            code_kategori_nilai: codekategoriNilai,
            nilai_angka: nilai_angka,
            nilai_huruf: nilai_huruf,
            interfal_skor: interfal_skor,
            kategori: kategori,
            keterangan: keterangan,
        }, {
            where: {
                id_kategori_nilai: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data kategori Nilai success Diupdate",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    delete: async (req, res, next) => {
        const id = req.params.id
        const kategoriNilaiModelUse = await kategoriNilaiModel.findOne({
            where: {
                id_kategori_nilai: id,
                status: "aktif"
            }
        })
        if (!kategoriNilaiModelUse) return res.status(401).json({ message: "Data kategori Nilai tidak ditemukan" })
        await kategoriNilaiModel.update({
            status: "tidak",
        }, {
            where: {
                id_kategori_nilai: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "data kategori Nilai succes dihapus"
                })
            }).
            catch(err => {
                next(err)
            })
    }
}