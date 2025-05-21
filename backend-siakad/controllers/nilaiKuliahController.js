const { Op, QueryTypes } = require('sequelize')
const sequelize = require('../config/database.js')
const kelasModel = require('../models/kelasKuliahModel.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const mahasiswaModel = require('../models/mahasiswaModel.js')
const kategoriNilaiModel = require('../models/kategoriNilaiModel.js')
const nilaiKuliahModel = require('../models/nilaiKuliahModel.js')
const kelasDetailKuliahModel = require('../models/kelasDetailKuliahModel.js')
const tahunAjaranModel = require('../models/tahunAjaranModel.js')
const semesterModel = require('../models/semesterModel.js')
const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const fakultasModel = require('../models/fakultasModel.js')
const prodiModel = require('../models/prodiModel.js')
const historyMahasiswa = require('../models/historyMahasiswaModel.js')
const settingJadwalNilaiModel = require('../models/settingJadwalNilai.js')
const virtualKategoriNilai = require('../models/virtualKategoriNilai.js')



module.exports = {
    get: async (req, res, next) => {
        const { codeMakul, codeKls, codeThnAjr } = req.query
        await nilaiKuliahModel.findAll({
            include: [
                {
                    model: kategoriNilaiModel,
                    where: {
                        code_tahun_ajaran: codeThnAjr,
                        status: "aktif"
                    }
                },
                {
                    attributes: ['nim', 'nama'],
                    model: mahasiswaModel,
                    where: { status: "aktif" }
                }, {
                    attributes: ['nim', 'pembayaran'],
                    model : historyMahasiswa,
                    where : {
                        code_tahun_ajaran: codeThnAjr,
                        pembayaran : "lunas"
                    }
                }
            ],
            where: {
                code_mata_kuliah: codeMakul,
                code_kelas: codeKls,
                status: "aktif"
            },
            order: [
                ["nim", "ASC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All nilai kuliah Success",
                    data: result,
                })
            }).
            catch(err => {    
                next(err)
            })
    },

    getById: async (req, res, next) => {
        const id = req.params.id
        const codeThnAjr = req.params.codeThnAjr
        await nilaiKuliahModel.findOne({
            include: [
                {
                    model: kategoriNilaiModel,
                    where: {
                        code_tahun_ajaran: codeThnAjr,
                        status: "aktif"
                    }
                },
                {
                    attributes: ['nim', 'nama'],
                    model: mahasiswaModel,
                    where: { status: "aktif" }
                }, 
                {
                    attributes: ['nim', 'pembayaran'],
                    model : historyMahasiswa,
                    where : {
                        code_tahun_ajaran: codeThnAjr,
                        pembayaran : "lunas"
                    }
                }
            ],
            where: {
                id_nilai_kuliah: id,
            }
        }).
            then(result => {
                res.status(200).json({
                    message: "Get by id nilai kuliah Success",
                    data: result,
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getMhsByKelas: async (req, res, next) => {
        const { codeKls } = req.params
        await kelasDetailKuliahModel.findAll({
            include: [{
                model: kelasModel,
                where: { status: "aktif" }
            }],
            where: {
                code_kelas: codeKls,
                status: "aktif"
            }
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All mahasiswa by kelas Success",
                    data: result,
                })
            }).
            catch(err => {
                next(err)
            })
    },

    deteksiIndexNilai: async (req, res, next) => {
        const { nilaiAkhir, codeThnAjr } = req.params
        console.log(codeThnAjr);
        const nilai = Math.floor(nilaiAkhir)
        const i = await sequelize.query(`SELECT * FROM tb_kategori_nilai WHERE IF(${nilai} >= nilai_bawah AND ${nilai} <= nilai_atas, 1,0) AND code_tahun_ajaran = "${codeThnAjr} "AND status = "aktif";`
            , {
                nest: true,
                type: QueryTypes.SELECT
            })
        res.json({
            data: i
        })
    },

    post: async (req, res, next) => {
        const data = req.body
        function randomAngka(params) {
            let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let charLength = chars.length;
            let result = ''
            for (let i = 0; i < params; i++) {
                result += chars.charAt(Math.floor(Math.random() * charLength))
            }
            return result
        }
        const dataNilai = data.map(el => {
            let randomNumber = randomAngka(5) + Math.floor(100000000000 + Math.random() * 900000000000)
            let element = {
                code_nilai_kuliah: randomNumber,
                code_kelas: el.code_kelas,
                code_mata_kuliah: el.code_mata_kuliah,
                code_kategori_nilai: el.code_kategori_nilai,
                code_tahun_ajaran: el.code_tahun_ajaran,
                code_semester: el.code_semester,
                code_jenjang_pendidikan: el.code_jenjang_pendidikan,
                code_fakultas: el.code_fakultas,
                code_prodi: el.code_prodi,
                nim: el.nim,
                nilai_presentasi: el.nilai_presentasi,
                nilai_penguasaan_materi: el.nilai_penguasaan_materi,
                nilai_slide_power_point: el.nilai_slide_power_point,
                nilai_keaktifan: el.nilai_keaktifan,
                nilai_hadir: el.nilai_hadir,
                nilai_tugas: el.nilai_tugas,
                nilai_uts: el.nilai_uts,
                nilai_uas: el.nilai_uas,
                nilai_jumlah: el.nilai_jumlah,
                nilai_akhir: el.nilai_akhir,
                status: "aktif"
            }
            return element
        })

        await nilaiKuliahModel.bulkCreate(dataNilai).
            then(result => {
                res.status(200).json({
                    message: "Data nilai kuliah success ditambahkan",
                })
            }).
            catch(err => {
                next(err)
            })
    },

    put: async (req, res, next) => {
        const id = req.params.id
        const { code_kategori_nilai, nilai_presentasi, nilai_penguasaan_materi,
            nilai_slide_power_point, nilai_keaktifan, nilai_hadir, nilai_tugas,
            nilai_uts, nilai_uas, nilai_jumlah, nilai_akhir } = req.body

        const nilaiUse = await nilaiKuliahModel.findOne({
            where: {
                id_nilai_kuliah: id,
                status: "aktif"
            }
        })
        if (!nilaiUse) return res.status(404).json({ message: "Data nilai Tidak Ditemukan" })

        await nilaiKuliahModel.update({
            code_kategori_nilai: code_kategori_nilai,
            nilai_presentasi: nilai_presentasi,
            nilai_penguasaan_materi: nilai_penguasaan_materi,
            nilai_slide_power_point: nilai_slide_power_point,
            nilai_keaktifan: nilai_keaktifan,
            nilai_hadir: nilai_hadir,
            nilai_tugas: nilai_tugas,
            nilai_uts: nilai_uts,
            nilai_uas: nilai_uas,
            nilai_jumlah: nilai_jumlah,
            nilai_akhir: nilai_akhir
        }, {
            where: {
                id_nilai_kuliah: id
            }
        }).then(result => {
            res.status(200).json({
                message: "Data nilai kuliah success diupdate",
            })
        }).
            catch(err => {
                next(err)
            })
    },

    //  jadwal penilaian
    getJadwalPenilaian : async (req, res, next) => {
        await settingJadwalNilaiModel.findAll({
            include: [
                {
                    attributes: ['tahun_ajaran'],
                    model: tahunAjaranModel,
                }, {
                    attributes: ['semester'],
                    model : semesterModel,
                }
            ],
            order: [
                ["id_setting", "ASC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All setting jadwal nilai kuliah Success",
                    data: result,
                })
            }).
            catch(err => {    
                next(err)
            })
    },

    postJadwalPenilaian : async (req, res, next) => {
        const {code_tahun_ajaran, code_semester, tanggal_mulai, tanggal_akhir} = req.body
        await settingJadwalNilaiModel.create({
            code_tahun_ajaran: code_tahun_ajaran,
            code_semester: code_semester,
            tanggal_mulai: tanggal_mulai,
            tanggal_akhir: tanggal_akhir,
        }).
        then(async result => {
                const data = await kategoriNilaiModel.findAll({
                where : {
                    code_tahun_ajaran : code_tahun_ajaran
                }
                }) 
                const dataVirtual = data.map(async i => {
                    await virtualKategoriNilai.bulkCreate([{
                        id_setting : result.id_setting,
                        code_kategori_nilai : i.code_kategori_nilai,
                        nilai_atas : i.nilai_atas,
                        nilai_bawah : i.nilai_bawah,
                        nilai_huruf : i.nilai_huruf,
                        keterangan : i.keterangan
                    }])
                })
                
                res.status(201).json({
                    message: "Data jadwal penilaian success Ditambahkan",
                })
        }).
        catch(err => {
            next(err)
        })
    },

    deleteJadwalPenilaian : async (req, res, next) => {

        const i = await settingJadwalNilaiModel.findAll()
        const o = i.map(o => {return o.tanggal_akhir})
        const idS = i.map(id => {return id.id_setting})
        const tgl_akhir = new Date(o).toLocaleDateString('en-CA')
        const tgl_now = new Date().toLocaleDateString('en-CA')

        if (tgl_now === tgl_akhir) {
            await settingJadwalNilaiModel.destroy({
                where : {
                    tanggal_akhir : tgl_akhir
                }
            })
            await virtualKategoriNilai.destroy({
                where : {
                    id_setting : idS
                }
            })
            .then(result => {
                res.status(201).json({
                    message: "Data jadwal penilaian berhasil DIHAPUS",
                })
            }).
            catch(err => {
                next(err)
            })
        } else {
            res.status(201).json({
                message: "Data jadwal penilaian tidak berjalan atau tanggal belum sampai masa expayed",
            })
        }
    }

}