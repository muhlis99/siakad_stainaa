const express = require('express')
const router = express.Router()
const presensiDosenController = require('../controllers/presensiDosenController.js')

router.get('/getDosenValidasiAvailable/:tgl/:thn/:smt/:jnj/:fks/:prd', presensiDosenController.getDosenValidasiAvailable)
router.get('/getDosenValidasiNoAvailable/:tgl/:thn/:smt/:jnj/:fks/:prd', presensiDosenController.getDosenValidasiNoAvailable)
// router.get('/progresPresensi/:code/:thn/:smt/:jnj/:fks/:prd', presensiDosenController.progresPresensi)
router.post('/presensiByRfid', presensiDosenController.presensiByRfid)
router.put('/validasiPresensi/:id', presensiDosenController.validasiPresensi)
router.get('/rekapPresensi/:codeJadkul/:thn/:smt/:jnj/:fks/:prd', presensiDosenController.rekapPresensi)
router.get('/detailRekapPresensi/:nim/:thn/:smt/:jnj/:fks/:prd', presensiDosenController.detailRekapPresensi)


module.exports = router