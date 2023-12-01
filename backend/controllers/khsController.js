const mataKuliahModel = require('../models/mataKuliahModel.js')
const tahunAjaranModel = require('../models/tahunAjaranModel.js')
const semesterModel = require('../models/semesterModel.js')
const historyMahasiswa = require('../models/historyMahasiswaModel.js')
const mahasiswaModel = require('../models/mahasiswaModel.js')
const nilaiKuliahModel = require('../models/nilaiKuliahModel.js')
const kategoriNilaiModel = require('../models/kategoriNilaiModel.js')
const prodiModel = require('../models/prodiModel.js')
const fakultasModel = require('../models/fakultasModel.js')
const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const sebaranMataKuliah = require('../models/sebaranMataKuliah.js')
const { Sequelize, Op, literal, QueryTypes } = require('sequelize')
const db = require('../config/database.js')

module.exports = {
    getAll: async (req, res, next) => {
        const { codeThnAjr, codeSmt, codeJnjPen, codeFks, codePrd } = req.params
        await historyMahasiswa.findAll({
            include: [{
                attributes: ['nim', 'nama'],
                model: mahasiswaModel,
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: semesterModel,
                where: { status: "aktif" }
            }, {
                model: jenjangPendidikanModel,
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }],
            where: {
                code_tahun_ajaran: codeThnAjr,
                code_semester: codeSmt,
                code_jenjang_pendidikan: codeJnjPen,
                code_fakultas: codeFks,
                code_prodi: codePrd,
                // status: "aktif"
            }
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All  Mahasiswa semester Success",
                    data: result,
                })
            }).
            catch(err => {
                next(err)
            })

    },

    viewKhs: async (req, res, next) => {
        const { nim, codeThnAjr, codeSmt, codeJnjPen, codeFks, codePrd } = req.params

        const mhs = await mahasiswaModel.findOne({
            where: {
                nim: nim,
                status: "aktif"
            }
        })
        const prd = await prodiModel.findOne({
            where: {
                code_prodi: codePrd,
                code_jenjang_pendidikan: codeJnjPen,
                code_fakultas: codeFks,
                status: "aktif"
            }
        })
        const fks = await fakultasModel.findOne({
            where: {
                code_fakultas: codeFks,
                code_jenjang_pendidikan: codeJnjPen,
                status: "aktif"
            }
        })
        const jenjPen = await jenjangPendidikanModel.findOne({
            where: {
                code_jenjang_pendidikan: codeJnjPen,
                status: "aktif"
            }
        })
        const smt = await semesterModel.findOne({
            where: {
                code_tahun_ajaran: codeThnAjr,
                code_semester: codeSmt,
                status: "aktif"
            }
        })
        const thnAjr = await tahunAjaranModel.findOne({
            where: {
                code_tahun_ajaran: codeThnAjr,
                status: "aktif"
            }
        })

        const totalSks = await nilaiKuliahModel.sum('sebaranMataKuliahs.mataKuliahs.sks', {
            include: [
                {
                    model: sebaranMataKuliah,
                    where: {
                        code_tahun_ajaran: codeThnAjr,
                        code_semester: codeSmt,
                        status: "aktif"
                    },
                    include: [{
                        model: mataKuliahModel,
                        code_jenjang_pendidikan: codeJnjPen,
                        code_fakultas: codeFks,
                        code_prodi: codePrd,
                    }]
                }
            ],
            where: {
                code_tahun_ajaran: codeThnAjr,
                code_semester: codeSmt,
                code_jenjang_pendidikan: codeJnjPen,
                code_fakultas: codeFks,
                code_prodi: codePrd,
                nim: nim,
                status: "aktif"
            }
        })

        // const queryTotalSksIndex = await db.query(`SELECT SUM( tb_mata_kuliah.sks*tb_kategori_nilai.interfal_skor) AS total FROM tb_nilai_kuliah
        // INNER JOIN tb_sebaran_mata_kuliah ON tb_nilai_kuliah.code_mata_kuliah=tb_sebaran_mata_kuliah.code_mata_kuliah INNER JOIN tb_kategori_nilai ON
        // tb_nilai_kuliah.code_kategori_nilai=tb_kategori_nilai.code_kategori_nilai INNER JOIN tb_mata_kuliah ON tb_sebaran_mata_kuliah.code_mata_kuliah=tb_mata_kuliah.code_mata_kuliah
        // WHERE tb_nilai_kuliah.code_tahun_ajaran="${codeThnAjr}" AND tb_nilai_kuliah.code_semester="${codeSmt}" AND tb_nilai_kuliah.code_jenjang_pendidikan="${codeJnjPen}" 
        // AND tb_nilai_kuliah.code_fakultas="${codeFks}" AND tb_nilai_kuliah.code_prodi="${codePrd}" AND tb_nilai_kuliah.status="aktif" AND tb_nilai_kuliah.nim="${nim}"
        // AND tb_sebaran_mata_kuliah.code_tahun_ajaran="${codeThnAjr}" AND tb_sebaran_mata_kuliah.code_semester="${codeSmt}" AND tb_mata_kuliah.code_jenjang_pendidikan="${codeJnjPen}" 
        // AND tb_mata_kuliah.code_fakultas="${codeFks}" AND tb_mata_kuliah.code_prodi="${codePrd}" AND tb_mata_kuliah.status="aktif"`, {
        //     nest: true,
        //     type: QueryTypes.SELECT
        // })

        const datasQueryTotalSksIndex = await nilaiKuliahModel.findAll({
            include: [
                {
                    model: sebaranMataKuliah,
                    where: {
                        code_tahun_ajaran: codeThnAjr,
                        code_semester: codeSmt,
                        status: "aktif"
                    },
                    include: [{
                        model: mataKuliahModel,
                        code_jenjang_pendidikan: codeJnjPen,
                        code_fakultas: codeFks,
                        code_prodi: codePrd,
                    }]
                },
                {
                    attributes: ["id_kategori_nilai", "nilai_huruf", "interfal_skor"],
                    model: kategoriNilaiModel,
                    where: { status: "aktif", code_tahun_ajaran: codeThnAjr }
                },
                {
                    attributes: ['nim', 'nama'],
                    model: mahasiswaModel,
                    where: { status: "aktif" }
                },
                {
                    model: tahunAjaranModel,
                    attributes: ['code_tahun_ajaran', 'tahun_ajaran'],
                    where: { status: "aktif" }
                }, {
                    model: semesterModel,
                    attributes: ['code_semester', 'semester'],
                    where: { status: "aktif" }
                }, {
                    attributes: ['code_jenjang_pendidikan', 'nama_jenjang_pendidikan'],
                    model: jenjangPendidikanModel,
                    where: { status: "aktif" }
                }, {
                    model: fakultasModel,
                    attributes: ['code_fakultas', 'nama_fakultas',],
                    where: { status: "aktif" }
                }, {
                    attributes: ['code_prodi', 'nama_prodi'],
                    model: prodiModel,
                    where: { status: "aktif" }
                }
            ],
            attributes: [
                'id_nilai_kuliah', 'code_nilai_kuliah', 'code_kelas', 'code_mata_kuliah', 'code_kategori_nilai', 'nim', 'nilai_akhir', 'nilai_jumlah',
                [Sequelize.literal('(sks*interfal_skor)'), 'sksIndexs']
            ],
            where: {
                code_tahun_ajaran: codeThnAjr,
                code_semester: codeSmt,
                code_jenjang_pendidikan: codeJnjPen,
                code_fakultas: codeFks,
                code_prodi: codePrd,
                nim: nim,
                status: 'aktif'
            },
        })

        const datasQueryTotalSksIndexs = datasQueryTotalSksIndex.map(el => { return el.get("sksIndexs") })
        const queryTotalSksIndex = datasQueryTotalSksIndexs.reduce((i, e) => {
            return i + e
        })
        const totalSksIndex = queryTotalSksIndex
        const ipSemester = totalSksIndex / totalSks
        await nilaiKuliahModel.findAll({
            include: [
                {
                    model: sebaranMataKuliah,
                    where: {
                        code_tahun_ajaran: codeThnAjr,
                        code_semester: codeSmt,
                        status: "aktif"
                    },
                    include: [{
                        model: mataKuliahModel,
                        code_jenjang_pendidikan: codeJnjPen,
                        code_fakultas: codeFks,
                        code_prodi: codePrd,
                    }]
                },
                {
                    attributes: ["id_kategori_nilai", "nilai_huruf", "interfal_skor"],
                    model: kategoriNilaiModel,
                    where: { status: "aktif", code_tahun_ajaran: codeThnAjr }
                },
                {
                    attributes: ['nim', 'nama'],
                    model: mahasiswaModel,
                    where: { status: "aktif" }
                },
                {
                    model: tahunAjaranModel,
                    attributes: ['code_tahun_ajaran', 'tahun_ajaran'],
                    where: { status: "aktif" }
                }, {
                    model: semesterModel,
                    attributes: ['code_semester', 'semester'],
                    where: { status: "aktif" }
                }, {
                    attributes: ['code_jenjang_pendidikan', 'nama_jenjang_pendidikan'],
                    model: jenjangPendidikanModel,
                    where: { status: "aktif" }
                }, {
                    model: fakultasModel,
                    attributes: ['code_fakultas', 'nama_fakultas',],
                    where: { status: "aktif" }
                }, {
                    attributes: ['code_prodi', 'nama_prodi'],
                    model: prodiModel,
                    where: { status: "aktif" }
                }
            ],
            attributes: [
                'id_nilai_kuliah', 'code_nilai_kuliah', 'code_kelas', 'code_mata_kuliah', 'code_kategori_nilai', 'nim', 'nilai_akhir', 'nilai_jumlah',
                [Sequelize.literal('(sks*interfal_skor)'), 'sksIndexs']
            ],
            where: {
                code_tahun_ajaran: codeThnAjr,
                code_semester: codeSmt,
                code_jenjang_pendidikan: codeJnjPen,
                code_fakultas: codeFks,
                code_prodi: codePrd,
                nim: nim,
                status: 'aktif'
            },
        }).then(result => {
            res.status(201).json({
                data: result,
                nim: mhs.nim,
                mahasiswa: mhs.nama,
                prodi: prd.nama_prodi,
                fakultas: fks.nama_fakultas,
                jenjangPendidikan: jenjPen.nama_jenjang_pendidikan,
                semester: smt.semester,
                tahunAjaran: thnAjr.tahun_ajaran,
                jumlahSks: totalSks,
                jumlahSksIndex: totalSksIndex.toFixed(2),
                IPS: ipSemester.toFixed(2)
                // IPS: ipSemester

            })
        }).catch(err => {
            console.log(err)
        })
    },

    //  user mahasiswa
    viewKhsMahasiswa: async (req, res, next) => {
        const nim = req.params.nim
        const tahunAjaran = req.params.codeThnAjr
        const dataMahasiswa = await historyMahasiswa.findOne({
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
                },
                {
                    model: prodiModel,
                    attributes: ["nama_prodi"]
                },
                {
                    model: fakultasModel,
                    attributes: ["nama_fakultas"]
                },
                {
                    model: jenjangPendidikanModel,
                    attributes: ["nama_jenjang_pendidikan"]
                }
            ],
            where: {
                nim: nim,
                // status: "aktif"
            }
        })
        if (!dataMahasiswa) return res.status(404).json({ message: "data mahasiswa tidak ditemukan" })
        const thnAjr = await tahunAjaranModel.findOne({
            where: {
                code_tahun_ajaran: tahunAjaran,
                status: "aktif"
            }
        })

        const totalSks = await nilaiKuliahModel.sum('sebaranMataKuliahs.mataKuliahs.sks', {
            include: [
                {
                    model: sebaranMataKuliah,
                    where: {
                        code_tahun_ajaran: tahunAjaran,
                        status: "aktif"
                    },
                    include: [{
                        model: mataKuliahModel,
                    }]
                }
            ],
            where: {
                code_tahun_ajaran: tahunAjaran,
                nim: nim,
                status: "aktif"
            }
        })
        if (!totalSks) return res.status(404).json({ message: "data  tidak ditemukan" })
        const datasQueryTotalSksIndex = await nilaiKuliahModel.findAll({
            include: [
                {
                    model: sebaranMataKuliah,
                    where: {
                        code_tahun_ajaran: tahunAjaran,
                        status: "aktif"
                    },
                    include: [{
                        model: mataKuliahModel,
                    }]
                },
                {
                    attributes: ["id_kategori_nilai", "nilai_huruf", "interfal_skor"],
                    model: kategoriNilaiModel,
                    where: { status: "aktif", code_tahun_ajaran: tahunAjaran }
                },
                {
                    attributes: ['nim', 'nama'],
                    model: mahasiswaModel,
                    where: { status: "aktif" }
                },
                {
                    model: tahunAjaranModel,
                    attributes: ['code_tahun_ajaran', 'tahun_ajaran'],
                    where: { status: "aktif" }
                }, {
                    model: semesterModel,
                    attributes: ['code_semester', 'semester'],
                    where: { status: "aktif" }
                }, {
                    attributes: ['code_jenjang_pendidikan', 'nama_jenjang_pendidikan'],
                    model: jenjangPendidikanModel,
                    where: { status: "aktif" }
                }, {
                    model: fakultasModel,
                    attributes: ['code_fakultas', 'nama_fakultas',],
                    where: { status: "aktif" }
                }, {
                    attributes: ['code_prodi', 'nama_prodi'],
                    model: prodiModel,
                    where: { status: "aktif" }
                }
            ],
            attributes: [
                'id_nilai_kuliah', 'code_nilai_kuliah', 'code_kelas', 'code_mata_kuliah', 'code_kategori_nilai', 'nim', 'nilai_akhir', 'nilai_jumlah',
                [Sequelize.literal('(sks*interfal_skor)'), 'sksIndexs']
            ],
            where: {
                code_tahun_ajaran: tahunAjaran,
                nim: nim,
                status: 'aktif'
            },
        })

        const datasQueryTotalSksIndexs = datasQueryTotalSksIndex.map(el => { return el.get("sksIndexs") })
        const queryTotalSksIndex = datasQueryTotalSksIndexs.reduce((i, e) => {
            return i + e
        })
        const totalSksIndex = queryTotalSksIndex
        const ipSemester = totalSksIndex / totalSks

        await nilaiKuliahModel.findAll({
            include: [
                {
                    model: sebaranMataKuliah,
                    where: {
                        code_tahun_ajaran: tahunAjaran,
                        status: "aktif"
                    },
                    include: [{
                        model: mataKuliahModel,
                    }]
                },
                {
                    attributes: ["id_kategori_nilai", "nilai_huruf", "interfal_skor"],
                    model: kategoriNilaiModel,
                    where: {
                        status: "aktif",
                        code_tahun_ajaran: tahunAjaran
                    }
                },
            ],
            attributes: [
                'id_nilai_kuliah', 'code_nilai_kuliah', 'code_kelas', 'code_mata_kuliah', 'code_kategori_nilai', 'nim', 'nilai_akhir', 'nilai_jumlah',
                [Sequelize.literal('(sks*interfal_skor)'), 'sksIndexs']
            ],
            where: {
                code_tahun_ajaran: tahunAjaran,
                nim: nim,
                status: 'aktif'
            },
        }).then(result => {
            res.status(201).json({
                message: "data KHS berhasil ditemukan",
                identitas: {
                    nim: nim,
                    mahasiswa: dataMahasiswa.mahasiswas[0].nama,
                    prodi: dataMahasiswa.prodis[0].nama_prodi,
                    fakultas: dataMahasiswa.fakultas[0].nama_fakultas,
                    jenjangPendidikan: dataMahasiswa.jenjangPendidikans[0].nama_jenjang_pendidikan,
                    semester: dataMahasiswa.semesters[0].semester,
                    tahunAjaran: thnAjr.tahun_ajaran,
                },
                nilaiAkhir: {
                    jumlahSks: totalSks,
                    jumlahSksIndex: totalSksIndex.toFixed(2),
                    // IPS: ipSemester,
                    IPS: ipSemester.toFixed(2)

                },
                data: result,

            })
        }).catch(err => {
            next(err)
        })
    }

}