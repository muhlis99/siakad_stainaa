const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const mataKuliahModel = require('./mataKuliahModel.js')
const jenjangPendidikanModel = require('./jenjangPendidikanModel.js')
const fakultasModel = require('./fakultasModel.js')
const prodiModel = require('./prodiModel.js')
const semesterModel = require('./semesterModel.js')
const tahunAjaranModel = require('./tahunAjaranModel.js')
const mahasiswaModel = require('./mahasiswaModel.js')
const sebaranMataKuliah = require('./sebaranMataKuliah.js')

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
    'code_tahun_ajaran': {
        type: DataTypes.TEXT,
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
    'nim': {
        type: DataTypes.TEXT,
    },
    'status_krs': {
        type: DataTypes.ENUM,
        values: ['setuju', 'tidak']
    },
    'status_pengajuan_krs': {
        type: DataTypes.ENUM,
        values: ['diajukan', 'tidak']
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

// sebaran matakuliah
sebaranMataKuliah.belongsTo(krsModel, { foreignKey: 'code_mata_kuliah' })
krsModel.hasMany(sebaranMataKuliah, { sourceKey: 'code_mata_kuliah', foreignKey: 'code_mata_kuliah' })
// jenjang pendidikan
jenjangPendidikanModel.belongsTo(krsModel, { foreignKey: 'code_jenjang_pendidikan' })
krsModel.hasMany(jenjangPendidikanModel, { sourceKey: 'code_jenjang_pendidikan', foreignKey: 'code_jenjang_pendidikan' })
// fakultas
fakultasModel.belongsTo(krsModel, { foreignKey: 'code_fakultas' })
krsModel.hasMany(fakultasModel, { sourceKey: 'code_fakultas', foreignKey: 'code_fakultas' })
// prodi
prodiModel.belongsTo(krsModel, { foreignKey: 'code_prodi' })
krsModel.hasMany(prodiModel, { sourceKey: 'code_prodi', foreignKey: 'code_prodi' })
// semester
semesterModel.belongsTo(krsModel, { foreignKey: 'code_semester' })
krsModel.hasMany(semesterModel, { sourceKey: 'code_semester', foreignKey: 'code_semester' })
// tahunAjaranModel
tahunAjaranModel.belongsTo(krsModel, { foreignKey: 'code_tahun_ajaran' })
krsModel.hasMany(tahunAjaranModel, { sourceKey: 'code_tahun_ajaran', foreignKey: 'code_tahun_ajaran' })
// nim
mahasiswaModel.belongsTo(krsModel, { foreignKey: 'nim' })
krsModel.hasMany(mahasiswaModel, { sourceKey: 'nim', foreignKey: 'nim' })

module.exports = krsModel