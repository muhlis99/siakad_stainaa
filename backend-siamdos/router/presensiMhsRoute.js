const express = require('express')
const router = express.Router()
const presensiMhsController = require('../controllers/presensiMhsController.js')

router.get('/getMakulByDosen/:nipy/:thn/:smt/:jnj/:fks/:prd', presensiMhsController.getMakulByDosen)
router.get('/getPertemuanByDosen/:codeJadkul', presensiMhsController.getPertemuanByDosen)
router.get('/getMhsValidasi/:code/:thn/:smt/:jnj/:fks/:prd', presensiMhsController.getMhsValidasi)
router.get('/progresPresensi/:code/:thn/:smt/:jnj/:fks/:prd', presensiMhsController.progresPresensi)
router.post('/presensiByRfid', presensiMhsController.presensiByRfid)
router.put('/validasiPresensi/:id', presensiMhsController.validasiPresensi)
router.get('/rekapPresensi/:codeJadkul/:thn/:smt/:jnj/:fks/:prd', presensiMhsController.rekapPresensi)
router.get('/detailRekapPresensi/:nim/:thn/:smt/:jnj/:fks/:prd', presensiMhsController.detailRekapPresensi)


module.exports = router