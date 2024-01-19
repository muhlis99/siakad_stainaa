const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const jadwalPertemuanModel = require('./jadwalPertemuanModel.js')


const tugasModel = db.define('Mtugas', {
    'id_tugas': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_tugas': {
        type: DataTypes.TEXT,
    },
    'code_jadwal_pertemuan': {
        type: DataTypes.TEXT
    },
    'deskripsi_tugas': {
        type: DataTypes.TEXT
    },
    'tugas': {
        type: DataTypes.TEXT
    },
    'file_tugas': {
        type: DataTypes.TEXT
    },
    'tanggal_akhir': {
        type: DataTypes.TEXT
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['selesai', 'belum']
    }
}, {
    tableName: 'tb_tugas',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})


jadwalPertemuanModel.belongsTo(tugasModel, { foreignKey: 'code_jadwal_pertemuan' })
tugasModel.hasMany(jadwalPertemuanModel, { sourceKey: 'code_jadwal_pertemuan', foreignKey: 'code_jadwal_pertemuan' })


module.exports = tugasModel