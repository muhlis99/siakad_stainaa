const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')


const contactDosen = db.define('contactDosen', {
    'id_chat_contact_dosen': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_contact_dosen': {
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
    tableName: 'tb_chat_contact_dosen',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})



module.exports = contactDosen