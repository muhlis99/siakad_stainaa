const krsModel = require('../models/krsModel.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const tahunAjaranModel = require('../models/tahunAjaranModel.js')
const semesterModel = require('../models/semesterModel.js')
const historyMahasiswa = require('../models/historyMahasiswaModel.js')
const { Op } = require('sequelize')

module.exports = {
    getAll: async (req, res, next) => {
        const tahunAjaran = parseInt(req.query.tahunAjaran) || 0
        const prodi = parseInt(req.query.prodi) || 0
        // tahun ajaran => kurikulum 
        const thnAjar = await tahunAjaranModel.findOne({
            attributes: ['tahun_ajaran'],
            where: {
                code_tahun_ajaran: tahunAjaran
            }
        })
        // mengambil data dari tb mata kuliah
        // untuk jumlah mata kuliah paket dan semesternya 
        const paketmakul = await mataKuliahModel.findAndCountAll({
            where: {
                code_tahun_ajaran: tahunAjaran,
                code_prodi: prodi,
                status_makul: "paket"
            },
            group: ['code_semester'],
            attributes: ['code_semester',],
            include: [{ model: semesterModel, attributes: ['semester'] }]
        })
        var i = paketmakul.rows
        const Jmlmakul = i.map(jhr => { return jhr.code_semester })
        // jumlah mahasiswa yang memakate mata kuliah
        const jmlMahasiswa = await historyMahasiswa.findAndCountAll({
            where: {
                code_semester: Jmlmakul,
                code_tahun_ajaran: tahunAjaran,
                code_prodi: prodi
            },
            attributes: ['nim']
        })
        // validasi jumlah mahasiswa yang memaket mata kuliah
        var t = jmlMahasiswa.rows
        const validasimakul = t.map(v => { return v.nim })
        const jmlPaketMahasiswa = await krsModel.findAndCountAll({
            where: {
                nim: validasimakul
            },
            group: ['nim'],
        })

        var jumlah = ""
        var keterangan = ""
        if (jmlPaketMahasiswa.count == 0 || jmlPaketMahasiswa.count == null) {
            jumlah = 0
            keterangan = "paket belum"
        } else {
            jumlah = jmlPaketMahasiswa.count
            keterangan = "paket selesai"
        }
        // isi field keterangan 
        res.status(201).json({
            data: [{
                tahun: thnAjar.tahun_ajaran,
                Paketmakul: paketmakul.count,
                semester: paketmakul.rows,
                jumlahMahasiswaPaket: jumlah,
                jumlahTotalMahasiswa: jmlMahasiswa.count,
                keterangan: keterangan,
            }]
        })
    },

    viewAll: async (req, res, next) => {
        const thnAjr = req.params.thnAjr
        const prd = req.params.prd
        const smt = req.params.smt

        await mataKuliahModel.findAndCountAll({
            where: {
                code_tahun_ajaran: thnAjr,
                code_prodi: prd,
                code_semester: smt
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
        const prd = req.params.prd
        const smt = req.params.smt

        // mengambil code mata kuliah yang paket sesuai semester
        const makul = await mataKuliahModel.findAll({
            attributes: ['code_mata_kuliah'],
            where: {
                code_tahun_ajaran: thnAjr,
                code_prodi: prd,
                code_semester: smt
            }
        })
        // mengambil nim mahasiswa yang krs paket sesuai semester 
        const Dtnim = await historyMahasiswa.findAll({
            attributes: ['nim'],
            where: {
                code_tahun_ajaran: thnAjr,
                code_prodi: prd,
                code_semester: smt
            }
        })
        const data_body = makul.map(Dn => {
            let data2 = Dn.code_mata_kuliah
            const datas = Dtnim.map(DM => {
                let randomNumber = Math.floor(10000000 + Math.random() * 90000000)
                return {
                    code_krs: randomNumber,
                    code_mata_kuliah: data2,
                    nim: DM.nim,
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

}