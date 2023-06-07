const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const dosenModel = require('./dosenModel.js')
const semesterModel = require('./semesterModel.js')
const prodiModel = require('./prodiModel.js')
const fakultasModel = require('./fakultasModel.js')
const jenjangPendidikanModel = require('./jenjangPendidikanModel.js')
const tahunAjaranModel = require('./tahunAjaranModel.js')


const mataKuliahModel = db.define('mataKuliah', {
    'id_mata_kuliah': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_mata_kuliah': {
        type: DataTypes.TEXT,
    },
    'nama_mata_kuliah': {
        type: DataTypes.TEXT
    },
    'jenis_mata_kuliah': {
        type: DataTypes.TEXT
    },
    'code_semester': {
        type: DataTypes.TEXT,
    },
    'code_jenjang_pendidikan': {
        type: DataTypes.TEXT,
    },
    'code_fakultas': {
        type: DataTypes.TEXT,
    },
    'code_prodi': {
        type: DataTypes.TEXT,
    },
    'code_tahun_ajaran': {
        type: DataTypes.TEXT,
    },
    'sks': {
        type: DataTypes.TEXT,
    },
    'sks_praktek': {
        type: DataTypes.TEXT,
    },
    'sks_prak_lapangan': {
        type: DataTypes.TEXT,
    },
    'sks_simulasi': {
        type: DataTypes.TEXT,
    },
    'metode_pembelajaran': {
        type: DataTypes.TEXT,
    },
    'tanggal_aktif': {
        type: DataTypes.TEXT,
    },
    'tanggal_non_aktif': {
        type: DataTypes.TEXT,
    },
    'status_bobot_makul': {
        type: DataTypes.ENUM,
        values: ['paket', 'pilih_sendiri']
    },
    'status_makul': {
        type: DataTypes.ENUM,
        values: ['wajib', 'tidak_wajib']
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif', 'tidak']
    }
}, {
    tableName: 'tb_mata_kuliah',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})


// semester 
semesterModel.belongsTo(mataKuliahModel, { foreignKey: 'code_semester' })
mataKuliahModel.hasMany(semesterModel, { sourceKey: 'code_semester', foreignKey: 'code_semester' })
// jenjangPendidikan 
jenjangPendidikanModel.belongsTo(mataKuliahModel, { foreignKey: 'code_jenjang_pendidikan' })
mataKuliahModel.hasMany(jenjangPendidikanModel, { sourceKey: 'code_jenjang_pendidikan', foreignKey: 'code_jenjang_pendidikan' })
// fakultas
fakultasModel.belongsTo(mataKuliahModel, { foreignKey: 'code_fakultas' })
mataKuliahModel.hasMany(fakultasModel, { sourceKey: 'code_fakultas', foreignKey: 'code_fakultas' })
// prodi 
prodiModel.belongsTo(mataKuliahModel, { foreignKey: 'code_prodi' })
mataKuliahModel.hasMany(prodiModel, { sourceKey: 'code_prodi', foreignKey: 'code_prodi' })
// tahunAjaran 
tahunAjaranModel.belongsTo(mataKuliahModel, { foreignKey: 'code_tahun_ajaran' })
mataKuliahModel.hasMany(tahunAjaranModel, { sourceKey: 'code_tahun_ajaran', foreignKey: 'code_tahun_ajaran' })


module.exports = mataKuliahModel