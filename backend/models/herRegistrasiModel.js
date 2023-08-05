const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const mataKuliahModel = require('./mataKuliahModel.js')
const jenjangPendidikanModel = require('./jenjangPendidikanModel.js')
const fakultasModel = require('./fakultasModel.js')
const prodiModel = require('./prodiModel.js')
const semesterModel = require('./semesterModel.js')
const tahunAjaranModel = require('./tahunAjaranModel.js')
const mahasiswaModel = require('./mahasiswaModel.js')

const herRegistrasiModel = db.define('herRegistrasi', {
    'id_her_registrasi': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_her_registrasi': {
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
    'tanggal': {
        type: DataTypes.TEXT,
    },
    'berkas': {
        type: DataTypes.TEXT,
    },
    'keterangan': {
        type: DataTypes.ENUM,
        values: ['lunas', 'tidak_lunas']
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif', 'tidak']
    }
}, {
    tableName: 'tb_her_registrasi',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

// jenjang pendidikan
jenjangPendidikanModel.belongsTo(herRegistrasiModel, { foreignKey: 'code_jenjang_pendidikan' })
herRegistrasiModel.hasMany(jenjangPendidikanModel, { sourceKey: 'code_jenjang_pendidikan', foreignKey: 'code_jenjang_pendidikan' })
// fakultas
fakultasModel.belongsTo(herRegistrasiModel, { foreignKey: 'code_fakultas' })
herRegistrasiModel.hasMany(fakultasModel, { sourceKey: 'code_fakultas', foreignKey: 'code_fakultas' })
// prodi
prodiModel.belongsTo(herRegistrasiModel, { foreignKey: 'code_prodi' })
herRegistrasiModel.hasMany(prodiModel, { sourceKey: 'code_prodi', foreignKey: 'code_prodi' })
// semester
semesterModel.belongsTo(herRegistrasiModel, { foreignKey: 'code_semester' })
herRegistrasiModel.hasMany(semesterModel, { sourceKey: 'code_semester', foreignKey: 'code_semester' })
// tahunAjaranModel
tahunAjaranModel.belongsTo(herRegistrasiModel, { foreignKey: 'code_tahun_ajaran' })
herRegistrasiModel.hasMany(tahunAjaranModel, { sourceKey: 'code_tahun_ajaran', foreignKey: 'code_tahun_ajaran' })
// nim
mahasiswaModel.belongsTo(herRegistrasiModel, { foreignKey: 'nim' })
herRegistrasiModel.hasMany(mahasiswaModel, { sourceKey: 'nim', foreignKey: 'nim' })

module.exports = herRegistrasiModel