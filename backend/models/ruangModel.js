const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const jenjangPendidikanModel = require('./jenjangPendidikanModel.js')
const fakultasModel = require('./fakultasModel.js')
const prodiModel = require('./prodiModel.js')

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
    'code_jenjang_pendidikan': {
        type: DataTypes.TEXT,
    },
    'code_fakultas': {
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
    tableName: 'tb_ruang',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

// jenjang pendidikan
jenjangPendidikanModel.belongsTo(ruangModel, { foreignKey: 'code_jenjang_pendidikan' })
ruangModel.hasMany(jenjangPendidikanModel, { sourceKey: 'code_jenjang_pendidikan', foreignKey: 'code_jenjang_pendidikan' })
// fakultas
fakultasModel.belongsTo(ruangModel, { foreignKey: 'code_fakultas' })
ruangModel.hasMany(fakultasModel, { sourceKey: 'code_fakultas', foreignKey: 'code_fakultas' })
// prodi
prodiModel.belongsTo(ruangModel, { foreignKey: 'code_prodi' })
ruangModel.hasMany(prodiModel, { sourceKey: 'code_prodi', foreignKey: 'code_prodi' })

module.exports = ruangModel