const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const jadwalKuliahModel = require('./jadwalKuliahModel.js')

const jadwalKuliahMingguanModel = db.define('jadwalKuliahMingguan', {
    'id_jadwal_kuliah_mingguan': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_jadwal_kuliah_mingguan': {
        type: DataTypes.TEXT,
    },
    'code_jadwal_kuliah': {
        type: DataTypes.TEXT
    },
    'hari': {
        type: DataTypes.TEXT
    },
    'jam_mulai': {
        type: DataTypes.TEXT
    },
    'jam_selesai': {
        type: DataTypes.TEXT
    },
    'metode_pembelajaran': {
        type: DataTypes.TEXT
    },
    'ruang': {
        type: DataTypes.TEXT
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif', 'tidak']
    }
}, {
    tableName: 'tb_jadwal_kuliah_mingguan',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

// mata_kuliah
jadwalKuliahModel.belongsTo(jadwalKuliahMingguanModel, { foreignKey: 'code_jadwal_kuliah' })
jadwalKuliahMingguanModel.hasMany(jadwalKuliahModel, { sourceKey: 'code_jadwal_kuliah', foreignKey: 'code_jadwal_kuliah' })

module.exports = jadwalKuliahMingguanModel