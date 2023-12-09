const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const tahunAjaranModel = require('./tahunAjaranModel.js')

const kategoriNilaiModel = db.define('kategoriNilai', {
    'id_kategori_nilai': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_kategori_nilai': {
        type: DataTypes.TEXT,
    },
    'code_tahun_ajaran': {
        type: DataTypes.TEXT,
    },
    'nilai_atas': {
        type: DataTypes.TEXT,
    },
    'nilai_bawah': {
        type: DataTypes.TEXT,
    },
    'nilai_huruf': {
        type: DataTypes.TEXT
    },
    'interfal_skor': {
        type: DataTypes.TEXT
    },
    'kategori': {
        type: DataTypes.TEXT
    },
    'keterangan': {
        type: DataTypes.TEXT
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif', 'tidak']
    }
}, {
    tableName: 'tb_kategori_nilai',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

tahunAjaranModel.belongsTo(kategoriNilaiModel, { foreignKey: 'code_tahun_ajaran' })
kategoriNilaiModel.hasMany(tahunAjaranModel, { sourceKey: 'code_tahun_ajaran', foreignKey: 'code_tahun_ajaran' })

module.exports = kategoriNilaiModel