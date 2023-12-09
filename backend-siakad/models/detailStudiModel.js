const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const historyMahasiswa = require('./historyMahasiswaModel.js')

const detailStudi = db.define('detailStudi', {
    'id_detail_studi': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_detail_studi': {
        type: DataTypes.TEXT,
    },
    'code_history': {
        type: DataTypes.TEXT
    },
    'status_studi': {
        type: DataTypes.TEXT
    },
    'tanggal': {
        type: DataTypes.TEXT
    },
    'alasan': {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'tb_detail_studi',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})


historyMahasiswa.belongsTo(detailStudi, { foreignKey: 'code_history' })
detailStudi.hasMany(historyMahasiswa, { sourceKey: 'code_history', foreignKey: 'code_history' })


module.exports = detailStudi