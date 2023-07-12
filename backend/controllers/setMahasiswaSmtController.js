const mahasiswa = require('../models/mahasiswaModel.js')
const historyMahasiswa = require('../models/historyMahasiswaModel.js')
const fakultasModel = require('../models/fakultasModel.js')
const semesterModel = require('../models/semesterModel.js')
const jenjangPendidikanModel = require('../models/jenjangPendidikanModel.js')
const prodiModel = require('../models/prodiModel.js')
const tahunAjaranModel = require('../models/tahunAjaranModel.js')


module.exports = {
    getAll: async (req, res, next) => {
        const { codeThnAjr, codeSmt, codeJnjPen, codeFks, codePrd } = req.params

        await historyMahasiswa.findAll({
            include: [{
                model: mahasiswa,
                attributes: ["nim", "nama"],
                where: { status: "aktif" }
            }, {
                model: tahunAjaranModel,
                attributes: ["code_tahun_ajaran", "tahun_ajaran"],
                where: { status: "aktif" }
            }, {
                model: semesterModel,
                attributes: ["code_semester", "semester"],
                where: { status: "aktif" }
            }, {
                model: jenjangPendidikanModel,
                attributes: ["code_jenjang_pendidikan", "nama_jenjang_pendidikan"],
                where: { status: "aktif" }
            }, {
                model: fakultasModel,
                attributes: ["code_fakultas", "nama_fakultas"],
                where: { status: "aktif" }
            }, {
                model: prodiModel,
                attributes: ["code_prodi", "nama_prodi"],
                where: { status: "aktif" }
            }],
            where: {
                code_tahun_ajaran: codeThnAjr,
                code_semester: codeSmt,
                code_jenjang_pendidikan: codeJnjPen,
                code_fakultas: codeFks,
                code_prodi: codePrd,
                status: "aktif"
            }
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All  Mahasiswa semester Success",
                    data: result,
                })
            }).
            catch(err => {
                next(err)
            })
    },

    smtByThnAjr: async (req, res, next) => {
        const thnAjr = req.params.thnAjr
        await semesterModel.findAll({
            include: [
                {
                    model: tahunAjaranModel,
                    where: { status: "aktif" }
                }
            ],
            where: {
                code_tahun_ajaran: thnAjr,
                status: "aktif"
            },
            order: [
                ["id_semester", "DESC"]
            ]
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data semester Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data semester Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    post: async (req, res, next) => {
        const { codeSmtOld, codeThnAjrOld, codeJnjPen,
            codeFks, codePrd, codeSmtNew, codeThnAjrNew } = req.body

        const dataMhsSMtOld = await historyMahasiswa.findAll({
            include: [{
                model: mahasiswa,
                attributes: ["nim", "nama"],
                where: { status: "aktif" }
            }],
            where: {
                code_tahun_ajaran: codeThnAjrOld,
                code_semester: codeSmtOld,
                code_jenjang_pendidikan: codeJnjPen,
                code_fakultas: codeFks,
                code_prodi: codePrd,
                status: "aktif"
            }
        })


        const dataMhsSMtNew = dataMhsSMtOld.map(el => {
            return {
                nim: el.nim,
                code_tahun_ajaran: codeThnAjrNew,
                code_semester: codeSmtNew,
                code_jenjang_pendidikan: codeJnjPen,
                code_fakultas: codeFks,
                code_prodi: codePrd,
                status: "aktif"
            }
        })

        const dataUpdateMhsSMtOld = dataMhsSMtOld.map(el => {
            return {
                id_history: el.id_history,
                status: "tidak"
            }
        })

        if (dataMhsSMtNew.length === 0) return res.status(401).json({ message: "data mahasiswa semester tidak ditemukan" })

        // const validasiDataNew = dataMhsSMtNew.map(i => {
        //     historyMahasiswa.findOne({
        //         where: {
        //             nim: i.nim,
        //             code_semester: i.code_semester,
        //             code_jenjang_pendidikan: i.code_jenjang_pendidikan,
        //             code_fakultas: i.code_fakultas,
        //             code_prodi: i.code_prodi,
        //             status: "aktif"
        //         }
        //     })
        // })
        // if (!validasiDataNew) return res.status(401).json({ message: "data mahasiswa semester sudah ada" })

        const updateData = await historyMahasiswa.bulkCreate(dataUpdateMhsSMtOld, {
            updateOnDuplicate: ["status"],
        })

        const createData = await historyMahasiswa.bulkCreate(dataMhsSMtNew)
        if (createData) {
            res.status(201).json({
                message: "data berhasil di tambahkan"
            })
        }
    }
}