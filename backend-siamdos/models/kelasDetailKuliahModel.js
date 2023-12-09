const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const kelasKuliahModel = require('./kelasKuliahModel.js')
const mahasiswaModel = require('./mahasiswaModel.js')

const kelasDetailKuliahModel = db.define('kelasDetail', {
    'id_kelas_detail': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_kelas_detail': {
        type: DataTypes.TEXT,
    },
    'code_kelas': {
        type: DataTypes.TEXT
    },
    'nim': {
        type: DataTypes.TEXT
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif', 'tidak']
    }
}, {
    tableName: 'tb_kelas_detail',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

// kelas kuliah
kelasKuliahModel.belongsTo(kelasDetailKuliahModel, { foreignKey: 'code_kelas' })
kelasDetailKuliahModel.hasMany(kelasKuliahModel, { sourceKey: 'code_kelas', foreignKey: 'code_kelas' })

// mahasiwa
mahasiswaModel.belongsTo(kelasDetailKuliahModel, { foreignKey: 'nim' })
kelasDetailKuliahModel.hasMany(mahasiswaModel, { sourceKey: 'nim', foreignKey: 'nim' })

module.exports = kelasDetailKuliahModel