const db = require('../config/database.js')
const { Sequelize, DataTypes } = require('sequelize')

const pengumumanModel = db.define('pengumuman', {
    'id_pengumuman': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'tanggal_pengumuman': {
        type: DataTypes.TEXT,
    },
    'judul_pengumuman': {
        type: DataTypes.TEXT
    },
    'pengumuman': {
        type: DataTypes.TEXT
    },
    'level': {
        type: DataTypes.ENUM,
        values: ['dosen', 'mahasiswa']
    }
}, {
    tableName: 'tb_pengumuman',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

module.exports = pengumumanModel