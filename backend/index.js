const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')
const dotenv = require('dotenv')
const sequelizeStore = require('connect-session-sequelize')
const db = require('./config/database.js')


dotenv.config()
const app = express()
const sessionStore = sequelizeStore(session.Store)
const store =  new sessionStore({
    db : db
})
app.use(cors({
    credentials : true,
    origin : process.env.APP_ORIGIN,
}))
app.use(session({
    secret : process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store : store,
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
app.use('/v1/login', login)
app.use('/v1/registrasi', registrasi)
app.use('/v1/jenjangPendidikan', jenjangPendidikan)
app.use('/v1/fakultas', fakultas)
app.use('/v1/prodi', prodi)
app.use('/v1/mahasiswa', mahasiswa)

// default index
app.get('/', (req, res) => {
    res.send('Hello Word')
})

// store.sync()

app.listen(process.env.APP_PORT, (req, res) => {
    console.log(`APP IS RUNNING`)
})