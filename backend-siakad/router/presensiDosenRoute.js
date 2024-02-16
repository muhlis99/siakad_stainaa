const express = require('express')
const router = express.Router()
const presensiDosenController = require('../controllers/presensiDosenController.js')

router.get('/getDosenValidasiAvailable/:tgl/:thn/:smt/:jnj/:fks/:prd', presensiDosenController.getDosenValidasiAvailable)
router.get('/getDosenValidasiNoAvailable/:tgl/:thn/:smt/:jnj/:fks/:prd', presensiDosenController.getDosenValidasiNoAvailable)
router.get('/progresPresensi/:tgl/:thn', presensiDosenController.progresPresensi)
router.post('/presensiByRfid', presensiDosenController.presensiByRfid)
router.put('/validasiPresensi/:id', presensiDosenController.validasiPresensi)
router.get('/rekapPresensiPersmt/:thn/:smt/:jnj/:fks/:prd', presensiDosenController.rekapPresensiPersmt)
router.get('/detailRekapPresensiPersmt/:nipy/:thn/:smt/:jnj/:fks/:prd', presensiDosenController.detailRekapPresensiPersmt)
router.get('/rekapPresensiPerbln/:bln/:thn/:smt/:jnj/:fks/:prd', presensiDosenController.rekapPresensiPerbln)
router.get('/detailRekapPresensiPerbln/:nipy/:bln/:thn/:smt/:jnj/:fks/:prd', presensiDosenController.detailRekapPresensiPerbln)
router.get('/getbulan/:thn/:smt/:jnj/:fks/:prd', presensiDosenController.getbulan)
router.get('/getStatusAbsen/:tgl', presensiDosenController.getStatusAbsen)


module.exports = router