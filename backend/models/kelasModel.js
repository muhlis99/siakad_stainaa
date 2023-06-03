const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const jenjangPendidikanModel = require('./jenjangPendidikanModel.js')
const fakultasModel = require('./fakultasModel.js')
const prodiModel = require('./prodiModel.js')
const ruangModel = require('./ruangModel.js')
const dosenModel = require('./dosenModel.js')

const kelasModel = db.define('kelas', {
    'id_kelas': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_kelas': {
        type: DataTypes.TEXT,
    },
    'nama_kelas': {
        type: DataTypes.TEXT
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
    'dosen_wali': {
        type: DataTypes.TEXT
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif', 'tidak']
    }
}, {
    tableName: 'tb_kelas',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

// jenjang pendidikan
jenjangPendidikanModel.belongsTo(kelasModel, { foreignKey: 'code_jenjang_pendidikan' })
kelasModel.hasMany(jenjangPendidikanModel, { sourceKey: 'code_jenjang_pendidikan', foreignKey: 'code_jenjang_pendidikan' })
// fakultas
fakultasModel.belongsTo(kelasModel, { foreignKey: 'code_fakultas' })
kelasModel.hasMany(fakultasModel, { sourceKey: 'code_fakultas', foreignKey: 'code_fakultas' })
// prodi
prodiModel.belongsTo(kelasModel, { foreignKey: 'code_prodi' })
kelasModel.hasMany(prodiModel, { sourceKey: 'code_prodi', foreignKey: 'code_prodi' })

// dosen
dosenModel.belongsTo(kelasModel, { foreignKey: 'nidn' })
kelasModel.hasMany(dosenModel, { sourceKey: 'dosen_wali', foreignKey: 'nidn' })


module.exports = kelasModel