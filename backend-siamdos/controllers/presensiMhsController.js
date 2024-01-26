const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const fakultasModel = require('../models/fakultasModel.js')
const prodi = require('../models/prodiModel.js')
const tahunAjaranModel = require('../models/tahunAjaranModel.js')
const semesterModel = require('../models/semesterModel.js')
const jadwalKuliahModel = require('../models/jadwalKuliahModel.js')
const jadwalPertemuanModel = require('../models/jadwalPertemuanModel.js')
const mahasiswaModel = require('../models/mahasiswaModel.js')
const presensiMhsModel = require('../models/presensiMhsModel.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const sebaranMataKuliah = require('../models/sebaranMataKuliah.js')
const dosenModel = require('../models/dosenModel.js')
const rfidModel = require('../models/rfidModel.js')
const historyMahasiswa = require('../models/historyMahasiswaModel.js')
const krsModel = require('../models/krsModel.js')
const { Op, Sequelize, fn, col } = require('sequelize')

module.exports = {
    getMakulByDosen: async (req, res, next) => {
        const { nipy, thn, smt, jnj, fks, prd } = req.params
        await jadwalKuliahModel.findAll({
            include: [
                {
                    attributes: ["id_sebaran", "code_sebaran", "status_makul", "status_bobot_makul"],
                    model: sebaranMataKuliah,
                    where: {
                        code_tahun_ajaran: thn,
                        code_semester: smt,
                        status: "aktif"
                    },
                    include: [{
                        attributes: ["id_mata_kuliah", "nama_mata_kuliah", "jenis_mata_kuliah", "sks"],
                        model: mataKuliahModel
                    }]
                },
                {
                    attributes: ['nama'],
                    model: dosenModel,
                    as: "dosenPengajar"
                }
            ],
            where: {
                dosen_pengajar: nipy,
                code_tahun_ajaran: thn,
                code_semester: smt,
                code_jenjang_pendidikan: jnj,
                code_fakultas: fks,
                code_prodi: prd,
                status: "aktif"
            }
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data mata kuliah yang diampu Tidak Ditemukan",
                        data: []
                    })
                }
                res.status(201).json({
                    message: "Data mata kuliah yang diampu Ditemukan",
                    data: result
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getPertemuanByDosen: async (req, res, next) => {
        const codeJadkul = req.params.codeJadkul
        const dataJadkul = await jadwalKuliahModel.findOne({
            where: {
                code_jadwal_kuliah: codeJadkul,
                status: "aktif"
            }
        })
        if (!dataJadkul) return res.status(404).json({ message: "Data mata kuliah yang diampu Tidak Ditemukan" })

        await jadwalPertemuanModel.findAll({
            // include: [{
            //     model: jadwalKuliahModel,
            // }],
            where: {
                code_jadwal_kuliah: codeJadkul,
                status: "aktif"
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data jadwal pertemuan Ditemukan",
                    data: result
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getMhsValidasiAvailable: async (req, res, next) => {
        const { code, thn, smt, jnj, fks, prd } = req.params
        const dataUse = jadwalPertemuanModel.findOne({
            where: {
                code_jadwal_pertemuan: code,
                status: "aktif"
            }
        })
        if (!dataUse) return res.status(404).json({ message: "Data Tidak Ditemukan" })
        await presensiMhsModel.findAll({
            include: [{
                attributes: ["nama"],
                model: mahasiswaModel
            }],
            where: {
                code_jadwal_pertemuan: code,
                code_tahun_ajaran: thn,
                code_semester: smt,
                code_jenjang_pendidikan: jnj,
                code_fakultas: fks,
                code_prodi: prd,
                status: "aktif"
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data succsess",
                    data: result
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getMhsValidasiNoAvailable: async (req, res, next) => {
        const { code, makul, thn, smt, jnj, fks, prd } = req.params
        const dataUse = jadwalPertemuanModel.findOne({
            where: {
                code_jadwal_pertemuan: code,
                status: "aktif"
            }
        })
        if (!dataUse) return res.status(404).json({ message: "Data Tidak Ditemukan" })
        const dataPresensiNim = await presensiMhsModel.findAll({
            include: [{
                attributes: ["nama"],
                model: mahasiswaModel
            }],
            where: {
                code_jadwal_pertemuan: code,
                code_tahun_ajaran: thn,
                code_semester: smt,
                code_jenjang_pendidikan: jnj,
                code_fakultas: fks,
                code_prodi: prd,
                status: "aktif"
            }
        })
        const dataPresensiNimUse = dataPresensiNim.map(el => { return el.nim })
        await krsModel.findAll({
            include: [{
                model: mahasiswaModel,
                attributes: ["nama"]
            }],
            attributes: ["nim"],
            where: {
                nim: {
                    [Op.not]: dataPresensiNimUse
                },
                code_tahun_ajaran: thn,
                code_semester: smt,
                code_jenjang_pendidikan: jnj,
                code_fakultas: fks,
                code_prodi: prd,
                code_mata_kuliah: makul,
                status: "aktif"
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data success",
                    data: result
                })
            }).
            catch(err => {
                console.log(err)
            })
    },

    progresPresensi: async (req, res, next) => {
        const { code, thn, smt, jnj, fks, prd } = req.params
        const jmlMhs = await historyMahasiswa.count({
            where: {
                code_tahun_ajaran: thn,
                code_semester: smt,
                code_jenjang_pendidikan: jnj,
                code_fakultas: fks,
                code_prodi: prd,
                status: "aktif"
            }
        })
        const jmlMhsAbsen = await presensiMhsModel.count({
            where: {
                code_jadwal_pertemuan: code,
                code_tahun_ajaran: thn,
                code_semester: smt,
                code_jenjang_pendidikan: jnj,
                code_fakultas: fks,
                code_prodi: prd,
                status: "aktif"
            }
        })
        res.status(201).json({
            message: "Data progres presensi",
            data: {
                jumlah_mahasiswa: jmlMhs,
                jumlah_mahasiswa_presensi: jmlMhsAbsen
            }
        })
    },

    presensiByRfid: async (req, res, next) => {
        const { codeRfid, codeThn, codeSmt, codeJnj, codeFks, codePrd, codeJadper } = req.body
        let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)
        const date = new Date().toLocaleDateString('en-CA')
        const dataRfid = await rfidModel.findOne({
            where: {
                code_rfid: codeRfid,
                status: "aktif"
            }
        })
        if (!dataRfid) return res.status(404).json({ message: "Data rfid Tidak Ditemukan" })
        const dataHistoryUse = await historyMahasiswa.findOne({
            where: {
                code_tahun_ajaran: codeThn,
                code_semester: codeSmt,
                code_jenjang_pendidikan: codeJnj,
                code_fakultas: codeFks,
                code_prodi: codePrd,
                nim: dataRfid.nim,
                status: "aktif"
            }
        })
        if (!dataHistoryUse) return res.status(404).json({ message: "Data mahasiswa Tidak Ditemukan" })
        const duplicateDataUse = await presensiMhsModel.findOne({
            where: {
                code_tahun_ajaran: codeThn,
                code_semester: codeSmt,
                code_jenjang_pendidikan: codeJnj,
                code_fakultas: codeFks,
                code_prodi: codePrd,
                code_jadwal_pertemuan: codeJadper,
                nim: dataRfid.nim,
                tanggal: date
            }
        })
        if (duplicateDataUse) return res.status(404).json({ message: "anda sudah melakukan absensi" })
        await presensiMhsModel.create({
            code_presensi_mahasiswa: randomNumber + dataRfid.nim,
            code_tahun_ajaran: codeThn,
            code_semester: codeSmt,
            code_jenjang_pendidikan: codeJnj,
            code_fakultas: codeFks,
            code_prodi: codePrd,
            code_jadwal_pertemuan: codeJadper,
            nim: dataRfid.nim,
            tanggal: date,
            masuk: 1,
            izin: 0,
            sakit: 0,
            alpha: 0,
            keterangan: "hadir",
            status: "aktif"
        }).
            then(result => {
                res.status(201).json({
                    message: "Data presensi berhasil disimpan",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    validasiPresensi: async (req, res, next) => {
        let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)
        const date = new Date().toLocaleDateString('en-CA')
        const id = req.params.id
        const { absensi, codeThn, codeSmt, codeJnj, codeFks, codePrd, codeJadper, nim } = req.body
        const dataUse = presensiMhsModel.findOne({
            where: {
                id_presensi_mahasiswa: id,
                status: "aktif"
            }
        })
        if (!dataUse) return res.status(404).json({ message: "Data Tidak Ditemukan" })
        const dataUseValidasiNim = await presensiMhsModel.findOne({
            where: {
                code_tahun_ajaran: codeThn,
                code_semester: codeSmt,
                code_jenjang_pendidikan: codeJnj,
                code_fakultas: codeFks,
                code_prodi: codePrd,
                code_jadwal_pertemuan: codeJadper,
                nim: nim,
                status: "aktif"
            }
        })
        let msk = ""
        let izn = ""
        let skt = ""
        let alp = ""
        let ket = ""
        if (absensi == "A") {
            msk = 1
            izn = 0
            skt = 0
            alp = 0
            ket = "Hadir"
        } else if (absensi == "B") {
            msk = 0
            izn = 1
            skt = 0
            alp = 0
            ket = "Izin"
        } else if (absensi == "C") {
            msk = 0
            izn = 0
            skt = 1
            alp = 0
            ket = "Sakit"
        } else if (absensi == "D") {
            msk = 0
            izn = 0
            skt = 0
            alp = 1
            ket = "Alpha"
        }
        if (dataUseValidasiNim == null) {
            await presensiMhsModel.create({
                code_presensi_mahasiswa: randomNumber + nim,
                code_tahun_ajaran: codeThn,
                code_semester: codeSmt,
                code_jenjang_pendidikan: codeJnj,
                code_fakultas: codeFks,
                code_prodi: codePrd,
                code_jadwal_pertemuan: codeJadper,
                nim: nim,
                tanggal: date,
                masuk: msk,
                izin: izn,
                sakit: skt,
                alpha: alp,
                keterangan: ket,
                status: "aktif",
            }).
                then(result => {
                    res.status(201).json({
                        message: "Data presensi berhasil diupdate",
                    })
                }).
                catch(err => {
                    next(err)
                })
        } else {
            await presensiMhsModel.update({
                masuk: msk,
                izin: izn,
                sakit: skt,
                alpha: alp,
                keterangan: ket,
            }, {
                where: {
                    id_presensi_mahasiswa: id
                }
            }).
                then(result => {
                    res.status(201).json({
                        message: "Data presensi berhasil diupdate",
                    })
                }).
                catch(err => {
                    next(err)
                })
        }
    },

    rekapPresensi: async (req, res, next) => {
        const { codeJadkul, thn, smt, jnj, fks, prd } = req.params
        const dataJadPer = await jadwalPertemuanModel.findAll({
            where: {
                code_jadwal_kuliah: codeJadkul,
                status: "aktif"
            }
        })
        const dataJadperUse = dataJadPer.map(el => { return el.code_jadwal_pertemuan })
        await presensiMhsModel.findAll({
            include: [
                {
                    attributes: ["pertemuan"],
                    model: jadwalPertemuanModel
                }, {
                    attributes: ["nama"],
                    model: mahasiswaModel
                }
            ],
            attributes: ["masuk", "izin", "sakit", "alpha", "nim",
                [Sequelize.fn('sum', Sequelize.col('masuk')), 'total_masuk'],
                [Sequelize.fn('sum', Sequelize.col('izin')), 'total_izin'],
                [Sequelize.fn('sum', Sequelize.col('sakit')), 'total_sakit'],
                [Sequelize.fn('sum', Sequelize.col('alpha')), 'total_alpha'],
            ],
            where: {
                code_tahun_ajaran: thn,
                code_semester: smt,
                code_jenjang_pendidikan: jnj,
                code_fakultas: fks,
                code_prodi: prd,
                code_jadwal_pertemuan: dataJadperUse,
                status: "aktif"
            },
            group: ["nim"]
        }).then(all => {
            res.status(201).json({
                message: "Data presensi berhasil diupdate",
                data: all
            })
        }).catch(err => {
            next(err)
        })
    },

    detailRekapPresensi: async (req, res, next) => {
        const { nim, thn, smt, jnj, fks, prd } = req.params
        await presensiMhsModel.findAll({
            attributes: ["masuk", "izin", "sakit", "alpha",
                [Sequelize.fn('sum', Sequelize.col('masuk')), 'total_masuk'],
                [Sequelize.fn('sum', Sequelize.col('izin')), 'total_izin'],
                [Sequelize.fn('sum', Sequelize.col('sakit')), 'total_sakit'],
                [Sequelize.fn('sum', Sequelize.col('alpha')), 'total_alpha'],
            ],
            where: {
                code_tahun_ajaran: thn,
                code_semester: smt,
                code_jenjang_pendidikan: jnj,
                code_fakultas: fks,
                code_prodi: prd,
                nim: nim,
                status: "aktif"
            }
        }).
            then(result => {
                totalItem = result
                return presensiMhsModel.findAll({
                    include: [
                        {
                            attributes: ["pertemuan"],
                            model: jadwalPertemuanModel
                        }, {
                            attributes: ["nama"],
                            model: mahasiswaModel
                        }
                    ],
                    where: {
                        code_tahun_ajaran: thn,
                        code_semester: smt,
                        code_jenjang_pendidikan: jnj,
                        code_fakultas: fks,
                        code_prodi: prd,
                        nim: nim,
                        status: "aktif"
                    }
                })
            }).then(all => {
                res.status(201).json({
                    message: "Data presensi berhasil diupdate",
                    data: all,
                    datas: totalItem
                })
            }).catch(err => {
                next(err)
            })
    }
}