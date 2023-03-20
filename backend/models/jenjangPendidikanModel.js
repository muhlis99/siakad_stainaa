const {Sequelize,DataTypes } = require('sequelize')
const db = require('../config/database.js')


const jenjangPendidikanModel = db.define('jenjangPendidikan', {
    'id_jenjang_pendidikan' : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_jenjang_pendidikan' : {
        type : DataTypes.TEXT,
    },
    'nama_jenjang_pendidikan' : {
        type : DataTypes.TEXT
    },
    'status' : {
        type : DataTypes.ENUM,
        values: ['aktif', 'tidak']
    }
},{
    tableName: 'tb_jenjang_pendidikan',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

module.exports = jenjangPendidikanModel