const { Sequelize } = require('sequelize')

const db = new Sequelize('u2785662_coba_siakad_stainaa', 'u2785662_coba_siakad_stainaa', '@cobasiakadstainaa', {
    host: '151.106.119.201',
    dialect: 'mysql',
    url: 'localhost'
});


module.exports = db 