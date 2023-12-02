const krsModel = require('../models/krsModel.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const tahunAjaranModel = require('../models/tahunAjaranModel.js')
const semesterModel = require('../models/semesterModel.js')
const historyMahasiswa = require('../models/historyMahasiswaModel.js')
const { Op, Sequelize } = require('sequelize')
const mahasiswaModel = require('../models/mahasiswaModel.js')
const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const fakultasModel = require('../models/fakultasModel.js')
const prodiModel = require('../models/prodiModel.js')
const sebaranMataKuliah = require('../models/sebaranMataKuliah.js')


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

        const paketmakul = await sebaranMataKuliah.findAndCountAll({
            where: {
                code_tahun_ajaran: tahunAjaran,
                code_semester: semester,
                status_makul: "paket",
                status_bobot_makul: "wajib",
                status: "aktif"
            },
            include: [
                {
                    model: semesterModel,
                    attributes: ['semester'],
                    status: "aktif"
                },
                {
                    model: mataKuliahModel,
                    where: {
                        code_jenjang_pendidikan: jenjangPendik,
                        code_fakultas: fakultas,
                        code_prodi: prodi,
                    }
                }
            ]
        })

        if (paketmakul.count == 0) return res.status(401).json({ message: "data tidak ditemukan" })

        const jmlMahasiswa = await historyMahasiswa.findAndCountAll({
            where: {
                code_tahun_ajaran: tahunAjaran,
                code_semester: semester,
                code_jenjang_pendidikan: jenjangPendik,
                code_fakultas: fakultas,
                code_prodi: prodi,
                // status: "aktif"
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
                status_pengajuan_krs: "tidak",
                status_krs: "",
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
                model: sebaranMataKuliah,
                where: {
                    code_tahun_ajaran: tahunAjaran,
                    code_semester: semester,
                    status: "aktif",
                    status_makul: "paket",
                    status_bobot_makul: "wajib"
                },
                include: [{
                    model: mataKuliahModel,
                    where: {
                        code_jenjang_pendidikan: jenjangPendik,
                        code_fakultas: fakultas,
                        code_prodi: prodi,
                    }
                }]
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

        await sebaranMataKuliah.findAndCountAll({
            include: [{
                model: mataKuliahModel,
                where: {
                    code_jenjang_pendidikan: jenjPen,
                    code_fakultas: fks,
                    code_prodi: prd,
                }
            }],
            where: {
                code_tahun_ajaran: thnAjr,
                code_semester: smt,
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


        const makul = await sebaranMataKuliah.findAll({
            attributes: ['code_mata_kuliah'],
            where: {
                code_tahun_ajaran: thnAjr,
                code_semester: smt,
                status_bobot_makul: "wajib",
                status_makul: "paket",
                status: "aktif"
            },
            include: [
                {
                    model: mataKuliahModel,
                    where: {
                        code_jenjang_pendidikan: jenjPen,
                        code_fakultas: fks,
                        code_prodi: prd,
                    }
                }
            ]
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
                status_pengajuan_krs: "tidak",
                status_krs: "",
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
                status_pengajuan_krs: "tidak",
                status_krs: "",
                status: "aktif"
            })
            const validasiMakulKrs = makulKrs.map(al => {
                return al.code_mata_kuliah
            })
            const paketmakulNew = await sebaranMataKuliah.findAll({
                where: {
                    code_tahun_ajaran: thnAjr,
                    code_semester: smt,
                    status_bobot_makul: "wajib",
                    status_makul: "paket",
                    status: "aktif",
                    code_mata_kuliah: {
                        [Op.notIn]: validasiMakulKrs
                    }
                },
                include: [{
                    model: mataKuliahModel,
                    where: {
                        code_jenjang_pendidikan: jenjPen,
                        code_fakultas: fks,
                        code_prodi: prd,
                    }
                }]
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
                        status_pengajuan_krs: "tidak",
                        status_krs: "",
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
                        status_pengajuan_krs: "tidak",
                        status_krs: "",
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

    delete: async (req, res, next) => {
        const thnAjr = req.params.thnAjr
        const smt = req.params.smt
        const jenjPen = req.params.jenjPen
        const fks = req.params.fks
        const prd = req.params.prd

        const makul = await sebaranMataKuliah.findAll({
            attributes: ['code_mata_kuliah'],
            where: {
                code_tahun_ajaran: thnAjr,
                code_semester: smt,
                status_bobot_makul: "wajib",
                status_makul: "paket",
                status: "aktif"
            },
            include: [
                {
                    model: mataKuliahModel,
                    where: {
                        code_jenjang_pendidikan: jenjPen,
                        code_fakultas: fks,
                        code_prodi: prd,
                    }
                }
            ]
        })
        const dataMakul = makul.map(el => { return el.code_mata_kuliah })
        await krsModel.destroy({
            where: {
                code_mata_kuliah: dataMakul,
                code_tahun_ajaran: thnAjr,
                code_semester: smt,
                code_jenjang_pendidikan: jenjPen,
                code_fakultas: fks,
                code_prodi: prd,
                status: "aktif"
            }
        }).then(result => {
            res.status(201).json({
                message: "data mahasiswa succes dibatalkan"
            })
        }).catch(err => {
            next(err)
        })
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
                    attributes: ['semester'],
                    where: {
                        status: "aktif"
                    }
                },
                {
                    model: tahunAjaranModel,
                    attributes: ["tahun_ajaran"],
                    where: {
                        status: "aktif"
                    }
                }
            ],
            where: {
                nim: nim,
                status: "aktif"
            }
        })
        if (!data) return res.status(404).json({ message: "data tidak ditemukan" })
        const totalSKS = await krsModel.sum('sebaranMataKuliahs.mataKuliahs.sks', {
            include: [
                {
                    model: sebaranMataKuliah,
                    where: {
                        code_tahun_ajaran: data.code_tahun_ajaran,
                        code_semester: data.code_semester,
                        status: "aktif",
                        status_makul: "paket",
                        status_bobot_makul: "wajib"
                    },
                    include: [{
                        model: mataKuliahModel,
                        where: {
                            code_jenjang_pendidikan: data.code_jenjang_pendidikan,
                            code_fakultas: data.code_fakultas,
                            code_prodi: data.code_prodi,
                        }
                    }]
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
        console.log(totalSKS);
        if (totalSKS == null) return res.status(404).json({ message: "data tidak ditemukan" })

        await krsModel.findAll({
            include: [
                {
                    model: sebaranMataKuliah,
                    where: {
                        code_tahun_ajaran: data.code_tahun_ajaran,
                        code_semester: data.code_semester,
                        status: "aktif",
                        status_makul: "paket",
                        status_bobot_makul: "wajib"
                    },
                    include: [{
                        model: mataKuliahModel,
                        where: {
                            code_jenjang_pendidikan: data.code_jenjang_pendidikan,
                            code_fakultas: data.code_fakultas,
                            code_prodi: data.code_prodi,
                        }
                    }]
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
        }
        ).then(result => {
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
                code_tahun_ajaran: tahunAjaran,
                code_semester: semester,
                nim: nim,
                // status: "aktif"
            }
        })
        if (!data) return res.status(404).json({ message: "data mahasiswa tidak ditemukan" })
        const totalSKS = await krsModel.sum('sebaranMataKuliahs.mataKuliahs.sks', {
            include: [
                {
                    model: sebaranMataKuliah,
                    where: {
                        code_tahun_ajaran: data.code_tahun_ajaran,
                        code_semester: data.code_semester,
                        status: "aktif",
                        status_makul: "paket",
                        status_bobot_makul: "wajib"
                    },
                    include: [{
                        model: mataKuliahModel,
                        where: {
                            code_jenjang_pendidikan: data.code_jenjang_pendidikan,
                            code_fakultas: data.code_fakultas,
                            code_prodi: data.code_prodi,
                        }
                    }]
                }
            ],
            where: {
                nim: nim,
                code_tahun_ajaran: data.code_tahun_ajaran,
                code_semester: data.code_semester,
                code_jenjang_pendidikan: data.code_jenjang_pendidikan,
                code_fakultas: data.code_fakultas,
                code_prodi: data.code_prodi,
                status_krs: "setuju",
                status: "aktif"
            }
        })
        if (totalSKS == null) return res.status(404).json({ message: "data jumlah krs tidak ditemukan" })
        await krsModel.findAll({
            include: [
                {
                    model: sebaranMataKuliah,
                    where: {
                        code_tahun_ajaran: data.code_tahun_ajaran,
                        code_semester: data.code_semester,
                        status: "aktif",
                        status_makul: "paket",
                        status_bobot_makul: "wajib"
                    },
                    include: [{
                        model: mataKuliahModel,
                        where: {
                            code_jenjang_pendidikan: data.code_jenjang_pendidikan,
                            code_fakultas: data.code_fakultas,
                            code_prodi: data.code_prodi,
                        }
                    }]
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
    },

    pengajuanKrsMahasiswa: async (req, res, next) => {
        const nim = req.params.nim
        const data = await historyMahasiswa.findOne({
            include: [
                {
                    model: mahasiswaModel,
                    attributes: ["nama"]
                },
                {
                    model: semesterModel,
                    attributes: ['semester'],
                    where: {
                        status: "aktif"
                    }
                },
                {
                    model: tahunAjaranModel,
                    attributes: ["tahun_ajaran"],
                    where: {
                        status: "aktif"
                    }
                },
                {
                    model: jenjangPendidikanModel,
                    attributes: ["code_jenjang_pendidikan", "nama_jenjang_pendidikan"],
                    where: {
                        status: "aktif"
                    }
                },
                {
                    model: fakultasModel,
                    attributes: ["code_fakultas", "nama_fakultas"],
                    where: {
                        status: "aktif"
                    }
                },
                {
                    model: prodiModel,
                    attributes: ["code_prodi", "nama_prodi"],
                    where: {
                        status: "aktif"
                    }
                },
            ],
            where: {
                nim: nim,
                status: "aktif"
            }
        })
        if (!data) return res.status(404).json({ message: "data tidak ditemukan" })
        const dataPengajuanKrs = await krsModel.findAll({
            include: [
                {
                    model: sebaranMataKuliah,
                    where: {
                        code_tahun_ajaran: data.code_tahun_ajaran,
                        code_semester: data.code_semester,
                        status: "aktif",
                        status_makul: "paket",
                        status_bobot_makul: "wajib"
                    },
                    include: [{
                        model: mataKuliahModel,
                        where: {
                            code_jenjang_pendidikan: data.code_jenjang_pendidikan,
                            code_fakultas: data.code_fakultas,
                            code_prodi: data.code_prodi,
                        }
                    }]
                }
            ],
            where: {
                nim: nim,
                code_tahun_ajaran: data.code_tahun_ajaran,
                code_semester: data.code_semester,
                code_jenjang_pendidikan: data.code_jenjang_pendidikan,
                code_fakultas: data.code_fakultas,
                code_prodi: data.code_prodi,
                status_pengajuan_krs: "tidak",
                status_krs: "",
                status: "aktif"
            }
        })
        const datas = dataPengajuanKrs.map(el => {
            return {
                id_krs: el.id_krs,
                status_pengajuan_krs: "diajukan"
            }
        })

        if (datas.length === 0) return res.status(401).json({ message: "data tidak ditemukan" })
        const updateData = await krsModel.bulkCreate(datas, {
            updateOnDuplicate: ["status_pengajuan_krs"],
        })

        if (updateData) {
            res.status(201).json({
                message: "data berhasil diupdate"
            })
        }
    },

    // user dosen
    viewKrsMahasiswaByPemdik: async (req, res, next) => {
        const nim = req.params.nim
        const tahunAjaran = req.params.tahunAjaran
        const mahasiswaUse = await historyMahasiswa.findOne({
            include: [
                {
                    model: mahasiswaModel,
                    attributes: ["nim", "nama"]
                },
                {
                    model: jenjangPendidikanModel,
                    attributes: ["code_jenjang_pendidikan", "nama_jenjang_pendidikan"],
                },
                {
                    model: fakultasModel,
                    attributes: ["code_fakultas", "nama_fakultas"],
                },
                {
                    model: prodiModel,
                    attributes: ["code_prodi", "nama_prodi"],
                },
                {
                    model: semesterModel,
                    attributes: ['code_semester', 'semester'],
                },
                {
                    model: tahunAjaranModel,
                    attributes: ["code_tahun_ajaran", "tahun_ajaran"],
                }
            ],
            where: {
                nim: nim,
                code_tahun_ajaran: tahunAjaran
            }
        })
        if (!mahasiswaUse) return res.status(404).json({ message: "data mahasiswa tidak ditemukan" })

        const totalSKS = await krsModel.sum('sebaranMataKuliahs.mataKuliahs.sks', {
            include: [
                {
                    model: sebaranMataKuliah,
                    where: {
                        code_tahun_ajaran: tahunAjaran,
                        code_semester: mahasiswaUse.semesters[0].code_semester,
                        status: "aktif",
                        status_makul: "paket",
                        status_bobot_makul: "wajib"
                    },
                    include: [{
                        model: mataKuliahModel,
                        where: {
                            code_jenjang_pendidikan: mahasiswaUse.jenjangPendidikans[0].code_jenjang_pendidikan,
                            code_fakultas: mahasiswaUse.fakultas[0].code_fakultas,
                            code_prodi: mahasiswaUse.prodis[0].code_prodi,
                        }
                    }]
                }
            ],
            where: {
                nim: nim,
                code_tahun_ajaran: tahunAjaran,
                code_semester: mahasiswaUse.semesters[0].code_semester,
                code_jenjang_pendidikan: mahasiswaUse.jenjangPendidikans[0].code_jenjang_pendidikan,
                code_fakultas: mahasiswaUse.fakultas[0].code_fakultas,
                code_prodi: mahasiswaUse.prodis[0].code_prodi,
                // status_krs: "setuju",
                status: "aktif"
            }
        })
        await krsModel.findAll({
            include: [
                {
                    model: sebaranMataKuliah,
                    where: {
                        code_tahun_ajaran: tahunAjaran,
                        code_semester: mahasiswaUse.semesters[0].code_semester,
                        status: "aktif",
                        status_makul: "paket",
                        status_bobot_makul: "wajib"
                    },
                    include: [{
                        model: mataKuliahModel,
                        where: {
                            code_jenjang_pendidikan: mahasiswaUse.jenjangPendidikans[0].code_jenjang_pendidikan,
                            code_fakultas: mahasiswaUse.fakultas[0].code_fakultas,
                            code_prodi: mahasiswaUse.prodis[0].code_prodi,
                        }
                    }]
                }
            ],
            where: {
                nim: nim,
                code_tahun_ajaran: tahunAjaran,
                code_semester: mahasiswaUse.semesters[0].code_semester,
                code_jenjang_pendidikan: mahasiswaUse.jenjangPendidikans[0].code_jenjang_pendidikan,
                code_fakultas: mahasiswaUse.fakultas[0].code_fakultas,
                code_prodi: mahasiswaUse.prodis[0].code_prodi,
                status: "aktif"
            }
        }).then(result => {
            res.status(201).json({
                message: "data krs success",
                identitas: {
                    nim: nim,
                    nama: mahasiswaUse.mahasiswas[0].nama,
                    semester: mahasiswaUse.semesters[0].semester,
                    tahun_ajaran: tahunAjaran,
                    code_jenjang_pendidikan: mahasiswaUse.jenjangPendidikans[0].nama_jenjang_pendidikan,
                    code_fakultas: mahasiswaUse.fakultas[0].nama_fakultas,
                    code_prodi: mahasiswaUse.prodis[0].nama_prodi,
                    total_sks: totalSKS
                },
                data: result
            })
        }).catch(err => {
            console.log(err)
        })
    },

    approveKrsMahasiswaByPemdik: async (req, res, next) => {
        const { nim, statusKrs, tahunAjaran } = req.body
        const data = await historyMahasiswa.findOne({
            include: [
                {
                    model: mahasiswaModel,
                    attributes: ["nama"]
                },
                {
                    model: semesterModel,
                    attributes: ['code_semester', 'semester'],
                    where: {
                        status: "aktif"
                    }
                },
                {
                    model: tahunAjaranModel,
                    attributes: ["tahun_ajaran"],
                    where: {
                        status: "aktif"
                    }
                },
                {
                    model: jenjangPendidikanModel,
                    attributes: ["code_jenjang_pendidikan", "nama_jenjang_pendidikan"],
                    where: {
                        status: "aktif"
                    }
                },
                {
                    model: fakultasModel,
                    attributes: ["code_fakultas", "nama_fakultas"],
                    where: {
                        status: "aktif"
                    }
                },
                {
                    model: prodiModel,
                    attributes: ["code_prodi", "nama_prodi"],
                    where: {
                        status: "aktif"
                    }
                },
            ],
            where: {
                nim: nim,
                code_tahun_ajaran: tahunAjaran,
                status: "aktif"
            }
        })
        if (!data) return res.status(404).json({ message: "data tidak ditemukan" })
        const dataPengajuanKrs = await krsModel.findAll({
            include: [
                {
                    model: sebaranMataKuliah,
                    where: {
                        code_tahun_ajaran: tahunAjaran,
                        code_semester: data.semesters[0].code_semester,
                        status: "aktif",
                        status_makul: "paket",
                        status_bobot_makul: "wajib"
                    },
                    include: [{
                        model: mataKuliahModel,
                        where: {
                            code_jenjang_pendidikan: data.jenjangPendidikans[0].code_jenjang_pendidikan,
                            code_fakultas: data.fakultas[0].code_fakultas,
                            code_prodi: data.prodis[0].code_prodi,
                        }
                    }]
                }
            ],
            where: {
                nim: nim,
                code_tahun_ajaran: data.code_tahun_ajaran,
                code_semester: data.semesters[0].code_semester,
                code_jenjang_pendidikan: data.jenjangPendidikans[0].code_jenjang_pendidikan,
                code_fakultas: data.fakultas[0].code_fakultas,
                code_prodi: data.prodis[0].code_prodi,
                status_pengajuan_krs: "diajukan",
                status_krs: "",
                status: "aktif"
            }
        })
        const datas = dataPengajuanKrs.map(el => {
            return {
                id_krs: el.id_krs,
                status_krs: statusKrs
            }
        })
        if (datas.length === 0) return res.status(401).json({ message: "data tidak ditemukan" })
        const updateData = await krsModel.bulkCreate(datas, {
            updateOnDuplicate: ["status_krs"],
        })

        if (updateData) {
            res.status(201).json({
                message: "data berhasil diupdate"
            })
        }
    },

}