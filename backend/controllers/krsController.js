const krsModel = require('../models/krsModel.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const { Op } = require('sequelize')

module.exports = {
    getAll: async (req, res, next) => {
        const tahunAjaran = parseInt(req.query.tahunAjaran) || 0
        const prodi = parseInt(req.query.prodi) || 0


    },

    getById: async (req, res, next) => {
        const id = req.params.id
        await mataKuliahModel.findOne({
            include: [
                {
                    model: jenjangPendidikanModel,
                    where: { status: "aktif" }
                },
                {
                    model: fakultasModel,
                    where: { status: "aktif" }
                },
                {
                    model: prodiModel,
                    where: { status: "aktif" }
                },
                {
                    model: tahunAjaranModel,
                    where: { status: "aktif" }
                },
            ],
            where: {
                id_mata_kuliah: id,
                status: "aktif"
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data mata kuliah Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data mata kuliah Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    post: async (req, res, next) => {
        const { nama_mata_kuliah, jenis_mata_kuliah, code_jenjang_pendidikan, code_fakultas,
            code_prodi, code_tahun_ajaran, sks, sks_praktek, sks_prak_lapangan,
            sks_simulasi, metode_pembelajaran, tanggal_aktif, tanggal_non_aktif } = req.body
        const no_urut_makul_terakhir = await mataKuliahModel.count({
            where: {
                code_prodi: code_prodi,
                code_tahun_ajaran: code_tahun_ajaran
            }
        })
        var no_urut_makul
        if (no_urut_makul_terakhir == null) {
            no_urut_makul = "0001"
        } else {
            const code = "0000"
            const a = no_urut_makul_terakhir.toString()
            const panjang = a.length
            const nomor = code.slice(panjang)
            const b = no_urut_makul_terakhir + 1
            no_urut_makul = nomor + b
        }
        const codeMataKuliah = code_prodi + no_urut_makul
        const mataKuliahUse = await mataKuliahModel.findOne({
            where: {
                nama_mata_kuliah: nama_mata_kuliah,
                code_mata_kuliah: codeMataKuliah,
                jenis_mata_kuliah: jenis_mata_kuliah,
                code_prodi: code_prodi,
                status: "aktif"
            }
        })
        if (mataKuliahUse) return res.status(401).json({ message: "data mata kuliah sudah ada" })
        await mataKuliahModel.create({
            code_mata_kuliah: codeMataKuliah,
            nama_mata_kuliah: nama_mata_kuliah,
            jenis_mata_kuliah: jenis_mata_kuliah,
            code_jenjang_pendidikan: code_jenjang_pendidikan,
            code_fakultas: code_fakultas,
            code_prodi: code_prodi,
            code_tahun_ajaran: code_tahun_ajaran,
            code_kategori_nilai: "",
            sks: sks,
            sks_praktek: sks_praktek,
            sks_prak_lapangan: sks_prak_lapangan,
            sks_simulasi: sks_simulasi,
            metode_pembelajaran: metode_pembelajaran,
            tanggal_aktif: tanggal_aktif,
            tanggal_non_aktif: tanggal_non_aktif,
            status_bobot_makul: "",
            status_makul: "",
            status: "aktif"
        }).
            then(result => {
                res.status(201).json({
                    message: "Data mata kuliah success Ditambahkan",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    put: async (req, res, next) => {
        const id = req.params.id
        const mataKuliahUse = await mataKuliahModel.findOne({
            include: [
                {
                    model: jenjangPendidikanModel,
                    where: { status: "aktif" }
                },
                {
                    model: fakultasModel,
                    where: { status: "aktif" }
                },
                {
                    model: prodiModel,
                    where: { status: "aktif" }
                },
                {
                    model: tahunAjaranModel,
                    where: { status: "aktif" }
                }
            ],
            where: {
                id_mata_kuliah: id,
                status: "aktif"
            }
        })
        if (!mataKuliahUse) return res.status(401).json({ message: "Data Mata Kuliah tidak ditemukan" })
        const { nama_mata_kuliah, jenis_mata_kuliah, code_jenjang_pendidikan, code_fakultas,
            code_prodi, code_tahun_ajaran, sks, sks_praktek, sks_prak_lapangan,
            sks_simulasi, metode_pembelajaran, tanggal_aktif, tanggal_non_aktif } = req.body
        const mataKuliahDuplicate = await mataKuliahModel.findOne({
            where: {
                nama_mata_kuliah: nama_mata_kuliah,
                jenis_mata_kuliah: jenis_mata_kuliah,
                code_prodi: code_prodi,
                status: "aktif"
            }
        })
        if (mataKuliahDuplicate) return res.status(401).json({ message: "data mata kuliah sudah ada" })
        const no_urut_makul_terakhir = await mataKuliahModel.count({
            where: {
                code_prodi: code_prodi,
            }
        })
        var no_urut_makul
        if (no_urut_makul_terakhir == null) {
            no_urut_makul = "0001"
        } else {
            const code = "0000"
            const a = no_urut_makul_terakhir.toString()
            const panjang = a.length
            const nomor = code.slice(panjang)
            const b = no_urut_makul_terakhir + 1
            no_urut_makul = nomor + b
        }
        const codeMataKuliah = code_prodi + no_urut_makul
        await mataKuliahModel.update({
            code_mata_kuliah: codeMataKuliah,
            nama_mata_kuliah: nama_mata_kuliah,
            jenis_mata_kuliah: jenis_mata_kuliah,
            code_jenjang_pendidikan: code_jenjang_pendidikan,
            code_fakultas: code_fakultas,
            code_prodi: code_prodi,
            code_tahun_ajaran: code_tahun_ajaran,
            code_kategori_nilai: "",
            sks: sks,
            sks_praktek: sks_praktek,
            sks_prak_lapangan: sks_prak_lapangan,
            sks_simulasi: sks_simulasi,
            metode_pembelajaran: metode_pembelajaran,
            tanggal_aktif: tanggal_aktif,
            tanggal_non_aktif: tanggal_non_aktif,
            status_bobot_makul: "",
            status_makul: "",
            status: "aktif"
        }, {
            where: {
                id_mata_kuliah: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data mata kuliah success Diupdate",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    delete: async (req, res, next) => {
        const id = req.params.id
        const mataKuliahUse = await mataKuliahModel.findOne({
            include: [
                {
                    model: semesterModel,
                    where: { status: "aktif" }
                },
                {
                    model: jenjangPendidikanModel,
                    where: { status: "aktif" }
                },
                {
                    model: fakultasModel,
                    where: { status: "aktif" }
                },
                {
                    model: prodiModel,
                    where: { status: "aktif" }
                },
                {
                    model: tahunAjaranModel,
                    where: { status: "aktif" }
                }
            ],
            where: {
                id_mata_kuliah: id,
                status: "aktif"
            }
        })
        if (!mataKuliahUse) return res.status(401).json({ message: "Data mata kuliah tidak ditemukan" })
        await mataKuliahModel.update({
            status: "tidak"
        }, {
            where: {
                id_mata_kuliah: id
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "data mata kuliah succes dihapus"
                })
            }).
            catch(err => {
                next(err)
            })
    }

}