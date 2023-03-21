const {Sequelize, DataTypes} = require('sequelize')
const db = require('../config/database.js')
const jenjangPendidikanModel = require('./jenjangPendidikanModel.js')
const fakultasModel = require('./fakultasModel.js')

const prodiModel = db.define('prodi', {
    'id_prodi' : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_jenjang_pendidikan' : {
        type : DataTypes.TEXT,
    },
    'code_fakultas' : {
        type : DataTypes.TEXT
    },
    'code_prodi' : {
        type : DataTypes.TEXT
    },
    'nama_prodi' : {
        type : DataTypes.TEXT
    },
    'status' : {
        type : DataTypes.ENUM,
        values: ['aktif', 'tidak']
    }
},{
    tableName: 'tb_prodi',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

jenjangPendidikanModel.belongsTo(prodiModel,{foreignKey: 'code_jenjang_pendidikan' })
prodiModel.hasMany(jenjangPendidikanModel,{ sourceKey: 'code_jenjang_pendidikan', foreignKey: 'code_jenjang_pendidikan' })

fakultasModel.belongsTo(prodiModel,{foreignKey: 'code_fakultas' })
prodiModel.hasMany(fakultasModel,{ sourceKey: 'code_fakultas', foreignKey: 'code_fakultas' })
    


module.exports = prodiModel