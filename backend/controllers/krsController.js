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
        const Pmakul = await mataKuliahModel.findAndCountAll({
            where: {
                code_tahun_ajaran: tahunAjaran,
                code_prodi: prodi,
                status_makul: "paket"
            },
            group: ['code_semester'],
            attributes: ['code_semester',],
            include: [{ model: semesterModel, attributes: ['semester'] }]
        })
        var i = Pmakul.rows
        const Jmakul = i.map(jhr => { return jhr.code_semester })
        // jumlah mahasiswa yang memakate mata kuliah
        const jmlMahasiswa = await historyMahasiswa.findAndCountAll({
            where: { code_semester: Jmakul, code_tahun_ajaran: tahunAjaran, code_prodi: prodi },
            attributes: ['nim']
        })
        // validasi jumlah mahasiswa yang memaket mata kuliah
        var i = jmlMahasiswa.rows
        const vmakul = i.map(v => { return v.nim })
        const jmlPaketMahasiswa = krsModel.findAndCountAll({
            where: {
                nim: vmakul
            }
        })
        var jumlah = ""
        if ((await jmlPaketMahasiswa).count === 0) {
            jumlah = 0
        } else {
            jumlah = (await jmlPaketMahasiswa).count
        }
        // isi field keterangan 
        var Pkelas = '0'
        var keterangan = ""
        if (Pkelas === Pmakul.count) {
            keterangan = "paket kurang"
        } else if (jumlah === (await jmlPaketMahasiswa).count) {
            keterangan = "paket selesai"
        } else if (jumlah != (await jmlPaketMahasiswa).count) {
            keterangan = "paket kurang"
        } else {
            keterangan = "kelas kurang"
        }
        //  mengambil seluruh code mata kuliah paket sesuai semester
        const Mmakul = await mataKuliahModel.findAll({
            where: {
                code_tahun_ajaran: tahunAjaran,
                code_prodi: prodi,
                status_makul: "paket",
                code_semester: Jmakul
            },
            attributes: ['code_semester', 'code_mata_kuliah'],
        })
        res.status(201).json({
            data: [{
                tahun: thnAjar.tahun_ajaran,
                Paketmakul: Pmakul.count,
                Paketkelas: "dalam tahap davelope",
                semester: Pmakul.rows,
                jmlPaketMahasiswa: jmlMahasiswa.count,
                jmlValidasiMahasiswa: jumlah,
                keterangan: keterangan,
                code_makul: Mmakul,
                nim: i
            }]
        })
    },


}