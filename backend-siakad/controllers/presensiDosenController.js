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

    progresPresensi: async (req, res, next) => {
        const { tgl, thn } = req.params
        const jmlDosen = await jadwalPertemuanModel.count({
            include: [
                {
                    model: jadwalKuliahModel,
                    where: {
                        code_tahun_ajaran: thn,
                        status: "aktif"
                    }
                }
            ],
            where: {
                tanggal_pertemuan: tgl,
                status: "aktif"
            }
        })

        const jmlDosenAbsenMasuk = await presensiDosenModel.count({
            where: {
                tanggal: tgl,
                code_tahun_ajaran: thn,
                jam_masuk: {
                    [Op.not]: ""
                },
                status: "aktif"
            }
        })

        const jmlDosenAbsenPulang = await presensiDosenModel.count({
            where: {
                tanggal: tgl,
                code_tahun_ajaran: thn,
                jam_pulang: {
                    [Op.not]: ""
                },
                status: "aktif"
            }
        })

        res.status(201).json({
            message: "Data progres presensi",
            data: {
                jumlah_dosen: jmlDosen,
                jumlah_dosen_presensi_masuk: jmlDosenAbsenMasuk,
                jumlah_dosen_presensi_pulang: jmlDosenAbsenPulang
            }
        })
    },

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
        const valDafJadperDosen = await jadwalPertemuanModel.findAll({
            include: [{
                model: jadwalKuliahModel,
                where: {
                    dosen_pengajar: dataRfid.nip_ynaa
                },
                order: [
                    ["jam_mulai", "ASC"]
                ]
            }],
            where: {
                tanggal_pertemuan: tgl,
                status: "aktif"
            },
            order: [
                ["id_jadwal_pertemuan", "ASC"]
            ]
        })
        if (!valDafJadperDosen) return res.status(404).json({ message: "Data anda tidak ditemukan dalam daftar jadwal pertemuan Tidak Ditemukan" })
        const valPresensiDosen = await presensiDosenModel.findAll({
            where: {
                nip_ynaa: dataRfid.nip_ynaa,
                tanggal: tgl
            }
        })
        const validasiJamPulang = await presensiDosenModel.findOne({
            where: {
                nip_ynaa: dataRfid.nip_ynaa,
                tanggal: tgl,
                jam_pulang: "",
                status: "aktif"
            }
        })
        if (validasiJamPulang) {
            await presensiDosenModel.update({
                jam_pulang: jam,
            }, {
                where: {
                    id_presensi_dosen: validasiJamPulang.id_presensi_dosen,
                    nip_ynaa: dataRfid.nip_ynaa
                }
            }).
                then(result => {
                    res.status(201).json({
                        message: "Data presensi berhasil disimpan",
                        data: dataDosen.id_dosen
                    })
                }).
                catch(err => {
                    next(err)
                })
        } else {
            const valDafJadperDosenUse = valDafJadperDosen.map(el => { return el.code_jadwal_pertemuan })
            const valPresensiDosenUse = valPresensiDosen.map(rs => { return rs.code_jadwal_pertemuan })
            const filtered = valDafJadperDosenUse.filter(item => !valPresensiDosenUse.includes(item));
            console.log(filtered);
            if (filtered == "") return res.status(404).json({ message: "anda tidak mempunyai jadwal mengajar hari ini" })
            const filter = filtered[0]
            const duplicateDataUse = await presensiDosenModel.findOne({
                where: {
                    code_jadwal_pertemuan: filter,
                    nip_ynaa: dataRfid.nip_ynaa,
                    tanggal: tgl
                }
            })
            if (duplicateDataUse) {
                res.status(201).json({
                    message: "Anda sudah melakukan absen ",
                })
            } else {
                const dataUse = await jadwalPertemuanModel.findOne({
                    include: [{
                        model: jadwalKuliahModel,
                        where: {
                            dosen_pengajar: dataRfid.nip_ynaa
                        },
                        order: [
                            ["jam_mulai", "ASC"]
                        ]
                    }],
                    where: {
                        tanggal_pertemuan: tgl,
                        code_jadwal_pertemuan: filter,
                        status: "aktif"
                    },
                    order: [
                        ["id_jadwal_pertemuan", "ASC"]
                    ]
                })

                await presensiDosenModel.create({
                    code_presensi_dosen: randomNumber,
                    code_tahun_ajaran: dataUse.jadwalKuliahs[0].code_tahun_ajaran,
                    code_semester: dataUse.jadwalKuliahs[0].code_semester,
                    code_jenjang_pendidikan: dataUse.jadwalKuliahs[0].code_jenjang_pendidikan,
                    code_fakultas: dataUse.jadwalKuliahs[0].code_fakultas,
                    code_prodi: dataUse.jadwalKuliahs[0].code_prodi,
                    code_jadwal_pertemuan: dataUse.code_jadwal_pertemuan,
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
                            data: dataDosen.id_dosen
                        })
                    }).
                    catch(err => {
                        next(err)
                    })
            }
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
                code_presensi_dosen: randomNumber,
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

    rekapPresensiPersmt: async (req, res, next) => {
        const { thn, smt, jnj, fks, prd } = req.params
        await presensiDosenModel.findAll({
            include: [
                {
                    attributes: ['nama'],
                    model: dosenModel,
                }
            ],
            attributes: ["masuk_luring", "masuk_daring", "izin", "nip_ynaa",
                [Sequelize.fn('sum', Sequelize.col('masuk_luring')), 'total_masuk_luring'],
                [Sequelize.fn('sum', Sequelize.col('masuk_daring')), 'total_masuk_daring'],
                [Sequelize.fn('sum', Sequelize.col('izin')), 'total_izin'],
            ],
            where: {
                code_tahun_ajaran: thn,
                code_semester: smt,
                code_jenjang_pendidikan: jnj,
                code_fakultas: fks,
                code_prodi: prd,
                status: "aktif"
            },
            group: ["nip_ynaa"]
        }).then(all => {
            res.status(201).json({
                message: "Data presensi berhasil diupdate",
                data: all
            })
        }).catch(err => {
            next(err)
        })
    },

    detailRekapPresensiPersmt: async (req, res, next) => {
        const { nipy, thn, smt, jnj, fks, prd } = req.params
        await presensiDosenModel.findAll({
            attributes: ["masuk_luring", "masuk_daring", "izin", "nip_ynaa",
                [Sequelize.fn('sum', Sequelize.col('masuk_luring')), 'total_masuk_luring'],
                [Sequelize.fn('sum', Sequelize.col('masuk_daring')), 'total_masuk_daring'],
                [Sequelize.fn('sum', Sequelize.col('izin')), 'total_izin'],
            ],
            where: {
                code_tahun_ajaran: thn,
                code_semester: smt,
                code_jenjang_pendidikan: jnj,
                code_fakultas: fks,
                code_prodi: prd,
                nip_ynaa: nipy,
                status: "aktif"
            }
        }).
            then(result => {
                totalItem = result
                return presensiDosenModel.findAll({
                    include: [
                        {
                            attributes: ["pertemuan"],
                            model: jadwalPertemuanModel
                        }, {
                            attributes: ["nama"],
                            model: dosenModel
                        }
                    ],
                    where: {
                        code_tahun_ajaran: thn,
                        code_semester: smt,
                        code_jenjang_pendidikan: jnj,
                        code_fakultas: fks,
                        code_prodi: prd,
                        nip_ynaa: nipy,
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
    },

    rekapPresensiPerbln: async (req, res, next) => {
        const { bln, thn, smt, jnj, fks, prd } = req.params
        await presensiDosenModel.findAll({
            include: [
                {
                    attributes: ['nama'],
                    model: dosenModel,
                }
            ],
            attributes: ["masuk_luring", "masuk_daring", "izin", "nip_ynaa", "tanggal",
                [Sequelize.fn('sum', Sequelize.col('masuk_luring')), 'total_masuk_luring'],
                [Sequelize.fn('sum', Sequelize.col('masuk_daring')), 'total_masuk_daring'],
                [Sequelize.fn('sum', Sequelize.col('izin')), 'total_izin'],
            ],
            where: {
                [Op.and]: [
                    Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('tanggal')), bln),
                ],
                code_tahun_ajaran: thn,
                code_semester: smt,
                code_jenjang_pendidikan: jnj,
                code_fakultas: fks,
                code_prodi: prd,
                status: "aktif"
            },
            group: ["nip_ynaa"]
        }).then(all => {
            res.status(201).json({
                message: "Data presensi berhasil diupdate",
                data: all
            })
        }).catch(err => {
            next(err)
        })
    },

    detailRekapPresensiPerbln: async (req, res, next) => {
        const { nipy, bln, thn, smt, jnj, fks, prd } = req.params
        await presensiDosenModel.findAll({
            attributes: ["masuk_luring", "masuk_daring", "izin", "nip_ynaa", "tanggal",
                [Sequelize.fn('sum', Sequelize.col('masuk_luring')), 'total_masuk_luring'],
                [Sequelize.fn('sum', Sequelize.col('masuk_daring')), 'total_masuk_daring'],
                [Sequelize.fn('sum', Sequelize.col('izin')), 'total_izin'],
            ],
            where: {
                [Op.and]: [
                    Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('tanggal')), bln),
                ],
                code_tahun_ajaran: thn,
                code_semester: smt,
                code_jenjang_pendidikan: jnj,
                code_fakultas: fks,
                code_prodi: prd,
                nip_ynaa: nipy,
                status: "aktif"
            }
        }).
            then(result => {
                totalItem = result
                return presensiDosenModel.findAll({
                    include: [
                        {
                            attributes: ["pertemuan"],
                            model: jadwalPertemuanModel
                        }, {
                            attributes: ["nama"],
                            model: dosenModel
                        }
                    ],
                    where: {
                        [Op.and]: [
                            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('tanggal')), bln),
                        ],
                        code_tahun_ajaran: thn,
                        code_semester: smt,
                        code_jenjang_pendidikan: jnj,
                        code_fakultas: fks,
                        code_prodi: prd,
                        nip_ynaa: nipy,
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
    },

    getbulan: async (req, res, next) => {
        const { thn, smt, jnj, fks, prd } = req.params
        await presensiDosenModel.findAll({
            attributes: [
                [Sequelize.literal('month(tanggal)'), 'bulan'],
            ],
            where: {
                code_tahun_ajaran: thn,
                code_semester: smt,
                code_jenjang_pendidikan: jnj,
                code_fakultas: fks,
                code_prodi: prd,
                status: "aktif"
            },
            group: [
                [Sequelize.literal('month(tanggal)'), 'bulan']
            ]
        }).then(result => {
            res.status(201).json({
                message: "Data bulan success",
                data: result
            })
        }).catch(err => {
            console.log(err)
        })
    },

    getStatusAbsen: async (req, res, next) => {
        const tgl = req.params.tgl
        const dataUse = await presensiDosenModel.count({
            where: {
                tanggal: tgl
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
}