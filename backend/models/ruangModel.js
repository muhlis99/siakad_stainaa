const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')

const ruangModel = db.define('ruang', {
    'id_ruang': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_ruang': {
        type: DataTypes.TEXT,
    },
    'nama_ruang': {
        type: DataTypes.TEXT
    },
    'lokasi': {
        type: DataTypes.TEXT,
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif', 'tidak']
    }
}, {
    tableName: 'tb_ruang',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})


module.exports = ruangModel