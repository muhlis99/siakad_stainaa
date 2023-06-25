const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const mataKuliahModel = require('./mataKuliahModel.js')
const prodiModel = require('./prodiModel.js')
const semesterModel = require('./semesterModel.js')
const tahunAjaranModel = require('./tahunAjaranModel.js')
const kelasModel = require('./kelasKuliahModel.js')
const ruangModel = require('./ruangModel.js')
const fakultasModel = require('./fakultasModel.js')


const jadwalKuliahModel = db.define('jadwalKuliah', {
    'id_jadwal_kuliah': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_jadwal_kuliah': {
        type: DataTypes.TEXT,
    },
    'code_mata_kuliah': {
        type: DataTypes.TEXT
    },
    'code_fakultas': {
        type: DataTypes.TEXT
    },
    'code_prodi': {
        type: DataTypes.TEXT
    },
    'code_semester': {
        type: DataTypes.TEXT
    },
    'code_tahun_ajaran': {
        type: DataTypes.TEXT
    },
    'code_kelas': {
        type: DataTypes.TEXT
    },
    'code_ruang': {
        type: DataTypes.TEXT
    },
    'tanggal_mulai': {
        type: DataTypes.TEXT
    },
    'tanggal_selesai': {
        type: DataTypes.TEXT
    },
    'jumlah_pertemuan': {
        type: DataTypes.TEXT
    },
    'hari': {
        type: DataTypes.TEXT
    },
    'jam_mulai': {
        type: DataTypes.TEXT
    },
    'jam_selesai': {
        type: DataTypes.TEXT
    },
    'metode_pembelajaran': {
        type: DataTypes.TEXT
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif', 'tidak']
    }
}, {
    tableName: 'tb_jadwal_kuliah',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

// mata_kuliah
mataKuliahModel.belongsTo(jadwalKuliahModel, { foreignKey: 'code_mata_kuliah' })
jadwalKuliahModel.hasMany(mataKuliahModel, { sourceKey: 'code_mata_kuliah', foreignKey: 'code_mata_kuliah' })

// kelas
kelasModel.belongsTo(jadwalKuliahModel, { foreignKey: 'code_kelas' })
jadwalKuliahModel.hasMany(kelasModel, { sourceKey: 'code_kelas', foreignKey: 'code_kelas' })

// prodi
prodiModel.belongsTo(jadwalKuliahModel, { foreignKey: 'code_prodi' })
jadwalKuliahModel.hasMany(prodiModel, { sourceKey: 'code_prodi', foreignKey: 'code_prodi' })

// semester
semesterModel.belongsTo(jadwalKuliahModel, { foreignKey: 'code_semester' })
jadwalKuliahModel.hasMany(semesterModel, { sourceKey: 'code_semester', foreignKey: 'code_semester' })

// tahun ajaran
tahunAjaranModel.belongsTo(jadwalKuliahModel, { foreignKey: 'code_tahun_ajaran' })
jadwalKuliahModel.hasMany(tahunAjaranModel, { sourceKey: 'code_tahun_ajaran', foreignKey: 'code_tahun_ajaran' })

// ruang
ruangModel.belongsTo(jadwalKuliahModel, { foreignKey: 'code_ruang' })
jadwalKuliahModel.hasMany(ruangModel, { sourceKey: 'code_ruang', foreignKey: 'code_ruang' })

// ruang
fakultasModel.belongsTo(jadwalKuliahModel, { foreignKey: 'code_fakultas' })
jadwalKuliahModel.hasMany(fakultasModel, { sourceKey: 'code_fakultas', foreignKey: 'code_fakultas' })

module.exports = jadwalKuliahModel