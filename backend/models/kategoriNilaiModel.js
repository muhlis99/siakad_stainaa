const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')

const kategoriNilaiModel = db.define('kategoriNilai', {
    'id_kategori_nilai': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_kategori_nilai': {
        type: DataTypes.TEXT,
    },
    'angka': {
        type: DataTypes.TEXT,
    },
    'predikat': {
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

module.exports = kategoriNilaiModel