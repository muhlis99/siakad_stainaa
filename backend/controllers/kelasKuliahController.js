const kelasModel = require('../models/kelasKuliahModel.js')
const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const fakultasModel = require('../models/fakultasModel.js')
const prodiModel = require('../models/prodiModel.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const historyMahasiswaModel = require('../models/historyMahasiswaModel.js')
const semesterModel = require('../models/semesterModel.js')
const krsModel = require('../models/krsModel.js')
const kelasKuliahModel = require('../models/kelasKuliahModel.js')
const kelasDetailKuliahModel = require('../models/kelasDetailKuliahModel.js')
const tahunAjaranModel = require('../models/tahunAjaranModel.js')
const mahasiswaModel = require('../models/mahasiswaModel.js')
const sebaranMatakuliahModel = require('../models/sebaranMataKuliah.js')

const { Op, QueryTypes, Sequelize, literal, cast } = require('sequelize')


module.exports = {
    getAllMatakuliah: async (req, res, next) => {
        const { codeThnAjr, codeSmt, jnjPen, codeFks, codePrd } = req.params
        await sebaranMatakuliahModel.findAll({
            attributes: ['code_mata_kuliah'],
            include: [{
                attributes: ['code_tahun_ajaran'],
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                attributes: ['code_semester'],
                model: semesterModel,
                where: { status: "aktif" }
            }, {
                model: mataKuliahModel,
                include: [
                    {
                        attributes: ['code_jenjang_pendidikan'],
                        model: jenjangPendidikanModel,
                        where: { status: "aktif" }
                    }, {
                        attributes: ['code_fakultas'],
                        model: fakultasModel,
                        where: { status: "aktif" }
                    }, {
                        attributes: ['code_prodi'],
                        model: prodiModel,
                        where: { status: "aktif" }
                    },
                ],
                where: {
                    code_jenjang_pendidikan: jnjPen,
                    code_fakultas: codeFks,
                    code_prodi: codePrd,
                    status: "aktif"
                }
            }],
            where: {
                code_tahun_ajaran: codeThnAjr,
                code_semester: codeSmt,
                status: "aktif"
            },
            order: [
                ["id_sebaran", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All kelas Success",
                    data: result,
                })
            }).
            catch(err => {
                next(err)
            })

    },

    getKelasByMakul: async (req, res, next) => {
        const { codeThnAjr, codeSmt, jnjPen, codeFks, codePrd, codeMakul } = req.params
        await kelasModel.findAll({
            include: [
                {
                    attributes: ['code_jenjang_pendidikan'],
                    model: jenjangPendidikanModel,
                    where: { status: "aktif" }
                }, {
                    attributes: ['code_fakultas'],
                    model: fakultasModel,
                    where: { status: "aktif" }
                }, {
                    attributes: ['code_prodi'],
                    model: prodiModel,
                    where: { status: "aktif" }
                }, {
                    attributes: ['code_mata_kuliah', 'nama_mata_kuliah'],
                    model: mataKuliahModel,
                    where: { status: "aktif" }
                }, {
                    attributes: ['code_tahun_ajaran'],
                    model: tahunAjaranModel,
                    where: { status: "aktif" }
                }, {
                    attributes: ['code_semester'],
                    model: semesterModel,
                    where: { status: "aktif" }
                }],
            attributes: [
                'id_kelas', 'kapasitas', 'nama_kelas', 'code_mata_kuliah', ['code_kelas', 'code'],
                [Sequelize.literal('(select count(*) from tb_kelas_detail where code_kelas = code)'), 'jumlahMhs']
            ],
            where: {
                code_tahun_ajaran: codeThnAjr,
                code_semester: codeSmt,
                code_jenjang_pendidikan: jnjPen,
                code_fakultas: codeFks,
                code_prodi: codePrd,
                code_mata_kuliah: codeMakul,
                status: "aktif"
            }
        }).
            then(getByMakul => {
                if (!getByMakul) {
                    return res.status(404).json({
                        message: "Data kelas kuliah Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data kelas kuliah Ditemukan",
                    data: getByMakul
                })
            }).
            catch(err => {
                console.log(err);
            })
    },

    getKelasById: async (req, res, next) => {
        const id = req.params.id
        await kelasKuliahModel.findOne({
            include: [{
                model: jenjangPendidikanModel,
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }, {
                model: mataKuliahModel,
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: semesterModel,
                where: { status: "aktif" }
            }],
            where: {
                id_kelas: id,
                status: "aktif"
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data kelas kuliah Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data kelas kuliah Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getMhsByKelas: async (req, res, next) => {
        const { codeKls } = req.params
        await kelasDetailKuliahModel.findAll({
            include: [
                {
                    model: kelasModel,
                    include: [
                        {
                            model: jenjangPendidikanModel,
                            where: { status: "aktif" }
                        }, {
                            model: fakultasModel,
                            where: { status: "aktif" }
                        }, {
                            model: prodiModel,
                            where: { status: "aktif" }
                        }],
                    where: { status: "aktif" }
                }, {
                    attributes: ["nim", "nama", "jenis_kelamin"],
                    model: mahasiswaModel,
                    where: { status: "aktif" },

                }
            ],
            where: {
                code_kelas: codeKls,
                status: "aktif",
            },
            order: [
                ["nim", "ASC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All mahasiswa by kelas Success",
                    data: result,
                })
            }).
            catch(err => {
                console.log(err)
            })
    },

    jumlahMhs: async (req, res, next) => {
        const { thnAjr, smt, jnjPen, fkts, prd, jenkel } = req.params
        await historyMahasiswaModel.findAndCountAll({
            include: [{
                model: jenjangPendidikanModel,
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: semesterModel,
                where: { status: "aktif" }
            }, {
                model: mahasiswaModel,
                where: {
                    jenis_kelamin: jenkel,
                    status: "aktif"
                }
            }],
            where: {
                code_jenjang_pendidikan: jnjPen,
                code_fakultas: fkts,
                code_prodi: prd,
                code_semester: smt,
                code_tahun_ajaran: thnAjr,
                status: "aktif"
            }
        }).then(async el => {
            const nimMhsHistory = el.rows.map(all => {
                return all.nim
            })
            const mahasiswaDetail = await kelasDetailKuliahModel.findOne({
                include: [{
                    model: kelasModel,
                    where: {
                        code_jenjang_pendidikan: jnjPen,
                        code_fakultas: fkts,
                        code_prodi: prd,
                        code_semester: smt,
                        code_tahun_ajaran: thnAjr,
                        status: "aktif"
                    }
                }],
                where: {
                    nim: nimMhsHistory,
                    status: "aktif"
                }
            })
            if (mahasiswaDetail) {
                return res.status(201).json({
                    message: "Data kelas kuliah Ditemukan",
                    data: 0
                })
            }
            res.status(201).json({
                message: "Data kelas kuliah Ditemukan",
                data: el.count
            })
        }).catch(err => {
            next(err)
        })
    },

    getNamaKelasSelanjutnya: async (req, res, next) => {
        const { thnAjr, smt, jnjPen, fkts, prd } = req.params
        await kelasModel.max('nama_kelas', {
            where: {
                code_jenjang_pendidikan: jnjPen,
                code_fakultas: fkts,
                code_prodi: prd,
                code_semester: smt,
                code_tahun_ajaran: thnAjr,
                status: "aktif"
            }
        }).then(all => {

            const huruf = nextChar(all)
            function nextChar(e) {
                var i = (parseInt(e, 36) + 1) % 36;
                return (!i * 10 + i).toString(36);
            }
            if (!all) {
                return res.status(201).json({
                    message: "Data kelas kuliah Ditemukan",
                    data: "A"
                })
            }
            res.status(201).json({
                message: "Data kelas kuliah Ditemukan",
                data: huruf.toUpperCase()
            })
        })
    },

    post: async (req, res, next) => {
        const { code_jenjang_pendidikan, code_fakultas, code_tahun_ajaran,
            code_prodi, code_semester, nama_kelas, hurufKelas, kapasitas, jumlahPeserta, jenkel } = req.body
        const currentPage = 1
        const perPage = 40
        const offset = 0
        const makul = await sebaranMatakuliahModel.findAll({
            include: [{
                attributes: ['code_tahun_ajaran'],
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                attributes: ['code_semester'],
                model: semesterModel,
                where: { status: "aktif" }
            }, {
                model: mataKuliahModel,
                where: {
                    code_jenjang_pendidikan: code_jenjang_pendidikan,
                    code_fakultas: code_fakultas,
                    code_prodi: code_prodi,
                },
                include: [
                    {
                        attributes: ['code_jenjang_pendidikan'],
                        model: jenjangPendidikanModel,
                        where: { status: "aktif" }
                    }, {
                        attributes: ['code_fakultas'],
                        model: fakultasModel,
                        where: { status: "aktif" }
                    }, {
                        attributes: ['code_prodi'],
                        model: prodiModel,
                        where: { status: "aktif" }
                    },
                ]
            }],
            attributes: ['code_mata_kuliah'],
            where: {
                code_tahun_ajaran: code_tahun_ajaran,
                code_semester: code_semester,
                status_makul: "paket",
                status_bobot_makul: "wajib"
            }
        })

        let nmKelas = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
        let potongArr = nmKelas.indexOf(hurufKelas)
        nmKelas = nmKelas.slice(potongArr)
        nmKelas.unshift("")
        nama_kelas.splice(-1)
        const dataCreateKelas = makul.map(al => {
            const codeMakul = al.code_mata_kuliah
            nama_kelas.map(async el => {
                console.log(el);
                let randomNumber = Math.floor(10 + Math.random() * 90)
                let data = {
                    code_kelas: jenkel + code_prodi + randomNumber + nmKelas[el],
                    nama_kelas: nmKelas[el],
                    kapasitas: kapasitas,
                    code_jenjang_pendidikan: code_jenjang_pendidikan,
                    code_fakultas: code_fakultas,
                    code_prodi: code_prodi,
                    code_mata_kuliah: codeMakul,
                    code_semester: code_semester,
                    code_tahun_ajaran: code_tahun_ajaran,
                    status: "aktif"
                }
                await kelasModel.bulkCreate([data])
                    .then(all => {
                        all.map(async elment => {
                            const dataKRS = await krsModel.findAll({
                                include: [
                                    {
                                        model: jenjangPendidikanModel,
                                        where: { status: "aktif" }
                                    }, {
                                        model: fakultasModel,
                                        where: { status: "aktif" }
                                    }, {
                                        model: prodiModel,
                                        where: { status: "aktif" }
                                    }, {
                                        model: tahunAjaranModel,
                                        where: { status: "aktif" }
                                    }, {
                                        model: semesterModel,
                                        where: { status: "aktif" }
                                    }, {
                                        model: mahasiswaModel,
                                        where: {
                                            jenis_kelamin: jenkel,
                                            status: "aktif"
                                        }
                                    }
                                ],
                                where: {
                                    code_jenjang_pendidikan: code_jenjang_pendidikan,
                                    code_fakultas: code_fakultas,
                                    code_prodi: code_prodi,
                                    code_tahun_ajaran: code_tahun_ajaran,
                                    code_semester: code_semester,
                                    status: "aktif"
                                },
                                offset: offset,
                                limit: perPage,
                                group: ['nim']
                            }).then(async results => {
                                await Promise.all(results.map(async p => {
                                    let random = Math.floor(100 + Math.random() * 900)
                                    let datas = {
                                        code_kelas: elment.code_kelas,
                                        code_kelas_detail: jenkel + random,
                                        nim: p.nim,
                                        status: "aktif"
                                    }
                                    console.log(p.nim);
                                    return await kelasDetailKuliahModel.bulkCreate([datas])
                                }))
                            })

                        })
                    })
            })
        })

        // if (dataCreateKelas) {
        // }

        // res.status(201).json({
        //     message: "data kelas kuliah succses ditambahkan"
        // })

    },


    pindahKelas: async (req, res, next) => {
        const { id, code_kelas } = req.body
        await kelasDetailKuliahModel.update({
            code_kelas: code_kelas
        }, {
            where: {
                id_kelas_detail: id
            }
        }).then(all => {
            res.status(200).json({
                message: "pindah keals  berhasil dirubah",
            })
        }).catch(err => {
            next(err)
        })
    }
}