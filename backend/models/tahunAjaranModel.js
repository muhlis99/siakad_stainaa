const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')

const tahunAjaranModel = db.define('tahunAjaran', {
    'id_tahun_ajaran': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_tahun_ajaran': {
        type: DataTypes.TEXT,
    },
    'tahun_ajaran': {
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
    tableName: 'tb_tahun_ajaran',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

module.exports = tahunAjaranModel