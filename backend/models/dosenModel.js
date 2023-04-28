const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')


const dosen = db.define('dosen', {
    'id_desa': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_kecamatan': {
        type: DataTypes.TEXT,
    },
    'code_desa': {
        type: DataTypes.TEXT
    },
    'nama_desa': {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'tb_desa',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

const kecamatan = db.define('kecamatan', {
    'id_kecamatan': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_kabupaten': {
        type: DataTypes.TEXT,
    },
    'code_kecamatan': {
        type: DataTypes.TEXT
    },
    'nama_kecamatan': {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'tb_dosen',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

module.exports = dosen