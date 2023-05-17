const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const dosenModel = require('./dosenModel.js')
const semesterModel = require('./semesterModel.js')
const prodiModel = require('./prodiModel.js')
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
    'code_dosen': {
        type: DataTypes.TEXT
    },
    'code_semester': {
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


// dosen 
dosenModel.belongsTo(mataKuliahModel, { foreignKey: 'nidn' })
mataKuliahModel.hasMany(dosenModel, { sourceKey: 'code_dosen', foreignKey: 'nidn' })
// semester 
semesterModel.belongsTo(mataKuliahModel, { foreignKey: 'code_semester' })
mataKuliahModel.hasMany(semesterModel, { sourceKey: 'code_semester', foreignKey: 'code_semester' })
// prodi 
prodiModel.belongsTo(mataKuliahModel, { foreignKey: 'code_prodi' })
mataKuliahModel.hasMany(prodiModel, { sourceKey: 'code_prodi', foreignKey: 'code_prodi' })
// tahunAjaran 
tahunAjaranModel.belongsTo(mataKuliahModel, { foreignKey: 'code_tahun_ajaran' })
mataKuliahModel.hasMany(tahunAjaranModel, { sourceKey: 'code_tahun_ajaran', foreignKey: 'code_tahun_ajaran' })


module.exports = mataKuliahModel