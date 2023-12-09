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
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
    cors: {
        origin: "https://siamdos.stainaa.ac.id"
    }
})
const sessionStore = sequelizeStore(session.Store)
const store = new sessionStore({
    db: db
})
app.use(fileUpload())
app.use(cors({
    credentials: true,
    // origin: process.env.APP_ORIGIN,
    origin: 'https://siamdos.stainaa.ac.id'
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
const home = require('./router/homeRoute.js')
const registrasi = require('./router/registrasiRoute.js')
const jenjangPendidikan = require('./router/jenjangPendidikanRoute.js')
const fakultas = require('./router/fakultasRoute.js')
const prodi = require('./router/prodiRoute.js')
const mahasiswa = require('./router/mahasiswaRoute.js')
const equipmentDsnMhs = require('./router/equipmentDsnMhsRoute.js')
const tahunAjaran = require('./router/tahunAjaranRoute.js')
const semester = require('./router/semesterRoute.js')
const kelasKuliah = require('./router/kelasKuliahRoute.js')
const kategoriNilai = require('./router/kategoriNilaiRoute.js')
const krs = require('./router/krsRoute.js')
const jadwalKuliah = require('./router/jadwalKuliahRoute.js')
const nilaiKuliah = require('./router/nilaiKuliahRoute.js')
const setMahasiswaSmt = require('./router/setMahasiswaSmtRoute.js')
const khs = require('./router/khsRoute.js')
const pengajuanStudi = require('./router/pengajuanStudiRoute.js')
const pembimbingAkademik = require('./router/pembimbingAkademikRoute.js')
const pengumuman = require('./router/pengumumanRoute.js')
const kontak = require('./router/kontakRoute.js')
const message = require('./router/messageRoute.js')(io)

app.use('/v1/login', login)
app.use('/v1/home', home)
app.use('/v1/registrasi', registrasi)
app.use('/v1/jenjangPendidikan', jenjangPendidikan)
app.use('/v1/fakultas', fakultas)
app.use('/v1/prodi', prodi)
app.use('/v1/mahasiswa', mahasiswa)
app.use('/v1/equipmentDsnMhs', equipmentDsnMhs)
app.use('/v1/tahunAjaran', tahunAjaran)
app.use('/v1/semester', semester)
app.use('/v1/kelasKuliah', kelasKuliah)
app.use('/v1/kategoriNilai', kategoriNilai)
app.use('/v1/krs', krs)
app.use('/v1/jadwalKuliah', jadwalKuliah)
app.use('/v1/nilaiKuliah', nilaiKuliah)
app.use('/v1/setMahasiswaSmt', setMahasiswaSmt)
app.use('/v1/khs', khs)
app.use('/v1/pengajuanStudi', pengajuanStudi)
app.use('/v1/pembimbingAkademik', pembimbingAkademik)
app.use('/v1/pengumuman', pengumuman)
app.use('/v1/kontak', kontak)
app.use('/v1/message', message)


// default index
app.get('/', (req, res) => {
    res.send('Hello Word')
})


//  socket connection
let onlineUser = []
io.on("connection", (socket) => {
    console.log('a user connected')
    socket.on("addNewUser", (userId) => {
        !onlineUser.some(user => user.userId === userId) &&
            onlineUser.push({
                userId,
                socketId: socket.id
            })
        console.log("onlineUser", onlineUser);
        io.emit("getOnlineUser", onlineUser)
    })

    socket.on("sendMessage", (message) => {
        const user = onlineUser.find((user => user.userId === message.reciptenId))
        if (user) {
            io.to(user.socketId).emit("getMessage", message)
        }
    })

    socket.on("disconnet", () => {
        onlineUser = onlineUser.filter(user => user.socketId !== socket.id)
        io.emit("getOnlineUser", onlineUser)
        console.log("disconnect", onlineUser);
    })

})


// store.sync()
server.listen(process.env.APP_PORT, (req, res) => {
    console.log(`APP IS RUNNING`)
})