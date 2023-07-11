const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const mahasiswa = require('./mahasiswaModel.js')
const jenjangPendidikanModel = require('./jenjangPendidikanModel.js')
const fakultasModel = require('./fakultasModel.js')
const prodiModel = require('./prodiModel.js')
const semesterModel = require('./semesterModel.js')
const tahunAjaranModel = require('./tahunAjaranModel.js')

const historyMahasiswa = db.define('historyMahasiswa', {
    'id_history': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'nim': {
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
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif', 'tidak']
    }
}, {
    tableName: 'tb_history_mahasiswa',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

mahasiswa.belongsTo(historyMahasiswa, { foreignKey: 'nim' })
historyMahasiswa.hasMany(mahasiswa, { sourceKey: 'nim', foreignKey: 'nim' })

tahunAjaranModel.belongsTo(historyMahasiswa, { foreignKey: 'code_tahun_ajaran' })
historyMahasiswa.hasMany(tahunAjaranModel, { sourceKey: 'code_tahun_ajaran', foreignKey: 'code_tahun_ajaran' })

semesterModel.belongsTo(historyMahasiswa, { foreignKey: 'code_semester' })
historyMahasiswa.hasMany(semesterModel, { sourceKey: 'code_semester', foreignKey: 'code_semester' })

jenjangPendidikanModel.belongsTo(historyMahasiswa, { foreignKey: 'code_jenjang_pendidikan' })
historyMahasiswa.hasMany(jenjangPendidikanModel, { sourceKey: 'code_jenjang_pendidikan', foreignKey: 'code_jenjang_pendidikan' })

fakultasModel.belongsTo(historyMahasiswa, { foreignKey: 'code_fakultas' })
historyMahasiswa.hasMany(fakultasModel, { sourceKey: 'code_fakultas', foreignKey: 'code_fakultas' })

prodiModel.belongsTo(historyMahasiswa, { foreignKey: 'code_prodi' })
historyMahasiswa.hasMany(prodiModel, { sourceKey: 'code_prodi', foreignKey: 'code_prodi' })



module.exports = historyMahasiswa