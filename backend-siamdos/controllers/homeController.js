const { Op, Sequelize } = require("sequelize")
const dosenModel = require("../models/dosenModel")
const mahasiswaModel = require("../models/mahasiswaModel")
const prodiModel = require("../models/prodiModel")
const jadwalPertemuanModel = require("../models/jadwalPertemuanModel")
const jadwalKuliahModel = require("../models/jadwalKuliahModel")
const krsModel = require('../models/krsModel')
const mataKuliahModel = require("../models/mataKuliahModel")
const historyMahasiswa = require("../models/historyMahasiswaModel")
const sebaranMataKuliah = require("../models/sebaranMataKuliah")
const ruangModel = require("../models/ruangModel")
const nilaiKuliahModel = require("../models/nilaiKuliahModel")
const kategoriNilaiModel = require("../models/kategoriNilaiModel")
const semesterModel = require("../models/semesterModel")

module.exports = {

    jadwalKuliahNowMahasiswa: async (req, res, next) => {
        const date = new Date().toLocaleDateString('en-CA')
        const nim = req.params.nim
        const dataMahasiswa = await historyMahasiswa.findOne({
            include: [{
                model: mahasiswaModel,
                attributes: ["nama"]
            }, {
                model: prodiModel,
                attributes: ["nama_prodi"]
            }],
            where: {
                nim: nim,
                status: "aktif"
            }
        })
        if (!dataMahasiswa) return res.status(404).json({ message: "mahasiswa tidak ditemukan" })
        const dataKrsMahasiswa = await krsModel.findAll({
            where: {
                nim: nim,
                code_tahun_ajaran: dataMahasiswa.code_tahun_ajaran,
                code_semester: dataMahasiswa.code_semester,
                status_krs: "setuju",
                status: "aktif"
            }
        })
        if (!dataKrsMahasiswa) return res.status(404).json({ message: "data tidak ditemukan" })
        const dataCodeMataKuliah = dataKrsMahasiswa.map(i => { return i.code_mata_kuliah })
        const dataJadwalKuliah = await jadwalKuliahModel.findAll({
            where: {
                code_mata_kuliah: dataCodeMataKuliah,
                status: "aktif"
            }
        })
        if (!dataJadwalKuliah) return res.status(404).json({ message: "data tidak ditemukan" })
        const dataCodeJadwalKuliah = dataJadwalKuliah.map(n => { return n.code_jadwal_kuliah })
        await jadwalPertemuanModel.findAll({
            include: [
                {
                    attributes: ['id_jadwal_kuliah',
                        'code_jadwal_kuliah', 'code_kelas',
                        'code_ruang', 'hari', 'jam_mulai', 'jam_selesai',
                        'dosen_pengajar', 'dosen_pengganti'],
                    model: jadwalKuliahModel,
                    status: "aktif",
                    include: [{
                        attributes: ['id_sebaran',
                            'code_sebaran', 'status_makul',
                            'status_bobot_makul'],
                        model: sebaranMataKuliah,
                        status: "aktif",
                        include: [{
                            model: mataKuliahModel
                        }]
                    }, {
                        model: ruangModel,
                        status: "aktif"
                    }, {
                        attributes: ['nama'],
                        model: dosenModel,
                        as: "dosenPengajar"
                    }]
                },

            ],
            where: {
                tanggal_pertemuan: date,
                code_jadwal_kuliah: dataCodeJadwalKuliah,
                status: "aktif"
            }
        }).then(result => {
            res.status(200).json({
                message: "data jadwal kuliah now mahasiswa",
                data: result,
            })
        }).catch(err => {
            next(err)
        })
    },

    jadwalKuliahNowDosen : async (req, res, next) => {
        const date = new Date().toLocaleDateString('en-CA')
        const nipy = req.params.nipy
        const dataJadwalKuliah = await jadwalKuliahModel.findAll({
            where: {
                dosen_pengajar: nipy,
                status: "aktif"
            }
        })
        if (!dataJadwalKuliah) return res.status(404).json({ message: "data tidak ditemukan" })
        const dataCodeJadwalKuliah = dataJadwalKuliah.map(n => { return n.code_jadwal_kuliah })
        await jadwalPertemuanModel.findAll({
            include: [
                {
                    attributes: ['id_jadwal_kuliah',
                        'code_jadwal_kuliah', 'code_kelas',
                        'code_ruang', 'hari', 'jam_mulai', 'jam_selesai',
                        'dosen_pengajar', 'dosen_pengganti'],
                    model: jadwalKuliahModel,
                    status: "aktif",
                    include: [{
                        attributes: ['id_sebaran',
                            'code_sebaran', 'status_makul',
                            'status_bobot_makul'],
                        model: sebaranMataKuliah,
                        status: "aktif",
                        include: [{
                            model: mataKuliahModel
                        }]
                    }, {
                        model: ruangModel,
                        status: "aktif"
                    }]
                },

            ],
            where: {
                tanggal_pertemuan: date,
                code_jadwal_kuliah: dataCodeJadwalKuliah,
                status: "aktif"
            }
        }).then(result => {
            res.status(200).json({
                message: "data jadwal kuliah now mahasiswa",
                data: result,
            })
        }).catch(err => {
            next(err)
        })
    },

    makulTidakLolosMahasiswa : async (req, res, next) => {
        const nim = req.params.nim
        const code = await nilaiKuliahModel.findAll({
            include : [
                {
                    model : kategoriNilaiModel,
                    attributes : ["code_kategori_nilai","keterangan"],
                    where : {
                        keterangan : "TIDAK LULUS",
                        status : "aktif"
                    }
                }
            ],
            where : {
                nim : nim
            }
        })

        const i =  code.map(i => { return i.code_kategori_nilai })
        

        await nilaiKuliahModel.findAll({
            include: [
                {
                    model : mataKuliahModel,
                    attributes : ["code_mata_kuliah", "nama_mata_kuliah"],
                    where : {
                        status : "aktif"
                    }
                }, 
                {
                    model : semesterModel,
                    attributes : ["semester"],
                    where : {
                        status : "aktif"
                    }
                }, 
                {
                    model : kategoriNilaiModel,
                    attributes : ["code_kategori_nilai","nilai_huruf","kategori","keterangan"],
                }
            ],
            where: {
                code_kategori_nilai : i,
                nim: nim,
                status: "aktif"
            }
        }).then(result => {
            res.status(200).json({
                message: "data mata kuliah mahasiswa tidak lolos",
                data: result,
            })
        }).catch(err => {
            next(err)
        })
    },

    totalSksDanProdi: async (req, res, next) => {
        const nim = req.params.nim
        const dataProdiMahasiswa = await historyMahasiswa.findOne({
            include: [{
                model: prodiModel
            }],
            where: {
                nim: nim,
                status: "aktif"
            }
        })
        if (!dataProdiMahasiswa) return res.status(404).json({ message: "data mahsiswa tidak ditemukan" })
        const dataKrsMahasiswa = await krsModel.findAll({
            where: {
                code_tahun_ajaran: dataProdiMahasiswa.code_tahun_ajaran,
                code_semester: dataProdiMahasiswa.code_semester,
                nim: nim,
                status_krs: "setuju",
                status: "aktif"
            }
        })
        if (!dataKrsMahasiswa) return res.status(404).json({ message: "data tidak ditemukan" })
        const dataCodeMataKuliah = dataKrsMahasiswa.map(i => { return i.code_mata_kuliah })
        await sebaranMataKuliah.sum('sks', {
            include: [{
                model: mataKuliahModel
            }],
            where: {
                code_mata_kuliah: dataCodeMataKuliah,
                status: "aktif",
                status_makul: "paket",
                status_bobot_makul: "wajib"
            }
        }).then(result => {
            res.status(201).json({
                message: "data total sks dan prodi successfuly",
                data: {
                    totalSks: result,
                    prodi: dataProdiMahasiswa.prodis[0].nama_prodi
                }
            })
        }).catch(err => {
            next(err)
        })
    }
}