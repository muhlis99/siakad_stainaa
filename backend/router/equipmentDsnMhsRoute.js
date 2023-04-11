const express = require('express')
const router = express.Router()
const equipmentDsnMhController = require('../controllers/equipmentDsnMhsController.js')

// alat transportasi
router.get('/alatTransportasi/all', equipmentDsnMhController.alatTransportasiAll)
router.get('/alatTransportasi/getById/:id', equipmentDsnMhController.alatTransportasiGetById)
// agama
router.get('/agama/all', equipmentDsnMhController.agamaAll)
router.get('/agama/getById/:id', equipmentDsnMhController.agamaGetById)
// jalurPendaftaran
router.get('/jalurPendaftaran/all', equipmentDsnMhController.jalurPendaftaranAll)
router.get('/jalurPendaftaran/getById/:id', equipmentDsnMhController.jalurPendaftaranGetById)
// jenisPendaftaran
router.get('/jenisPendaftaran/all', equipmentDsnMhController.jenisPendaftaranAll)
router.get('/jenisPendaftaran/getById/:id', equipmentDsnMhController.jenisPendaftaranGetById)
// jenisTinggal
router.get('/jenisTinggal/all', equipmentDsnMhController.jenisTinggalAll)
router.get('/jenisTinggal/getById/:id', equipmentDsnMhController.jenisTinggalGetById)
// pekerjaan
router.get('/pekerjaan/all', equipmentDsnMhController.pekerjaanAll)
router.get('/pekerjaan/getById/:id', equipmentDsnMhController.pekerjaanGetById)
// pendidikan
router.get('/pendidikan/all', equipmentDsnMhController.pendidikanAll)
router.get('/pendidikan/getById/:id', equipmentDsnMhController.pendidikanGetById)
// penghasilan
router.get('/penghasilan/all', equipmentDsnMhController.penghasilanAll)
router.get('/penghasilan/getById/:id', equipmentDsnMhController.penghasilanGetById)
// negara
router.get('/negara/all', equipmentDsnMhController.negaraAll)
router.get('/negara/getByCode/:code', equipmentDsnMhController.negaraGetByCode)
// provinsi
router.get('/provinsi/all', equipmentDsnMhController.provinsiAll)
router.get('/provinsi/getByCode/:code', equipmentDsnMhController.provinsiGetByCode)
router.get('/provinsi/getByCodeNegara/:code', equipmentDsnMhController.provinsiGetByCodeNegara)
// kabupaten
router.get('/kabupaten/all', equipmentDsnMhController.kabupatenAll)
router.get('/kabupaten/getByCode/:code', equipmentDsnMhController.kabupatenGetByCode)
router.get('/kabupaten/getByCodeProvinsi/:code', equipmentDsnMhController.kabupatenGetByCodeProvinsi)
// kecamatan
router.get('/kecamatan/all', equipmentDsnMhController.kecamatanAll)
router.get('/kecamatan/getByCode/:code', equipmentDsnMhController.kecamatanGetByCode)
router.get('/kecamatan/getByCodeKabupaten/:code', equipmentDsnMhController.kecamatanGetByCodeKabupaten)
// desa
router.get('/desa/all', equipmentDsnMhController.desaAll)
router.get('/desa/getByCode/:code', equipmentDsnMhController.desaGetByCode)
router.get('/desa/getByCodeKecamatan/:code', equipmentDsnMhController.desaGetByCodeKecamatan)

module.exports = router