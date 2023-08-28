const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')


const contactMahasiswa = db.define('contactmahasiswa', {
    'id_chat_contact_mahasiswa': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_contact_mahasiswa': {
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
    }
}, {
    tableName: 'tb_chat_contact_mahasiswa',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})



module.exports = contactMahasiswa