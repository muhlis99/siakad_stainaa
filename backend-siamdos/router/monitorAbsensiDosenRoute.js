const express = require('express')
const router = express.Router()
const monitorAbsensiDosenController = require('../controllers/monitorAbsensiDosenController.js')


router.get('/rekapPresensiPersmt/:thn/:smt/:jnj/:fks/:prd', monitorAbsensiDosenController.rekapPresensiPersmt)
router.get('/detailRekapPresensiPersmt/:nipy/:thn/:smt/:jnj/:fks/:prd', monitorAbsensiDosenController.detailRekapPresensiPersmt)
router.get('/rekapPresensiPerbln/:bln/:thn/:smt/:jnj/:fks/:prd', monitorAbsensiDosenController.rekapPresensiPerbln)
router.get('/detailRekapPresensiPerbln/:nipy/:bln/:thn/:smt/:jnj/:fks/:prd', monitorAbsensiDosenController.detailRekapPresensiPerbln)
router.get('/getbulan/:thn/:smt/:jnj/:fks/:prd', monitorAbsensiDosenController.getbulan)


module.exports = router