const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const tugasModel = require('./tugasModel.js')
const mahasiswaModel = require('./mahasiswaModel.js')

const detailTugasModel = db.define('tugas', {
    'id_detail_tugas': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_detail_tugas': {
        type: DataTypes.TEXT,
    },
    'code_tugas': {
        type: DataTypes.TEXT
    },
    'nim': {
        type: DataTypes.TEXT
    },
    'jawaban': {
        type: DataTypes.TEXT
    },
    'file_jawaban_word_pdf': {
        type: DataTypes.TEXT
    },
    'file_jawaban_ppt': {
        type: DataTypes.TEXT
    },
    'file_jawaban_video': {
        type: DataTypes.TEXT
    },
    'tanggal_pengumpulan': {
        type: DataTypes.TEXT
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['terkumpul', 'tidak']
    }
}, {
    tableName: 'tb_detail_tugas',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})


tugasModel.belongsTo(detailTugasModel, { foreignKey: 'code_tugas' })
detailTugasModel.hasMany(tugasModel, { sourceKey: 'code_tugas', foreignKey: 'code_tugas' })

mahasiswaModel.belongsTo(detailTugasModel, { foreignKey: 'nim' })
detailTugasModel.hasMany(mahasiswaModel, { sourceKey: 'nim', foreignKey: 'nim' })

module.exports = detailTugasModel