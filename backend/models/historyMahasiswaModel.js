const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')


const historyMahasiswa = db.define('historyMahasiswa', {
    'id_history': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'nim': {
        type: DataTypes.TEXT,
    },
    'code_semester': {
        type: DataTypes.TEXT
    },
    'code_tahun_ajaran': {
        type: DataTypes.TEXT
    },
    'code_prodi': {
        type: DataTypes.TEXT
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif', 'tidak']
    }
}, {
    tableName: 'tb_history_mahasiswa',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

module.exports = historyMahasiswa