const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const mataKuliahModel = require('./mataKuliahModel.js')
const tahunAjaranModel = require('./tahunAjaranModel.js')
const kategoriNilaiModel = require('./kategoriNilaiModel.js')
const semesterModel = require('./semesterModel.js')


const sebaranMataKuliah = db.define('sebaranMataKuliah', {
    'id_sebaran': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_sebaran': {
        type: DataTypes.TEXT,
    },
    'code_mata_kuliah': {
        type: DataTypes.TEXT
    },
    'code_kategori_nilai': {
        type: DataTypes.TEXT,
    },
    'code_tahun_ajaran': {
        type: DataTypes.TEXT,
    },
    'code_semester': {
        type: DataTypes.TEXT,
    },
    'status_makul': {
        type: DataTypes.ENUM,
        values: ['paket', 'non paket']
    },
    'status_bobot_makul': {
        type: DataTypes.ENUM,
        values: ['wajib', 'tidak wajib']
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif', 'tidak']
    },
}, {
    tableName: 'tb_sebaran_mata_kuliah',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})


// mata kuliah 
mataKuliahModel.belongsTo(sebaranMataKuliah, { foreignKey: 'code_mata_kuliah' })
sebaranMataKuliah.hasMany(mataKuliahModel, { sourceKey: 'code_mata_kuliah', foreignKey: 'code_mata_kuliah' })
// kategori nilai
kategoriNilaiModel.belongsTo(sebaranMataKuliah, { foreignKey: 'code_kategori_nilai' })
sebaranMataKuliah.hasMany(kategoriNilaiModel, { sourceKey: 'code_kategori_nilai', foreignKey: 'code_kategori_nilai' })
// tahun ajaran 
tahunAjaranModel.belongsTo(sebaranMataKuliah, { foreignKey: 'code_tahun_ajaran' })
sebaranMataKuliah.hasMany(tahunAjaranModel, { sourceKey: 'code_tahun_ajaran', foreignKey: 'code_tahun_ajaran' })
// semester 
semesterModel.belongsTo(sebaranMataKuliah, { foreignKey: 'code_semester' })
sebaranMataKuliah.hasMany(semesterModel, { sourceKey: 'code_semester', foreignKey: 'code_semester' })

module.exports = sebaranMataKuliah