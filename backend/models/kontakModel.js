const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')


const kontak = db.define('kontak', {
    'id_kontak': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_kontak': {
        type: DataTypes.TEXT,
    },
    'username': {
        type: DataTypes.TEXT
    },
    'email': {
        type: DataTypes.TEXT
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif', 'tidak']
    },
    'level': {
        type: DataTypes.ENUM,
        values: ['dosen', 'mahasiswa']
    }
}, {
    tableName: 'tb_kontak',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})



module.exports = kontak