const krsModel = require('../models/krsModel.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const tahunAjaranModel = require('../models/tahunAjaranModel.js')
const semesterModel = require('../models/semesterModel.js')
const historyMahasiswa = require('../models/historyMahasiswaModel.js')
const { Op, Sequelize } = require('sequelize')
const mahasiswaModel = require('../models/mahasiswaModel.js')

module.exports = {
    getAll: async (req, res, next) => {
        const tahunAjaran = req.query.tahunAjaran || 0
        const semester = req.query.semester || 0
        const jenjangPendik = req.query.jenjangPendik || 0
        const fakultas = req.query.fakultas || 0
        const prodi = req.query.prodi || 0

        const thnAjar = await tahunAjaranModel.findOne({
            attributes: ['tahun_ajaran'],
            where: {
                code_tahun_ajaran: tahunAjaran,
                status: "aktif"
            }
        })

        const smt = await semesterModel.findOne({
            attributes: ['semester'],
            where: {
                code_tahun_ajaran: tahunAjaran,
                code_semester: semester,
                status: "aktif"
            }
        })

        const paketmakul = await mataKuliahModel.findAndCountAll({
            where: {
                code_tahun_ajaran: tahunAjaran,
                code_semester: semester,
                code_jenjang_pendidikan: jenjangPendik,
                code_fakultas: fakultas,
                code_prodi: prodi,
                status_makul: "paket",
                status_bobot_makul: "wajib",
                status: "aktif"
            },
            include: [{
                model: semesterModel,
                attributes: ['semester'],
                status: "aktif"
            }]
        })

        if (paketmakul.count == 0) return res.status(401).json({ message: "data tidak ditemukan" })

        const jmlMahasiswa = await historyMahasiswa.findAndCountAll({
            where: {
                code_tahun_ajaran: tahunAjaran,
                code_semester: semester,
                code_jenjang_pendidikan: jenjangPendik,
                code_fakultas: fakultas,
                code_prodi: prodi,
                status: "aktif"
            },
            attributes: ['nim']
        })
        // validasi jumlah mahasiswa yang memaket mata kuliah
        var t = jmlMahasiswa.rows
        const validasimakul = t.map(v => { return v.nim })
        const jmlPaketMahasiswa = await krsModel.findAndCountAll({
            where: {
                nim: validasimakul,
                code_tahun_ajaran: tahunAjaran,
                code_semester: semester,
                code_jenjang_pendidikan: jenjangPendik,
                code_fakultas: fakultas,
                code_prodi: prodi,
                status: "aktif"
            },
            group: ['nim'],
        })

        const arrayPaketMakul = paketmakul.rows.map(al => {
            return al.code_mata_kuliah
        })
        const lastElemetArrayPaketMakul = arrayPaketMakul.pop()
        const jumlahPaketmakulKrs = await krsModel.count({
            where: {
                code_tahun_ajaran: tahunAjaran,
                code_semester: semester,
                code_jenjang_pendidikan: jenjangPendik,
                code_fakultas: fakultas,
                code_prodi: prodi,
                code_mata_kuliah: lastElemetArrayPaketMakul
            },
            include: [{
                model: semesterModel,
                attributes: ['semester'],
                status: "aktif"
            }, {
                model: mataKuliahModel,
                status_makul: "paket",
                status_bobot_makul: "wajib",
                status: "aktif"
            }]
        })

        var jumlah = ""
        var keterangan = ""
        if (jumlahPaketmakulKrs === null || jumlahPaketmakulKrs === 0) {
            jumlah = 0
            keterangan = "paket belum"
        } else {
            jumlah = jmlPaketMahasiswa.count[0].count
            keterangan = "paket selesai"
        }


        res.status(201).json({
            data: [{
                semester: smt.semester,
                tahun: thnAjar.tahun_ajaran,
                Paketmakul: paketmakul.count,
                jumlahMahasiswaPaket: jumlah,
                jumlahTotalMahasiswa: jmlMahasiswa.count,
                keterangan: keterangan,
            }]
        })

    },

    viewAll: async (req, res, next) => {
        const thnAjr = req.params.thnAjr
        const smt = req.params.smt
        const jenjPen = req.params.jenjPen
        const fks = req.params.fks
        const prd = req.params.prd

        await mataKuliahModel.findAndCountAll({
            where: {
                code_tahun_ajaran: thnAjr,
                code_semester: smt,
                code_jenjang_pendidikan: jenjPen,
                code_fakultas: fks,
                code_prodi: prd,
                status_bobot_makul: "wajib",
                status_makul: "paket",
                status: "aktif"
            }
        }).then(all => {
            if (!all) {
                return res.status(404).json({
                    message: "Data krs paket Tidak Ditemukan",
                    data: []
                })
            }
            res.status(201).json({
                message: "Data krs paket Ditemukan",
                data: all
            })
        })
    },

    post: async (req, res, next) => {
        const thnAjr = req.params.thnAjr
        const smt = req.params.smt
        const jenjPen = req.params.jenjPen
        const fks = req.params.fks
        const prd = req.params.prd


        const makul = await mataKuliahModel.findAll({
            attributes: ['code_mata_kuliah'],
            where: {
                code_tahun_ajaran: thnAjr,
                code_semester: smt,
                code_jenjang_pendidikan: jenjPen,
                code_fakultas: fks,
                code_prodi: prd,
                status_bobot_makul: "wajib",
                status_makul: "paket",
                status: "aktif"
            }
        })


        const Dtnim = await historyMahasiswa.findAll({
            attributes: ['nim'],
            where: {
                code_tahun_ajaran: thnAjr,
                code_semester: smt,
                code_jenjang_pendidikan: jenjPen,
                code_fakultas: fks,
                code_prodi: prd,
                status: "aktif"
            }
        })

        const makulInKrs = makul.map(al => {
            return al.code_mata_kuliah
        })

        const validasimakul = await krsModel.findOne({
            where: {
                code_mata_kuliah: makulInKrs,
                code_tahun_ajaran: thnAjr,
                code_semester: smt,
                code_jenjang_pendidikan: jenjPen,
                code_fakultas: fks,
                code_prodi: prd,
                status: "aktif"
            }
        })

        if (validasimakul) {
            const makulKrs = await krsModel.findAll({
                code_tahun_ajaran: thnAjr,
                code_semester: smt,
                code_jenjang_pendidikan: jenjPen,
                code_fakultas: fks,
                code_prodi: prd,
                status: "aktif"
            })
            const validasiMakulKrs = makulKrs.map(al => {
                return al.code_mata_kuliah
            })
            const paketmakulNew = await mataKuliahModel.findAll({
                where: {
                    code_tahun_ajaran: thnAjr,
                    code_semester: smt,
                    code_jenjang_pendidikan: jenjPen,
                    code_fakultas: fks,
                    code_prodi: prd,
                    status_bobot_makul: "wajib",
                    status_makul: "paket",
                    status: "aktif",
                    code_mata_kuliah: {
                        [Op.notIn]: validasiMakulKrs
                    }
                }
            })

            const data_body = paketmakulNew.map(Dn => {
                let data2 = Dn.code_mata_kuliah
                const datas = Dtnim.map(DM => {
                    let randomNumber = Math.floor(10000000 + Math.random() * 90000000)
                    return {
                        code_krs: randomNumber,
                        code_mata_kuliah: data2,
                        nim: DM.nim,
                        code_tahun_ajaran: thnAjr,
                        code_semester: smt,
                        code_jenjang_pendidikan: jenjPen,
                        code_fakultas: fks,
                        code_prodi: prd,
                        status_krs: "setuju",
                        status: "aktif"
                    }
                })
                krsModel.bulkCreate(datas)
            })
            if (data_body) {
                res.status(201).json({
                    message: "data krs paket succes ditambahkan"
                })
            } else {
                res.status(404).json({
                    message: "................."
                })
            }
        } else {
            const data_body = makul.map(Dn => {
                let data2 = Dn.code_mata_kuliah
                const datas = Dtnim.map(DM => {
                    let randomNumber = Math.floor(10000000 + Math.random() * 90000000)
                    return {
                        code_krs: randomNumber,
                        code_mata_kuliah: data2,
                        nim: DM.nim,
                        code_tahun_ajaran: thnAjr,
                        code_semester: smt,
                        code_jenjang_pendidikan: jenjPen,
                        code_fakultas: fks,
                        code_prodi: prd,
                        status_krs: "setuju",
                        status: "aktif"
                    }
                })
                krsModel.bulkCreate(datas)
            })
            if (data_body) {
                res.status(201).json({
                    message: "data krs paket succes ditambahkan"
                })
            } else {
                res.status(404).json({
                    message: "................."
                })
            }
        }
    },

    //  user mahasiswa
    viewKrsMahasiswaNow: async (req, res, next) => {
        const nim = req.params.nim
        const data = await historyMahasiswa.findOne({
            include: [
                {
                    model: mahasiswaModel,
                    attributes: ["nama"]
                },
                {
                    model: semesterModel,
                    attributes: ['semester']
                },
                {
                    model: tahunAjaranModel,
                    attributes: ["tahun_ajaran"]
                }
            ],
            where: {
                nim: nim,
                status: "aktif"
            }
        })
        if (!data) return res.status(404).json({ message: "data tidak ditemukan" })
        const totalSKS = await krsModel.sum('mataKuliahs.sks', {
            include: [
                {
                    model: mataKuliahModel,
                    where: {
                        code_tahun_ajaran: data.code_tahun_ajaran,
                        code_semester: data.code_semester,
                        code_jenjang_pendidikan: data.code_jenjang_pendidikan,
                        code_fakultas: data.code_fakultas,
                        code_prodi: data.code_prodi,
                        status: "aktif",
                        status_makul: "paket"
                    }
                }
            ],
            where: {
                nim: nim,
                code_tahun_ajaran: data.code_tahun_ajaran,
                code_semester: data.code_semester,
                code_jenjang_pendidikan: data.code_jenjang_pendidikan,
                code_fakultas: data.code_fakultas,
                code_prodi: data.code_prodi,
                status: "aktif"
            }
        })
        await krsModel.findAll({
            include: [
                {
                    model: mataKuliahModel,
                    attributes: ["code_mata_kuliah", "nama_mata_kuliah",
                        "status_bobot_makul", "status_makul", "sks"],
                    where: {
                        code_tahun_ajaran: data.code_tahun_ajaran,
                        code_semester: data.code_semester,
                        code_jenjang_pendidikan: data.code_jenjang_pendidikan,
                        code_fakultas: data.code_fakultas,
                        code_prodi: data.code_prodi,
                        status: "aktif",
                        status_makul: "paket"
                    }
                }
            ],
            where: {
                nim: nim,
                code_tahun_ajaran: data.code_tahun_ajaran,
                code_semester: data.code_semester,
                code_jenjang_pendidikan: data.code_jenjang_pendidikan,
                code_fakultas: data.code_fakultas,
                code_prodi: data.code_prodi,
                status: "aktif"
            }
        }).then(result => {
            res.status(201).json({
                message: "data krs success",
                identitas: {
                    nim: nim,
                    nama: data.mahasiswas[0].nama,
                    semester: data.semesters[0].semester,
                    tahun_ajaran: data.tahunAjarans[0].tahun_ajaran,
                    total_sks: totalSKS
                },
                data: result
            })
        }).catch(err => {
            console.log(err)
        })
    },


    viewKrsMahasiswaHistory: async (req, res, next) => {
        const nim = req.params.nim
        const tahunAjaran = req.params.tahunAjaran
        const semester = req.params.semester
        const data = await historyMahasiswa.findOne({
            include: [
                {
                    model: mahasiswaModel,
                    attributes: ["nama"]
                },
                {
                    model: semesterModel,
                    attributes: ['semester']
                },
                {
                    model: tahunAjaranModel,
                    attributes: ["tahun_ajaran"]
                }
            ],
            where: {
                nim: nim,
                status: "aktif"
            }
        })
        if (!data) return res.status(404).json({ message: "data mahasiswa tidak ditemukan" })
        const totalSKS = await krsModel.sum('mataKuliahs.sks', {
            include: [
                {
                    model: mataKuliahModel,
                    where: {
                        code_tahun_ajaran: data.code_tahun_ajaran,
                        code_semester: data.code_semester,
                        code_jenjang_pendidikan: data.code_jenjang_pendidikan,
                        code_fakultas: data.code_fakultas,
                        code_prodi: data.code_prodi,
                        status: "aktif",
                        status_makul: "paket"
                    }
                }
            ],
            where: {
                nim: nim,
                code_tahun_ajaran: data.code_tahun_ajaran,
                code_semester: data.code_semester,
                code_jenjang_pendidikan: data.code_jenjang_pendidikan,
                code_fakultas: data.code_fakultas,
                code_prodi: data.code_prodi,
                status: "aktif"
            }
        })
        await krsModel.findAll({
            include: [
                {
                    model: mataKuliahModel,
                    attributes: ["code_mata_kuliah", "nama_mata_kuliah",
                        "status_bobot_makul", "status_makul", "sks"],
                    where: {
                        code_tahun_ajaran: tahunAjaran,
                        code_semester: semester,
                        code_jenjang_pendidikan: data.code_jenjang_pendidikan,
                        code_fakultas: data.code_fakultas,
                        code_prodi: data.code_prodi,
                        status: "aktif",
                        status_makul: "paket"
                    }
                }
            ],
            where: {
                nim: nim,
                code_tahun_ajaran: tahunAjaran,
                code_semester: semester,
                code_jenjang_pendidikan: data.code_jenjang_pendidikan,
                code_fakultas: data.code_fakultas,
                code_prodi: data.code_prodi,
                status: "aktif"
            }
        }).then(result => {
            res.status(201).json({
                message: "data krs success",
                identitas: {
                    nim: nim,
                    nama: data.mahasiswas[0].nama,
                    semester: data.semesters[0].semester,
                    tahun_ajaran: data.tahunAjarans[0].tahun_ajaran,
                    total_sks: totalSKS
                },
                data: result
            })
        }).catch(err => {
            console.log(err)
        })
    }

}