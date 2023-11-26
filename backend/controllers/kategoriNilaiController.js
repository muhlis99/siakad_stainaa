const kategoriNilaiModel = require('../models/kategoriNilaiModel.js')
const { Op } = require('sequelize')
const tahunAjaranModel = require('../models/tahunAjaranModel.js')

module.exports = {
    getAll: async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const codeThnAjr = req.query.codeThnAjr || ""
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
                        nilai_atas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nilai_bawah: {
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
                status: "aktif",
                code_tahun_ajaran: {
                    [Op.like]: `%${codeThnAjr}%`
                }
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
                        nilai_atas: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nilai_bawah: {
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
                status: "aktif",
                code_tahun_ajaran: {
                    [Op.like]: `%${codeThnAjr}%`
                }
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
        const { code_tahun_ajaran, nilai_atas, nilai_bawah, nilai_huruf, interfal_skor, kategori, keterangan } = req.body
        let randomNumber = Math.floor(100 + Math.random() * 900)
        const codekategoriNilai = randomNumber + nilai_huruf.replace(/[^\w\s]/g, '')
        const kategoriNilaiModelUse = await kategoriNilaiModel.findOne({
            where: {
                code_tahun_ajaran: code_tahun_ajaran,
                code_kategori_nilai: codekategoriNilai,
                nilai_atas: nilai_atas,
                nilai_bawah: nilai_bawah,
                nilai_huruf: nilai_huruf,
                interfal_skor: interfal_skor,
            }
        })
        if (kategoriNilaiModelUse) return res.status(401).json({ message: "data kategori Nilai sudah ada" })
        await kategoriNilaiModel.create({
            code_tahun_ajaran: code_tahun_ajaran,
            code_kategori_nilai: codekategoriNilai,
            nilai_atas: nilai_atas,
            nilai_bawah: nilai_bawah,
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

    salinData: async (req, res, next) => {
        const { code_tahun_ajaran_baru, code_tahun_ajaran_lama } = req.body
        const dataLawas = await kategoriNilaiModel.findAll({
            where: {
                code_tahun_ajaran: code_tahun_ajaran_lama,
                status: "aktif"
            }
        })
        const datasLawas = dataLawas.map(async el => {
            await kategoriNilaiModel.create({
                code_tahun_ajaran: code_tahun_ajaran_baru,
                code_kategori_nilai: el.code_kategori_nilai,
                nilai_atas: el.nilai_atas,
                nilai_bawah: el.nilai_bawah,
                nilai_huruf: el.nilai_huruf,
                interfal_skor: el.interfal_skor,
                kategori: el.kategori,
                keterangan: el.keterangan,
                status: el.status,
            })
        })
        if (datasLawas) {
            return res.status(201).json({ message: "Data kategori Nilai succes ditambahkan" })
        } else {
            return res.status(401).json({ message: "Data kategori Nilai succes ditambahkan" })
        }

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
        const { code_tahun_ajaran, nilai_atas, nilai_bawah, nilai_huruf, interfal_skor, kategori, keterangan } = req.body
        const codekategoriNilai = nilai_huruf.replace(/[^\w\s]/g, '')
        const kategoriNilaiModelDuplicate = await kategoriNilaiModel.findOne({
            where: {
                code_tahun_ajaran: code_tahun_ajaran,
                code_kategori_nilai: codekategoriNilai,
                nilai_atas: nilai_atas,
                nilai_bawah: nilai_bawah,
                nilai_huruf: nilai_huruf,
                interfal_skor: interfal_skor,
            }
        })
        if (kategoriNilaiModelDuplicate) return res.status(401).json({ message: "data kategori Nilai sudah ada" })
        await kategoriNilaiModel.update({
            code_tahun_ajaran: code_tahun_ajaran,
            // code_kategori_nilai: codekategoriNilai,
            nilai_atas: nilai_atas,
            nilai_bawah: nilai_bawah,
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