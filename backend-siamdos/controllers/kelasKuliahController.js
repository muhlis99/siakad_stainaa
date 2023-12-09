const kelasModel = require('../models/kelasKuliahModel.js')
const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const fakultasModel = require('../models/fakultasModel.js')
const prodiModel = require('../models/prodiModel.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const historyMahasiswaModel = require('../models/historyMahasiswaModel.js')
const semesterModel = require('../models/semesterModel.js')
const krsModel = require('../models/krsModel.js')
const kelasKuliahModel = require('../models/kelasKuliahModel.js')
const kelasDetailKuliahModel = require('../models/kelasDetailKuliahModel.js')
const tahunAjaranModel = require('../models/tahunAjaranModel.js')
const mahasiswaModel = require('../models/mahasiswaModel.js')
const sebaranMatakuliahModel = require('../models/sebaranMataKuliah.js')

const { Op, QueryTypes, Sequelize, literal, cast } = require('sequelize')


module.exports = {
    getKelasByMakul: async (req, res, next) => {
        const { codeThnAjr, codeSmt, jnjPen, codeFks, codePrd, codeMakul } = req.params
        await kelasModel.findAll({
            include: [
                {
                    attributes: ['code_jenjang_pendidikan'],
                    model: jenjangPendidikanModel,
                    where: { status: "aktif" }
                }, {
                    attributes: ['code_fakultas'],
                    model: fakultasModel,
                    where: { status: "aktif" }
                }, {
                    attributes: ['code_prodi'],
                    model: prodiModel,
                    where: { status: "aktif" }
                }, {
                    attributes: ['code_mata_kuliah', 'nama_mata_kuliah'],
                    model: mataKuliahModel,
                    where: { status: "aktif" }
                }, {
                    attributes: ['code_tahun_ajaran'],
                    model: tahunAjaranModel,
                    where: { status: "aktif" }
                }, {
                    attributes: ['code_semester'],
                    model: semesterModel,
                    where: { status: "aktif" }
                }],
            attributes: [
                'id_kelas', 'kapasitas', 'nama_kelas', 'code_mata_kuliah', ['code_kelas', 'code'],
                [Sequelize.literal('(select count(*) from tb_kelas_detail where code_kelas = code)'), 'jumlahMhs']
            ],
            where: {
                code_tahun_ajaran: codeThnAjr,
                code_semester: codeSmt,
                code_jenjang_pendidikan: jnjPen,
                code_fakultas: codeFks,
                code_prodi: codePrd,
                code_mata_kuliah: codeMakul,
                status: "aktif"
            }
        }).
            then(getByMakul => {
                if (!getByMakul) {
                    return res.status(404).json({
                        message: "Data kelas kuliah Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data kelas kuliah Ditemukan",
                    data: getByMakul
                })
            }).
            catch(err => {
                console.log(err);
            })
    },

    getKelasById: async (req, res, next) => {
        const id = req.params.id
        await kelasKuliahModel.findOne({
            include: [{
                model: jenjangPendidikanModel,
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                where: { status: "aktif" }
            }, {
                model: mataKuliahModel,
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                where: { status: "aktif" }
            }, {
                model: semesterModel,
                where: { status: "aktif" }
            }],
            where: {
                id_kelas: id,
                status: "aktif"
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data kelas kuliah Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data kelas kuliah Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getMhsByKelas: async (req, res, next) => {
        const { codeKls } = req.params
        await kelasDetailKuliahModel.findAll({
            include: [
                {
                    model: kelasModel,
                    include: [
                        {
                            model: jenjangPendidikanModel,
                            where: { status: "aktif" }
                        }, {
                            model: fakultasModel,
                            where: { status: "aktif" }
                        }, {
                            model: prodiModel,
                            where: { status: "aktif" }
                        }],
                    where: { status: "aktif" }
                }, {
                    attributes: ["nim", "nama", "jenis_kelamin"],
                    model: mahasiswaModel,
                    where: { status: "aktif" },

                }
            ],
            where: {
                code_kelas: codeKls,
                status: "aktif",
            },
            order: [
                ["nim", "ASC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All mahasiswa by kelas Success",
                    data: result,
                })
            }).
            catch(err => {
                console.log(err)
            })
    }
}