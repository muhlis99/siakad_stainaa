const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const jenjangPendidikanModel = require('./jenjangPendidikanModel.js')
const fakultasModel = require('./fakultasModel.js')
const prodiModel = require('./prodiModel.js')
const mataKuliahModel = require('./mataKuliahModel.js')

const kelasKuliahModel = db.define('kelas', {
    'id_kelas': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_kelas': {
        type: DataTypes.TEXT,
    },
    'nama_kelas': {
        type: DataTypes.TEXT
    },
    'nim': {
        type: DataTypes.TEXT
    },
    'kapasitas': {
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
    'code_mata_kuliah': {
        type: DataTypes.TEXT
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif', 'tidak']
    }
}, {
    tableName: 'tb_kelas',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

// jenjang pendidikan
jenjangPendidikanModel.belongsTo(kelasKuliahModel, { foreignKey: 'code_jenjang_pendidikan' })
kelasKuliahModel.hasMany(jenjangPendidikanModel, { sourceKey: 'code_jenjang_pendidikan', foreignKey: 'code_jenjang_pendidikan' })
// fakultas
fakultasModel.belongsTo(kelasKuliahModel, { foreignKey: 'code_fakultas' })
kelasKuliahModel.hasMany(fakultasModel, { sourceKey: 'code_fakultas', foreignKey: 'code_fakultas' })
// prodi
prodiModel.belongsTo(kelasKuliahModel, { foreignKey: 'code_prodi' })
kelasKuliahModel.hasMany(prodiModel, { sourceKey: 'code_prodi', foreignKey: 'code_prodi' })
// prodi
mataKuliahModel.belongsTo(kelasKuliahModel, { foreignKey: 'code_mata_kuliah' })
kelasKuliahModel.hasMany(mataKuliahModel, { sourceKey: 'code_mata_kuliah', foreignKey: 'code_mata_kuliah' })


module.exports = kelasKuliahModel