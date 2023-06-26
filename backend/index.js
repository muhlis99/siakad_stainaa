const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')
const dotenv = require('dotenv')
const fileUpload = require('express-fileupload')
const sequelizeStore = require('connect-session-sequelize')
const db = require('./config/database.js')


dotenv.config()
const app = express()
const sessionStore = sequelizeStore(session.Store)
const store = new sessionStore({
    db: db
})
app.use(fileUpload())
app.use(cors({
    credentials: true,
    origin: process.env.APP_ORIGIN,
}))
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// ROUTER
const login = require('./router/loginRouter.js')
const registrasi = require('./router/registrasiRoute.js')
const jenjangPendidikan = require('./router/jenjangPendidikanRoute.js')
const fakultas = require('./router/fakultasRoute.js')
const prodi = require('./router/prodiRoute.js')
const mahasiswa = require('./router/mahasiswaRoute.js')
const equipmentDsnMhs = require('./router/equipmentDsnMhsRoute.js')
const dosen = require('./router/dosenRoute.js')
const tahunAjaran = require('./router/tahunAjaranRoute.js')
const semester = require('./router/semesterRoute.js')
const ruang = require('./router/ruangRoute.js')
const kelasKuliah = require('./router/kelasKuliahRoute.js')
const mataKuliah = require('./router/mataKuliahRoute.js')
const plotingKelas = require('./router/plotingKelasRoute.js')
const kategoriNilai = require('./router/kategoriNilaiRoute.js')
const sebaranMataKuliah = require('./router/sebaranMataKuliahRoute.js')
const krs = require('./router/krsRoute.js')
// jadwal kuliah
const jadwalKuliah = require('./router/jadwalKuliahRoute.js')
const dosenPengajar = require('./router/dosenPengajarRoute.js')
const jadwalPertemuan = require('./router/jadwalPertemuanRoute.js')

app.use('/v1/login', login)
app.use('/v1/registrasi', registrasi)
app.use('/v1/jenjangPendidikan', jenjangPendidikan)
app.use('/v1/fakultas', fakultas)
app.use('/v1/prodi', prodi)
app.use('/v1/mahasiswa', mahasiswa)
app.use('/v1/equipmentDsnMhs', equipmentDsnMhs)
app.use('/v1/dosen', dosen)
app.use('/v1/tahunAjaran', tahunAjaran)
app.use('/v1/semester', semester)
app.use('/v1/ruang', ruang)
app.use('/v1/kelasKuliah', kelasKuliah)
app.use('/v1/mataKuliah', mataKuliah)
app.use('/v1/sebaranMataKuliah', sebaranMataKuliah)
app.use('/v1/plotingKelas', plotingKelas)
app.use('/v1/kategoriNilai', kategoriNilai)
app.use('/v1/krs', krs)
app.use('/v1/jadwalKuliah', jadwalKuliah)
app.use('/v1/dosenPengajar', dosenPengajar)
app.use('/v1/jadwalPertemuan', jadwalPertemuan)

// default index
app.get('/', (req, res) => {
    res.send('Hello Word')
})

// store.sync()
app.listen(process.env.APP_PORT, (req, res) => {
    console.log(`APP IS RUNNING`)
})