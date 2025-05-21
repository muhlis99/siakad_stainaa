const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const settingJadwalNilaiModel = require('./settingJadwalNilai.js')
const kategoriNilaiModel = require('./kategoriNilaiModel.js')


const virtualKategoriNilai = db.define('virtualKategoriNilai', {
    'id_virtual': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'id_setting': {
        type: DataTypes.TEXT,
    },
    'code_kategori_nilai': {
        type: DataTypes.TEXT
    },
    'nilai_atas': {
        type: DataTypes.TEXT
    },
    'nilai_bawah': {
        type: DataTypes.TEXT
    },
    'nilai_huruf': {
        type: DataTypes.TEXT
    },
    'keterangan': {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'tb_virtual_kat_nilai',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})


settingJadwalNilaiModel.belongsTo(virtualKategoriNilai, { foreignKey: 'id_setting' })
virtualKategoriNilai.hasMany(settingJadwalNilaiModel, { sourceKey: 'id_setting', foreignKey: 'id_setting' })

kategoriNilaiModel.belongsTo(virtualKategoriNilai, { foreignKey: 'code_kategori_nilai' })
virtualKategoriNilai.hasMany(kategoriNilaiModel, { sourceKey: 'code_kategori_nilai', foreignKey: 'code_kategori_nilai' })


module.exports = virtualKategoriNilai