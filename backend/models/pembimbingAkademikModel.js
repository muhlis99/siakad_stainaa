const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const dosenModel = require('./dosenModel.js')
const jenjangPendidikanModel = require('./jenjangPendidikanModel.js')
const fakultasModel = require('./fakultasModel.js')
const prodiModel = require('./prodiModel.js')

const pembimbingAkademik = db.define('pembimbingAkademik', {
    'id_pembimbing_akademik': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_pembimbing_akademik': {
        type: DataTypes.TEXT,
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
    'dosen': {
        type: DataTypes.TEXT
    },
    'kouta_bimbingan': {
        type: DataTypes.TEXT
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif', 'tidak']
    }
}, {
    tableName: 'tb_pembimbing_akademik',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

jenjangPendidikanModel.belongsTo(pembimbingAkademik, { foreignKey: 'code_jenjang_pendidikan' })
pembimbingAkademik.hasMany(jenjangPendidikanModel, { sourceKey: 'code_jenjang_pendidikan', foreignKey: 'code_jenjang_pendidikan' })

fakultasModel.belongsTo(pembimbingAkademik, { foreignKey: 'code_fakultas' })
pembimbingAkademik.hasMany(fakultasModel, { sourceKey: 'code_fakultas', foreignKey: 'code_fakultas' })

prodiModel.belongsTo(pembimbingAkademik, { foreignKey: 'code_prodi' })
pembimbingAkademik.hasMany(prodiModel, { sourceKey: 'code_prodi', foreignKey: 'code_prodi' })

dosenModel.belongsTo(pembimbingAkademik, { foreignKey: 'nip_ynaa' })
pembimbingAkademik.hasMany(dosenModel, { sourceKey: 'dosen', foreignKey: 'nip_ynaa' })


module.exports = pembimbingAkademik