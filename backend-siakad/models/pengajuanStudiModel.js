const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const mahasiswa = require('./mahasiswaModel.js')
const jenjangPendidikanModel = require('./jenjangPendidikanModel.js')
const fakultasModel = require('./fakultasModel.js')
const prodiModel = require('./prodiModel.js')
const semesterModel = require('./semesterModel.js')
const tahunAjaranModel = require('./tahunAjaranModel.js')

const pengajuanStudi = db.define('pengajuanStudi', {
    'id_pengajuan_studi': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_pengajuan_studi': {
        type: DataTypes.TEXT,
    },
    'code_tahun_ajaran': {
        type: DataTypes.TEXT
    },
    'code_semester': {
        type: DataTypes.TEXT
    },
    'code_jenjang_pendidikan': {
        type: DataTypes.TEXT
    },
    'code_fakultas': {
        type: DataTypes.TEXT
    },
    'code_prodi': {
        type: DataTypes.TEXT
    },
    'nim': {
        type: DataTypes.TEXT
    },
    'tanggal_pengajuan': {
        type: DataTypes.TEXT
    },
    'pengajuan': {
        type: DataTypes.TEXT
    },
    'alasan': {
        type: DataTypes.TEXT
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['disetujui1', 'disetujui2', 'proses', 'tidak']
    }
}, {
    tableName: 'tb_pengajuan_studi',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

mahasiswa.belongsTo(pengajuanStudi, { foreignKey: 'nim' })
pengajuanStudi.hasMany(mahasiswa, { sourceKey: 'nim', foreignKey: 'nim' })

tahunAjaranModel.belongsTo(pengajuanStudi, { foreignKey: 'code_tahun_ajaran' })
pengajuanStudi.hasMany(tahunAjaranModel, { sourceKey: 'code_tahun_ajaran', foreignKey: 'code_tahun_ajaran' })

semesterModel.belongsTo(pengajuanStudi, { foreignKey: 'code_semester' })
pengajuanStudi.hasMany(semesterModel, { sourceKey: 'code_semester', foreignKey: 'code_semester' })

jenjangPendidikanModel.belongsTo(pengajuanStudi, { foreignKey: 'code_jenjang_pendidikan' })
pengajuanStudi.hasMany(jenjangPendidikanModel, { sourceKey: 'code_jenjang_pendidikan', foreignKey: 'code_jenjang_pendidikan' })

fakultasModel.belongsTo(pengajuanStudi, { foreignKey: 'code_fakultas' })
pengajuanStudi.hasMany(fakultasModel, { sourceKey: 'code_fakultas', foreignKey: 'code_fakultas' })

prodiModel.belongsTo(pengajuanStudi, { foreignKey: 'code_prodi' })
pengajuanStudi.hasMany(prodiModel, { sourceKey: 'code_prodi', foreignKey: 'code_prodi' })



module.exports = pengajuanStudi