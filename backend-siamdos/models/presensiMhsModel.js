const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const jenjangPendidikanModel = require('./jenjangPendidikanModel.js')
const fakultasModel = require('./fakultasModel.js')
const prodiModel = require('./prodiModel.js')
const tahunAjaranModel = require('./tahunAjaranModel.js')
const semesterModel = require('./semesterModel.js')
const jadwalPertemuanModel = require('./jadwalPertemuanModel.js')
const mahasiswaModel = require('./mahasiswaModel.js')


const presensiMhsModel = db.define('presensiMhs', {
    'id_presensi_mahasiswa': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_presensi_mahasiswa': {
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
    'nim': {
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
    'alpha': {
        type: DataTypes.INTEGER,
    },
    'keterangan': {
        type: DataTypes.TEXT,
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif', 'tidak']
    }
}, {
    tableName: 'tb_presensi_mahasiswa',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

jenjangPendidikanModel.belongsTo(presensiMhsModel, { foreignKey: 'code_jenjang_pendidikan' })
presensiMhsModel.hasMany(jenjangPendidikanModel, { sourceKey: 'code_jenjang_pendidikan', foreignKey: 'code_jenjang_pendidikan' })

fakultasModel.belongsTo(presensiMhsModel, { foreignKey: 'code_fakultas' })
presensiMhsModel.hasMany(fakultasModel, { sourceKey: 'code_fakultas', foreignKey: 'code_fakultas' })

prodiModel.belongsTo(presensiMhsModel, { foreignKey: 'code_prodi' })
presensiMhsModel.hasMany(prodiModel, { sourceKey: 'code_prodi', foreignKey: 'code_prodi' })

tahunAjaranModel.belongsTo(presensiMhsModel, { foreignKey: 'code_tahun_ajaran' })
presensiMhsModel.hasMany(tahunAjaranModel, { sourceKey: 'code_tahun_ajaran', foreignKey: 'code_tahun_ajaran' })

semesterModel.belongsTo(presensiMhsModel, { foreignKey: 'code_semester' })
presensiMhsModel.hasMany(semesterModel, { sourceKey: 'code_semester', foreignKey: 'code_semester' })

jadwalPertemuanModel.belongsTo(presensiMhsModel, { foreignKey: 'code_jadwal_pertemuan' })
presensiMhsModel.hasMany(jadwalPertemuanModel, { sourceKey: 'code_jadwal_pertemuan', foreignKey: 'code_jadwal_pertemuan' })

mahasiswaModel.belongsTo(presensiMhsModel, { foreignKey: 'nim' })
presensiMhsModel.hasMany(mahasiswaModel, { sourceKey: 'nim', foreignKey: 'nim' })

module.exports = presensiMhsModel