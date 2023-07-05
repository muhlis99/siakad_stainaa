const mahasiswa = require('../models/mahasiswaModel.js')
const historyMahasiswa = require('../models/historyMahasiswaModel.js')

module.exports = {
    getAll: async (req, res, next) => {
        const { codeSmt, codeJnjPen, codeFks, codePrd } = req.params
        // const { codeSmt, codeJnjPen, codeFks, codePrd } = req.params

        await historyMahasiswa.findAll({
            include: [{
                model: mahasiswa,
                attributes: ["nim", "nama"],
                where: { status: "aktif" }
            }],
            where: {
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

    post: async (req, res, next) => {
        const { codeSmtOld, codeJnjPen, codeFks, codePrd, codeSmtNew } = req.body


        const dataMhsSMtOld = await historyMahasiswa.findAll({
            include: [{
                model: mahasiswa,
                attributes: ["nim", "nama"],
                where: { status: "aktif" }
            }],
            where: {
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
        //     return i.nim
        // })
        // console.log(validasiDataNew);
        // if (validasiDataNew) return res.status(401).json({ message: "data mahasiswa semester sudah ada" })

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