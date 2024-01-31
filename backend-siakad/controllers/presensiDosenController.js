const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const fakultasModel = require('../models/fakultasModel.js')
const prodi = require('../models/prodiModel.js')
const tahunAjaranModel = require('../models/tahunAjaranModel.js')
const semesterModel = require('../models/semesterModel.js')
const jadwalKuliahModel = require('../models/jadwalKuliahModel.js')
const jadwalPertemuanModel = require('../models/jadwalPertemuanModel.js')
const dosenModel = require('../models/dosenModel.js')
const presensiDosenModel = require('../models/presensiDosenModel.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const sebaranMataKuliah = require('../models/sebaranMataKuliah.js')
const rfidosenModel = require('../models/rfidDosenModel.js')
const { Op, Sequelize, fn, col } = require('sequelize')

module.exports = {
    getDosenValidasiAvailable: async (req, res, next) => {
        const { tgl, thn, smt, jnj, fks, prd } = req.params

        await presensiDosenModel.findAll({
            include: [
                {
                    attributes: ["nama"],
                    model: dosenModel
                },
            ],
            where: {
                tanggal: tgl,
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

    getDosenValidasiNoAvailable: async (req, res, next) => {
        const { tgl, thn, smt, jnj, fks, prd } = req.params
        const dataPresensiNipy = await presensiDosenModel.findAll({
            where: {
                tanggal: tgl,
                code_tahun_ajaran: thn,
                code_semester: smt,
                code_jenjang_pendidikan: jnj,
                code_fakultas: fks,
                code_prodi: prd,
                status: "aktif"
            }
        })
        const dataPresensiNipyUse = dataPresensiNipy.map(el => { return el.nip_ynaa })

        await jadwalPertemuanModel.findAll({
            attributes: ["code_jadwal_pertemuan", "pertemuan", "tanggal_pertemuan"],
            include: [
                {
                    attributes: ["dosen_pengajar"],
                    model: jadwalKuliahModel,
                    where: {
                        dosen_pengajar: {
                            [Op.not]: dataPresensiNipyUse
                        },
                        code_tahun_ajaran: thn,
                        code_semester: smt,
                        code_jenjang_pendidikan: jnj,
                        code_fakultas: fks,
                        code_prodi: prd,
                        status: "aktif"
                    },
                    include: [{
                        attributes: ['nama'],
                        model: dosenModel,
                        as: "dosenPengajar"
                    }]
                }
            ],
            where: {
                tanggal_pertemuan: tgl,
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

    // progresPresensi: async (req, res, next) => {
    //     const { code, thn, smt, jnj, fks, prd } = req.params
    //     const jmlMhs = await historyMahasiswa.count({
    //         where: {
    //             code_tahun_ajaran: thn,
    //             code_semester: smt,
    //             code_jenjang_pendidikan: jnj,
    //             code_fakultas: fks,
    //             code_prodi: prd,
    //             status: "aktif"
    //         }
    //     })
    //     const jmlMhsAbsen = await presensiMhsModel.count({
    //         where: {
    //             code_jadwal_pertemuan: code,
    //             code_tahun_ajaran: thn,
    //             code_semester: smt,
    //             code_jenjang_pendidikan: jnj,
    //             code_fakultas: fks,
    //             code_prodi: prd,
    //             status: "aktif"
    //         }
    //     })
    //     res.status(201).json({
    //         message: "Data progres presensi",
    //         data: {
    //             jumlah_mahasiswa: jmlMhs,
    //             jumlah_mahasiswa_presensi: jmlMhsAbsen
    //         }
    //     })
    // },

    presensiByRfid: async (req, res, next) => {
        const { codeRfid, tgl } = req.body
        const date = new Date()
        const jam = date.toLocaleTimeString('it-IT')
        let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)
        const dataRfid = await rfidosenModel.findOne({
            where: {
                code_rfid: codeRfid,
                status: "aktif"
            }
        })
        if (!dataRfid) return res.status(404).json({ message: "Data rfid Tidak Ditemukan" })
        const dataDosen = await dosenModel.findOne({
            where: {
                nip_ynaa: dataRfid.nip_ynaa,
                status: "aktif"
            }
        })
        if (!dataDosen) return res.status(404).json({ message: "Data dosen Tidak Ditemukan" })
        const valDafJadperDosen = await jadwalPertemuanModel.findOne({
            include: [{
                model: jadwalKuliahModel,
                where: {
                    dosen_pengajar: dataRfid.nip_ynaa
                }
            }],
            where: {
                tanggal_pertemuan: tgl,
                status: "aktif"
            }
        })
        if (!valDafJadperDosen) return res.status(404).json({ message: "Data anda tidak ditemukan dalam daftar jadwal pertemuan Tidak Ditemukan" })

        const duplicateDataUse = await presensiDosenModel.findOne({
            where: {
                code_tahun_ajaran: valDafJadperDosen.jadwalKuliahs[0].code_tahun_ajaran,
                code_semester: valDafJadperDosen.jadwalKuliahs[0].code_semester,
                code_jenjang_pendidikan: valDafJadperDosen.jadwalKuliahs[0].code_jenjang_pendidikan,
                code_fakultas: valDafJadperDosen.jadwalKuliahs[0].code_fakultas,
                code_prodi: valDafJadperDosen.jadwalKuliahs[0].code_prodi,
                code_jadwal_pertemuan: valDafJadperDosen.code_jadwal_pertemuan,
                nip_ynaa: dataRfid.nip_ynaa,
                tanggal: tgl
            }
        })

        if (duplicateDataUse) {
            if (duplicateDataUse.jam_pulang == null || duplicateDataUse.jam_pulang == "") {
                await presensiDosenModel.update({
                    jam_pulang: jam,
                }, {
                    where: {
                        id_presensi_dosen: duplicateDataUse.id_presensi_dosen,
                        nip_ynaa: dataRfid.nip_ynaa
                    }
                }).
                    then(result => {
                        res.status(201).json({
                            message: "Data presensi berhasil disimpan",
                            data: result.nip_ynaa
                        })
                    }).
                    catch(err => {
                        next(err)
                    })
            } else {
                res.status(201).json({
                    message: "Anda sudah melakukan absen ",
                })
            }
        } else {
            await presensiDosenModel.create({
                code_presensi_dosen: randomNumber,
                code_tahun_ajaran: valDafJadperDosen.jadwalKuliahs[0].code_tahun_ajaran,
                code_semester: valDafJadperDosen.jadwalKuliahs[0].code_semester,
                code_jenjang_pendidikan: valDafJadperDosen.jadwalKuliahs[0].code_jenjang_pendidikan,
                code_fakultas: valDafJadperDosen.jadwalKuliahs[0].code_fakultas,
                code_prodi: valDafJadperDosen.jadwalKuliahs[0].code_prodi,
                code_jadwal_pertemuan: valDafJadperDosen.code_jadwal_pertemuan,
                nip_ynaa: dataRfid.nip_ynaa,
                tanggal: tgl,
                masuk_luring: 1,
                masuk_daring: 0,
                izin: 0,
                jam_masuk: jam,
                jam_pulang: "",
                keterangan: "hadir",
                status: "aktif"
            }).
                then(result => {
                    res.status(201).json({
                        message: "Data presensi berhasil disimpan",
                        data: result.nim
                    })
                }).
                catch(err => {
                    next(err)
                })
        }
    },

    validasiPresensi: async (req, res, next) => {
        let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)
        const id = req.params.id
        const { absensi, codeThn, codeSmt, codeJnj, codeFks,
            codePrd, tgl, nip_ynaa, codeJadper, jam_masuk, jam_pulang } = req.body
        const dataUse = presensiDosenModel.findOne({
            where: {
                id_presensi_dosen: id,
                status: "aktif"
            }
        })
        if (!dataUse) return res.status(404).json({ message: "Data Tidak Ditemukan" })
        const dataUseValidasiNipy = await presensiDosenModel.findOne({
            where: {
                code_tahun_ajaran: codeThn,
                code_semester: codeSmt,
                code_jenjang_pendidikan: codeJnj,
                code_fakultas: codeFks,
                code_prodi: codePrd,
                tanggal: tgl,
                nip_ynaa: nip_ynaa,
                status: "aktif"
            }
        })
        let lrg = ""
        let drg = ""
        let izn = ""
        let ket = ""
        let jm_msk = ""
        let jm_plg = ""
        if (absensi == "A") {
            lrg = 1
            drg = 0
            izn = 0
            jm_msk = jam_masuk
            jm_plg = jam_pulang
            ket = "Hadir"
        } else if (absensi == "B") {
            lrg = 0
            drg = 1
            izn = 0
            jm_msk = jam_masuk
            jm_plg = jam_pulang
            ket = "Zoom"
        } else if (absensi == "C") {
            lrg = 0
            drg = 0
            izn = 1
            jm_msk = ""
            jm_plg = ""
            ket = "Izin"
        }
        if (dataUseValidasiNipy == null) {
            await presensiDosenModel.create({
                code_presensi_mahasiswa: randomNumber,
                code_tahun_ajaran: codeThn,
                code_semester: codeSmt,
                code_jenjang_pendidikan: codeJnj,
                code_fakultas: codeFks,
                code_prodi: codePrd,
                code_jadwal_pertemuan: codeJadper,
                nip_ynaa: nip_ynaa,
                tanggal: tgl,
                masuk_daring: drg,
                masuk_luring: lrg,
                izin: izn,
                jam_masuk: jm_msk,
                jam_pulang: jm_plg,
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
            await presensiDosenModel.update({
                masuk_luring: lrg,
                masuk_daring: drg,
                izin: izn,
                jam_masuk: jm_msk,
                jam_pulang: jm_plg,
                keterangan: ket,
            }, {
                where: {
                    id_presensi_dosen: id
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

    getStatusAbsen: async (req, res, next) => {
        const codeJadper = req.params.codeJadper
        const dataUse = await presensiMhsModel.count({
            where: {
                code_jadwal_pertemuan: codeJadper
            }
        })
        if (dataUse > 0) {
            res.status(201).json({
                message: "Data absen sudah dilakukan",
                data: "sudah dilakukan"
            })
        } else {
            res.status(201).json({
                message: "Data absen belum dilakukan",
                data: "belum dilakukan"
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
            attributes: ["masuk", "izin", "alpha", "nim",
                [Sequelize.fn('sum', Sequelize.col('masuk')), 'total_masuk'],
                [Sequelize.fn('sum', Sequelize.col('izin')), 'total_izin'],
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
            attributes: ["masuk", "izin", "alpha",
                [Sequelize.fn('sum', Sequelize.col('masuk')), 'total_masuk'],
                [Sequelize.fn('sum', Sequelize.col('izin')), 'total_izin'],
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