const { Sequelize } = require('sequelize')

const db = new Sequelize('u2785662_siakad_stainaa', 'u2785662_siakad_stainaa2023', '@siakad_stainaa2023', {
    host: '151.106.119.201',
    dialect: 'mysql',
    url: 'localhost'
});


module.exports = db 