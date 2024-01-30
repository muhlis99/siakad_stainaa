const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const jenjangPendidikanModel = require('./jenjangPendidikanModel.js')
const fakultasModel = require('./fakultasModel.js')
const prodiModel = require('./prodiModel.js')
const tahunAjaranModel = require('./tahunAjaranModel.js')
const semesterModel = require('./semesterModel.js')
const jadwalPertemuanModel = require('./jadwalPertemuanModel.js')
const dosenModel = require('./dosenModel.js')


const presensiDosenModel = db.define('presensiDosen', {
    'id_presensi_dosen': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_presensi_dosen': {
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
        type: DataTypes.TEXT
    },
    'code_prodi': {
        type: DataTypes.TEXT
    },
    'code_jadwal_pertemuan': {
        type: DataTypes.TEXT
    },
    'nip_ynaa': {
        type: DataTypes.TEXT
    },
    'tanggal': {
        type: DataTypes.TEXT,
    },
    'masuk': {
        type: DataTypes.INTEGER,
    },
    'izin': {
        type: DataTypes.INTEGER,
    },
    'jam_masuk': {
        type: DataTypes.TEXT,
    },
    'jam_pulang': {
        type: DataTypes.TEXT,
    },
    'keterangan': {
        type: DataTypes.TEXT,
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif', 'tidak']
    }
}, {
    tableName: 'tb_presensi_dosen',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

jenjangPendidikanModel.belongsTo(presensiDosenModel, { foreignKey: 'code_jenjang_pendidikan' })
presensiDosenModel.hasMany(jenjangPendidikanModel, { sourceKey: 'code_jenjang_pendidikan', foreignKey: 'code_jenjang_pendidikan' })

fakultasModel.belongsTo(presensiDosenModel, { foreignKey: 'code_fakultas' })
presensiDosenModel.hasMany(fakultasModel, { sourceKey: 'code_fakultas', foreignKey: 'code_fakultas' })

prodiModel.belongsTo(presensiDosenModel, { foreignKey: 'code_prodi' })
presensiDosenModel.hasMany(prodiModel, { sourceKey: 'code_prodi', foreignKey: 'code_prodi' })

tahunAjaranModel.belongsTo(presensiDosenModel, { foreignKey: 'code_tahun_ajaran' })
presensiDosenModel.hasMany(tahunAjaranModel, { sourceKey: 'code_tahun_ajaran', foreignKey: 'code_tahun_ajaran' })

semesterModel.belongsTo(presensiDosenModel, { foreignKey: 'code_semester' })
presensiDosenModel.hasMany(semesterModel, { sourceKey: 'code_semester', foreignKey: 'code_semester' })

jadwalPertemuanModel.belongsTo(presensiDosenModel, { foreignKey: 'code_jadwal_pertemuan' })
presensiDosenModel.hasMany(jadwalPertemuanModel, { sourceKey: 'code_jadwal_pertemuan', foreignKey: 'code_jadwal_pertemuan' })

dosenModel.belongsTo(presensiDosenModel, { foreignKey: 'nip_ynaa' })
presensiDosenModel.hasMany(dosenModel, { sourceKey: 'nip_ynaa', foreignKey: 'nip_ynaa' })

module.exports = presensiDosenModel