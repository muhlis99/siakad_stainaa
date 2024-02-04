const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const jenjangPendidikanModel = require('./jenjangPendidikanModel.js')
const fakultasModel = require('./fakultasModel.js')
const prodiModel = require('./prodiModel.js')
const tahunAjaranModel = require('./tahunAjaranModel.js')
const semesterModel = require('./semesterModel.js')
const jadwalPertemuanModel = require('./jadwalPertemuanModel.js')
const dosenModel = require('./dosenModel.js')


const jurnalDosenModel = db.define('jurnalDosen', {
    'id_jurnal_dosen': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_jurnal_dosen': {
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
    'materi_pembahasan': {
        type: DataTypes.INTEGER,
    },
    'keterangan': {
        type: DataTypes.INTEGER,
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif', 'tidak']
    }
}, {
    tableName: 'tb_jurnal_dosen',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

jenjangPendidikanModel.belongsTo(jurnalDosenModel, { foreignKey: 'code_jenjang_pendidikan' })
jurnalDosenModel.hasMany(jenjangPendidikanModel, { sourceKey: 'code_jenjang_pendidikan', foreignKey: 'code_jenjang_pendidikan' })

fakultasModel.belongsTo(jurnalDosenModel, { foreignKey: 'code_fakultas' })
jurnalDosenModel.hasMany(fakultasModel, { sourceKey: 'code_fakultas', foreignKey: 'code_fakultas' })

prodiModel.belongsTo(jurnalDosenModel, { foreignKey: 'code_prodi' })
jurnalDosenModel.hasMany(prodiModel, { sourceKey: 'code_prodi', foreignKey: 'code_prodi' })

tahunAjaranModel.belongsTo(jurnalDosenModel, { foreignKey: 'code_tahun_ajaran' })
jurnalDosenModel.hasMany(tahunAjaranModel, { sourceKey: 'code_tahun_ajaran', foreignKey: 'code_tahun_ajaran' })

semesterModel.belongsTo(jurnalDosenModel, { foreignKey: 'code_semester' })
jurnalDosenModel.hasMany(semesterModel, { sourceKey: 'code_semester', foreignKey: 'code_semester' })

jadwalPertemuanModel.belongsTo(jurnalDosenModel, { foreignKey: 'code_jadwal_pertemuan' })
jurnalDosenModel.hasMany(jadwalPertemuanModel, { sourceKey: 'code_jadwal_pertemuan', foreignKey: 'code_jadwal_pertemuan' })

dosenModel.belongsTo(jurnalDosenModel, { foreignKey: 'nip_ynaa' })
jurnalDosenModel.hasMany(dosenModel, { sourceKey: 'nip_ynaa', foreignKey: 'nip_ynaa' })

module.exports = jurnalDosenModel