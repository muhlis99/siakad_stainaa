const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const jenjangPendidikanModel = require('./jenjangPendidikanModel.js')
const fakultasModel = require('./fakultasModel.js')
const prodiModel = require('./prodiModel.js')
const tahunAjaranModel = require('./tahunAjaranModel.js')
const semesterModel = require('./semesterModel.js')
const dosenModel = require('./dosenModel.js')
const mataKuliahModel = require('./mataKuliahModel.js')


const rpsModel = db.define('rps', {
    'id_rps': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_rps': {
        type: DataTypes.TEXT,
    },
    'code_mata_kuliah': {
        type: DataTypes.TEXT,
    },
    'rps': {
        type: DataTypes.TEXT,
    },
    'code_dosen': {
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
    'deskripsi': {
        type: DataTypes.INTEGER,
    },
    'tanggal': {
        type: DataTypes.INTEGER,
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif', 'tidak']
    }
}, {
    tableName: 'tb_rps',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

jenjangPendidikanModel.belongsTo(rpsModel, { foreignKey: 'code_jenjang_pendidikan' })
rpsModel.hasMany(jenjangPendidikanModel, { sourceKey: 'code_jenjang_pendidikan', foreignKey: 'code_jenjang_pendidikan' })

fakultasModel.belongsTo(rpsModel, { foreignKey: 'code_fakultas' })
rpsModel.hasMany(fakultasModel, { sourceKey: 'code_fakultas', foreignKey: 'code_fakultas' })

prodiModel.belongsTo(rpsModel, { foreignKey: 'code_prodi' })
rpsModel.hasMany(prodiModel, { sourceKey: 'code_prodi', foreignKey: 'code_prodi' })

tahunAjaranModel.belongsTo(rpsModel, { foreignKey: 'code_tahun_ajaran' })
rpsModel.hasMany(tahunAjaranModel, { sourceKey: 'code_tahun_ajaran', foreignKey: 'code_tahun_ajaran' })

semesterModel.belongsTo(rpsModel, { foreignKey: 'code_semester' })
rpsModel.hasMany(semesterModel, { sourceKey: 'code_semester', foreignKey: 'code_semester' })

mataKuliahModel.belongsTo(rpsModel, { foreignKey: 'code_mata_kuliah' })
rpsModel.hasMany(mataKuliahModel, { sourceKey: 'code_mata_kuliah', foreignKey: 'code_mata_kuliah' })

dosenModel.belongsTo(rpsModel, { foreignKey: 'nip_ynaa' })
rpsModel.hasMany(dosenModel, { sourceKey: 'code_dosen', foreignKey: 'nip_ynaa' })

module.exports = rpsModel