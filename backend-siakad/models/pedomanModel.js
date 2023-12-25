const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')


const pedomanModel = db.define('pedoman', {
    'id_pedoman': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_pedoman': {
        type: DataTypes.TEXT,
    },
    'judul_pedoman': {
        type: DataTypes.TEXT
    },
    'deskripsi': {
        type: DataTypes.TEXT
    },
    'file_pedoman': {
        type: DataTypes.TEXT
    },
    'tanggal_terbit': {
        type: DataTypes.TEXT
    },
    'level': {
        type: DataTypes.ENUM,
        values: ['dosen', 'mahasiswa']
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif', 'tidak']
    }
}, {
    tableName: 'tb_pedoman',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

module.exports = pedomanModel