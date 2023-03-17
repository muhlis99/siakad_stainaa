const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// ROUTER
const registrasi = require('./router/registrasiRoute.js')

// Registrasi
app.use('/v1/registrasi', registrasi)


app.get('/', (req, res) => {
    res.send('Hello Word')
})

app.listen(4001, (req, res) => {
    console.log(`APP IS RUNNING`)
})