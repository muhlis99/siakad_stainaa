const express = require('express')
const router = express.Router()
const equipmentDsnMhController = require('../controllers/equipmentDsnMhsController.js')

// alat transportasi
router.get('/alatTransportasi/all', equipmentDsnMhController.alatTransportasiAll)
router.get('/alatTransportasi/getById/:id', equipmentDsnMhController.alatTransportasiGetById)
router.get('/alatTransportasi/getByCode/:code', equipmentDsnMhController.alatTransportasiGetByCode)
// agama
router.get('/agama/all', equipmentDsnMhController.agamaAll)
router.get('/agama/getById/:id', equipmentDsnMhController.agamaGetById)
// jalurPendaftaran
router.get('/jalurPendaftaran/all', equipmentDsnMhController.jalurPendaftaranAll)
router.get('/jalurPendaftaran/getById/:id', equipmentDsnMhController.jalurPendaftaranGetById)
router.get('/jalurPendaftaran/getByCode/:code', equipmentDsnMhController.jalurPendaftaranGetByCode)
// jenisPendaftaran
router.get('/jenisPendaftaran/all', equipmentDsnMhController.jenisPendaftaranAll)
router.get('/jenisPendaftaran/getById/:id', equipmentDsnMhController.jenisPendaftaranGetById)
router.get('/jenisPendaftaran/getByCode/:code', equipmentDsnMhController.jenisPendaftaranGetByCode)
// jenisTinggal
router.get('/jenisTinggal/all', equipmentDsnMhController.jenisTinggalAll)
router.get('/jenisTinggal/getById/:id', equipmentDsnMhController.jenisTinggalGetById)
router.get('/jenisTinggal/getByCode/:code', equipmentDsnMhController.jenisTinggalGetByCode)
// pekerjaan
router.get('/pekerjaan/all', equipmentDsnMhController.pekerjaanAll)
router.get('/pekerjaan/getById/:id', equipmentDsnMhController.pekerjaanGetById)
router.get('/pekerjaan/getByCode/:code', equipmentDsnMhController.pekerjaanGetByCode)
// pendidikan
router.get('/pendidikan/all', equipmentDsnMhController.pendidikanAll)
router.get('/pendidikan/getById/:id', equipmentDsnMhController.pendidikanGetById)
router.get('/pendidikan/getByCode/:code', equipmentDsnMhController.pendidikanGetByCode)
// penghasilan
router.get('/penghasilan/all', equipmentDsnMhController.penghasilanAll)
router.get('/penghasilan/getById/:id', equipmentDsnMhController.penghasilanGetById)
router.get('/penghasilan/getByCode/:code', equipmentDsnMhController.penghasilanGetByCode)
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