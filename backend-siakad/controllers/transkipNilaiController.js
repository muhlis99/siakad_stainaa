const sebaranMakulModel = require('../models/sebaranMataKuliah.js')
const mataKuliahModel = require('../models/mataKuliahModel.js')
const nilaiKuliahModel = require('../models/nilaiKuliahModel.js')
const mahasiswaModel = require('../models/mahasiswaModel.js')
const historyMahasiswa = require('../models/historyMahasiswaModel.js')
const prodiModel = require('../models/prodiModel.js')
const krsModel = require('../models/krsModel.js')
const transkiNilaiModel = require('../models/transkipNilaiModel.js')
const { Op } = require('sequelize')
const semesterModel = require('../models/semesterModel.js')

module.exports = {
    getMahasiswa: async (req, res, next) => {
        const {thn,smt,jnj,fks,prd} = req.params
        await historyMahasiswa.findAll({
            include : [{
                model : mahasiswaModel,
                where : {
                    status : "aktif"
                }
            }],
            where : {
                code_jenjang_pendidikan : jnj,
                code_fakultas : fks,
                code_prodi : prd,
                code_tahun_ajaran : thn,
                code_semester : smt,
                // status : "aktif" => ketika dihosting diaktifkan
            }
        }).then(result => {
            res.status(201).json({
                message: "Data mahasiswa",
                data: result
            })
        }).
        catch(err => {
            console.log(err)
        })
    },

    getTranskipNilai: async (req, res, next) => {
        const {nim} = req.params
        const identitasMahasiswa = await mahasiswaModel.findOne({
            include : [{
                model : prodiModel,
                attributes : ["code_prodi", "nama_prodi"],
                where : {
                    status : "aktif"
                }
            }],
            attributes : ["id_mahasiswa","nim","nama","tempat_lahir","tanggal_lahir"],
            where : {
                status : "aktif" 
            }
        })

        const totalSKS = await transkiNilaiModel.sum('sks',{
            where : {
                nim : nim
            }
        })


        const semester1 = await transkiNilaiModel.findAll({
            attributes : ["code_transkip_nilai", "code_mata_kuliah","nama_mata_kuliah","sks","nilai_huruf","nilai_angka"],
            where : {
                nim : nim,
                semester : 1
            }
        }).then(async result => {
            const jumlahSKS = await transkiNilaiModel.sum('sks',{
                where : {
                    nim : nim,
                    semester : 1
                }
            }) 
            const totalNilaiMakul = await transkiNilaiModel.sum('nilai_angka',{
                where : {
                    nim : nim,
                    semester : 1
                }
            })
            const jumlahMakul = await transkiNilaiModel.count({
                where : {
                    nim : nim,
                    semester : 1
                }
            })
            const IPS = totalNilaiMakul/jumlahMakul
            return {
                semester : 1,
                jumlahSKS: jumlahSKS,
                ips : IPS,  
                nilaiKeseluruhan : result,
            }
        })

        const semester2 = await transkiNilaiModel.findAll({
            attributes : ["code_transkip_nilai", "code_mata_kuliah","nama_mata_kuliah","sks","nilai_huruf","nilai_angka"],
            where : {
                nim : nim,
                semester : 2
            }
        }).then(async result => {
            const jumlahSKS = await transkiNilaiModel.sum('sks',{
                where : {
                    nim : nim,
                    semester : 2
                }
            }) 
            const totalNilaiMakul = await transkiNilaiModel.sum('nilai_angka',{
                where : {
                    nim : nim,
                    semester : 2
                }
            })
            const jumlahMakul = await transkiNilaiModel.count({
                where : {
                    nim : nim,
                    semester : 2
                }
            })
            const IPS = totalNilaiMakul/jumlahMakul
            return {
                semester : 2,
                jumlahSKS: jumlahSKS,
                ips : IPS,  
                nilaiKeseluruhan : result,
            }
        })

        const semester3 = await transkiNilaiModel.findAll({
            attributes : ["code_transkip_nilai", "code_mata_kuliah","nama_mata_kuliah","sks","nilai_huruf","nilai_angka"],
            where : {
                nim : nim,
                semester : 3
            }
        }).then(async result => {
            const jumlahSKS = await transkiNilaiModel.sum('sks',{
                where : {
                    nim : nim,
                    semester : 3
                }
            }) 
            const totalNilaiMakul = await transkiNilaiModel.sum('nilai_angka',{
                where : {
                    nim : nim,
                    semester : 3
                }
            })
            const jumlahMakul = await transkiNilaiModel.count({
                where : {
                    nim : nim,
                    semester : 3
                }
            })
            const IPS = totalNilaiMakul/jumlahMakul
            return {
                semester : 3,
                jumlahSKS: jumlahSKS,
                ips : IPS,  
                nilaiKeseluruhan : result,
            }
        })

                const semester4 = await transkiNilaiModel.findAll({
            attributes : ["code_transkip_nilai", "code_mata_kuliah","nama_mata_kuliah","sks","nilai_huruf","nilai_angka"],
            where : {
                nim : nim,
                semester : 4
            }
        }).then(async result => {
            const jumlahSKS = await transkiNilaiModel.sum('sks',{
                where : {
                    nim : nim,
                    semester : 4
                }
            }) 
            const totalNilaiMakul = await transkiNilaiModel.sum('nilai_angka',{
                where : {
                    nim : nim,
                    semester : 4
                }
            })
            const jumlahMakul = await transkiNilaiModel.count({
                where : {
                    nim : nim,
                    semester : 4
                }
            })
            const IPS = totalNilaiMakul/jumlahMakul
            return {
                semester : 4,
                jumlahSKS: jumlahSKS,
                ips : IPS,  
                nilaiKeseluruhan : result,
            }
        })

        const semester5 = await transkiNilaiModel.findAll({
            attributes : ["code_transkip_nilai", "code_mata_kuliah","nama_mata_kuliah","sks","nilai_huruf","nilai_angka"],
            where : {
                nim : nim,
                semester : 5
            }
        }).then(async result => {
            const jumlahSKS = await transkiNilaiModel.sum('sks',{
                where : {
                    nim : nim,
                    semester : 5
                }
            }) 
            const totalNilaiMakul = await transkiNilaiModel.sum('nilai_angka',{
                where : {
                    nim : nim,
                    semester : 5
                }
            })
            const jumlahMakul = await transkiNilaiModel.count({
                where : {
                    nim : nim,
                    semester : 5
                }
            })
            const IPS = totalNilaiMakul/jumlahMakul
            return {
                semester : 5,
                jumlahSKS: jumlahSKS,
                ips : IPS,  
                nilaiKeseluruhan : result,
            }
        })

        const semester6 = await transkiNilaiModel.findAll({
            attributes : ["code_transkip_nilai", "code_mata_kuliah","nama_mata_kuliah","sks","nilai_huruf","nilai_angka"],
            where : {
                nim : nim,
                semester : 6
            }
        }).then(async result => {
            const jumlahSKS = await transkiNilaiModel.sum('sks',{
                where : {
                    nim : nim,
                    semester : 6
                }
            }) 
            const totalNilaiMakul = await transkiNilaiModel.sum('nilai_angka',{
                where : {
                    nim : nim,
                    semester : 6
                }
            })
            const jumlahMakul = await transkiNilaiModel.count({
                where : {
                    nim : nim,
                    semester : 6
                }
            })
            const IPS = totalNilaiMakul/jumlahMakul
            return {
                semester : 6,
                jumlahSKS: jumlahSKS,
                ips : IPS,  
                nilaiKeseluruhan : result,
            }
        })

        const semester7 = await transkiNilaiModel.findAll({
            attributes : ["code_transkip_nilai", "code_mata_kuliah","nama_mata_kuliah","sks","nilai_huruf","nilai_angka"],
            where : {
                nim : nim,
                semester : 7
            }
        }).then(async result => {
            const jumlahSKS = await transkiNilaiModel.sum('sks',{
                where : {
                    nim : nim,
                    semester : 7
                }
            }) 
            const totalNilaiMakul = await transkiNilaiModel.sum('nilai_angka',{
                where : {
                    nim : nim,
                    semester : 7
                }
            })
            const jumlahMakul = await transkiNilaiModel.count({
                where : {
                    nim : nim,
                    semester : 7
                }
            })
            const IPS = totalNilaiMakul/jumlahMakul
            return {
                semester : 7,
                jumlahSKS: jumlahSKS,
                ips : IPS,  
                nilaiKeseluruhan : result,
            }
        })

        const semester8 = await transkiNilaiModel.findAll({
            attributes : ["code_transkip_nilai", "code_mata_kuliah","nama_mata_kuliah","sks","nilai_huruf","nilai_angka"],
            where : {
                nim : nim,
                semester : 8
            }
        }).then(async result => {
            const jumlahSKS = await transkiNilaiModel.sum('sks',{
                where : {
                    nim : nim,
                    semester : 8
                }
            }) 
            const totalNilaiMakul = await transkiNilaiModel.sum('nilai_angka',{
                where : {
                    nim : nim,
                    semester : 8
                }
            })
            const jumlahMakul = await transkiNilaiModel.count({
                where : {
                    nim : nim,
                    semester : 8
                }
            })
            const IPS = totalNilaiMakul/jumlahMakul
            return {
                semester : 8,
                jumlahSKS: jumlahSKS,
                ips : IPS,  
                nilaiKeseluruhan : result,
            }
        })
        
        const ips = parseInt(semester1.ips||0)+parseInt(semester2.ips||0)+parseInt(semester3.ips||0)+parseInt(semester4.ips||0)+parseInt(semester5.ips||0)+parseInt(semester6.ips||0)+parseInt(semester7.ips||0)+parseInt(semester8.ips||0) 
        const totalIPS = parseInt(ips)/8
        console.log(ips);
        
        res.status(200).json({
            data : {
                identitasMahasiswa : identitasMahasiswa,
                semester1 : semester1,
                semester2 : semester2,
                semester3 : semester3,
                semester4 : semester4,
                semester5 : semester5,
                semester6 : semester6,
                semester7 : semester7,
                semester8 : semester8,
                totalSKS : totalSKS,
                totalIPS : totalIPS
            }
        })
    },

    getSingkronisasi: async (req, res, next) => {
        const { nim} = req.params
        const dataTranskipOld =  await transkiNilaiModel.findAll({
            where : {
                nim : nim,
                status : "aktif"
            }
        })
        
        const bulkCodeMakul = dataTranskipOld.map(el => {
                return el.code_mata_kuliah
        })
        // const bulkSmt = dataTranskipOld.map(el => {
        //         return el.code_semester
        // })

        const dataTranskipNew = await nilaiKuliahModel.findAndCountAll({
            where : {
                nim : nim,
                code_mata_kuliah : {
                    [Op.notIn] : bulkCodeMakul
                },
                // code_semester : {
                //     [Op.notIn] : bulkSmt
                // },
                status : "aktif"
            }
        }).then(result => {
            res.status(201).json({
                message: "Data Singkronis",
                data: result
            })
        }).catch(err => {
            next(err)
        })
    },

    post: async (req, res, next) => {
        const {dataBulkInsert} = req.body
        function randomAngka(params) {
            let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let charLength = chars.length;
            let result = ''
            for (let i = 0; i < params; i++) {
                result += chars.charAt(Math.floor(Math.random() * charLength))
            }
            return result
        }
        
        const dataInsert = dataBulkInsert.map(async rs => {
            let randomNumber = randomAngka(5) + Math.floor(100000000000 + Math.random() * 900000000000)
            let data = {
                code_transkip_nilai : randomNumber,
                nim : rs.nim,
                code_mata_kuliah : rs.code_mata_kuliah,
                nama_mata_kuliah : rs.mata_kuliah,
                code_semester : rs.code_semester,
                semester : rs.semester,
                code_prodi : rs.code_prodi,
                sks : rs.sks,
                nilai_huruf : rs.nilai_huruf,
                nilai_angka : rs.nilai_angka,
                // ips : rs.ips,
                status : "aktif"
            }
            await transkiNilaiModel.bulkCreate([data])
        })
        res.status(201).json({
            message: "data insert succses ditambahkan"
        })
    },

}