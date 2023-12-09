const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const jenjangPendidikanModel = require('./jenjangPendidikanModel.js')

const fakultasModel = db.define('fakultas', {
    'id_fakultas': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_jenjang_pendidikan': {
        type: DataTypes.TEXT,
    },
    'code_fakultas': {
        type: DataTypes.TEXT
    },
    'code_dikti_fakultas': {
        type: DataTypes.TEXT
    },
    'nama_fakultas': {
        type: DataTypes.TEXT
    },
    'status': {
        type: DataTypes.ENUM,
        values: ["aktif", "tidak aktif"]
    }
}, {
    tableName: 'tb_fakultas',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

jenjangPendidikanModel.belongsTo(fakultasModel, { foreignKey: 'code_jenjang_pendidikan' })
fakultasModel.hasMany(jenjangPendidikanModel, { sourceKey: 'code_jenjang_pendidikan', foreignKey: 'code_jenjang_pendidikan' })



module.exports = fakultasModel