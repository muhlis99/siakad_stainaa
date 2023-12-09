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
    //  user mahasiswa
    getSemesterMhs: async (req, res, next) => {
        const nim = req.params.nim
        await historyMahasiswa.findAll({
            include: [{
                attributes: ['id_tahun_ajaran', 'code_tahun_ajaran', 'tahun_ajaran'],
                model: tahunAjaranModel
            }, {
                attributes: ['id_semester', 'code_semester', 'semester'],
                model: semesterModel
            }],
            where: {
                nim: nim,
                status: {
                    [Op.not]: "berhenti"
                }
            }
        }).then(result => {
            res.status(201).json({
                message: "data semester mahasiswa succes ",
                data: result
            })
        }).catch(err => {
            next(err)
        })

    },

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
        const status = req.params.status
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
                status: status
            }
        })
        if (data.status == "cuti") return res.status(404).json({
            message: "data mahasiswa",
            data: [{
                krs: "mahasiswa dalam masa cuti"
            }]
        })
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
        // if (totalSKS == null) return res.status(404).json({ message: "data jumlah krs tidak ditemukan" })
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
                    attributes: ['status_makul', 'status_bobot_makul'],
                    model: sebaranMataKuliah,
                    where: {
                        code_tahun_ajaran: tahunAjaran,
                        code_semester: mahasiswaUse.semesters[0].code_semester,
                        status: "aktif",
                        status_makul: "paket",
                        status_bobot_makul: "wajib"
                    },
                    include: [{
                        attributes: ['code_mata_kuliah', 'nama_mata_kuliah', 'sks'],
                        model: mataKuliahModel,
                        where: {
                            code_jenjang_pendidikan: mahasiswaUse.jenjangPendidikans[0].code_jenjang_pendidikan,
                            code_fakultas: mahasiswaUse.fakultas[0].code_fakultas,
                            code_prodi: mahasiswaUse.prodis[0].code_prodi,
                        }
                    }]
                },
                {
                    attributes: ['code_tahun_ajaran', 'tahun_ajaran'],
                    model: tahunAjaranModel
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