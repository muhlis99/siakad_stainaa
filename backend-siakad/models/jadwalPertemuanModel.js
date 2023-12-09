const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const jadwalKuliahModel = require('./jadwalKuliahModel.js')

const jadwalPertemuanModel = db.define('jadwalPertemuan', {
    'id_jadwal_pertemuan': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_jadwal_pertemuan': {
        type: DataTypes.TEXT,
    },
    'code_jadwal_kuliah': {
        type: DataTypes.TEXT
    },
    'pertemuan': {
        type: DataTypes.TEXT
    },
    'tanggal_pertemuan': {
        type: DataTypes.TEXT
    },
    'jenis_pertemuan': {
        type: DataTypes.ENUM,
        values: ['kuliah', 'uts', 'uas']
    },
    'metode_pembelajaran': {
        type: DataTypes.ENUM,
        values: ['offline', 'online', 'campuran']
    },
    'url_online': {
        type: DataTypes.TEXT
    },
    'rencana_materi': {
        type: DataTypes.TEXT
    },
    'lampiran_materi': {
        type: DataTypes.TEXT
    },
    'status_pertemuan': {
        type: DataTypes.ENUM,
        values: ['terjadwal', 'selesai', 'diganti']
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif', 'tidak']
    }
}, {
    tableName: 'tb_jadwal_pertemuan',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

// jadwal kuliah
jadwalKuliahModel.belongsTo(jadwalPertemuanModel, { foreignKey: 'code_jadwal_kuliah' })
jadwalPertemuanModel.hasMany(jadwalKuliahModel, { sourceKey: 'code_jadwal_kuliah', foreignKey: 'code_jadwal_kuliah' })

module.exports = jadwalPertemuanModel