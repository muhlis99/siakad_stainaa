const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const mataKuliahModel = require('./mataKuliahModel.js')

const krsModel = db.define('krs', {
    'id_krs': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_krs': {
        type: DataTypes.TEXT,
    },
    'code_mata_kuliah': {
        type: DataTypes.TEXT,
    },
    'nim': {
        type: DataTypes.TEXT,
    },
    'status_krs': {
        type: DataTypes.ENUM,
        values: ['setuju', 'tidak']
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif', 'tidak']
    }
}, {
    tableName: 'tb_krs',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

// prodi
mataKuliahModel.belongsTo(krsModel, { foreignKey: 'code_mata_kuliah' })
krsModel.hasMany(mataKuliahModel, { sourceKey: 'code_mata_kuliah', foreignKey: 'code_mata_kuliah' })

module.exports = krsModel