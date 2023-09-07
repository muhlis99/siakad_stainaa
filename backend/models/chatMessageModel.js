const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')


const chatMessage = db.define('chatMessage', {
    'id_chat_message': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'message_id': {
        type: DataTypes.TEXT,
    },
    'sender_id': {
        type: DataTypes.TEXT
    },
    'text_message': {
        type: DataTypes.TEXT
    },
    'sent_datetime': {
        type: DataTypes.TEXT
    },
    'read_message': {
        type: DataTypes.TEXT
    },
    'id_detail_contact': {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'tb_chat_message',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})



module.exports = chatMessage