const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const mahasiswaModel = require('./mahasiswaModel.js')
const kategoriNilaiModel = require('./kategoriNilaiModel.js')
const mataKuliahModel = require('./mataKuliahModel.js')
const kelasKuliahModel = require('./kelasKuliahModel.js')

const nilaiKuliahModel = db.define('nilaiKuliah', {
    'id_nilai_kuliah': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_nilai_kuliah': {
        type: DataTypes.TEXT,
    },
    'code_kelas': {
        type: DataTypes.TEXT
    },
    'code_mata_kuliah': {
        type: DataTypes.TEXT
    },
    'code_kategori_nilai': {
        type: DataTypes.TEXT
    },
    'nim': {
        type: DataTypes.TEXT
    },
    'nilai_hadir': {
        type: DataTypes.TEXT,
    },
    'nilai_tugas': {
        type: DataTypes.TEXT
    },
    'nilai_uts': {
        type: DataTypes.TEXT
    },
    'nilai_uas': {
        type: DataTypes.TEXT
    },
    'nilai_jumlah': {
        type: DataTypes.TEXT
    },
    'nilai_akhir': {
        type: DataTypes.TEXT
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif', 'tidak']
    }
}, {
    tableName: 'tb_nilai_kuliah',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

// mata kuliah
mataKuliahModel.belongsTo(nilaiKuliahModel, { foreignKey: 'code_mata_kuliah' })
nilaiKuliahModel.hasMany(mataKuliahModel, { sourceKey: 'code_mata_kuliah', foreignKey: 'code_mata_kuliah' })
// mahasiswa
mahasiswaModel.belongsTo(nilaiKuliahModel, { foreignKey: 'nim' })
nilaiKuliahModel.hasMany(mahasiswaModel, { sourceKey: 'nim', foreignKey: 'nim' })
// kategori nilai
kategoriNilaiModel.belongsTo(nilaiKuliahModel, { foreignKey: 'code_kategori_nilai' })
nilaiKuliahModel.hasMany(kategoriNilaiModel, { sourceKey: 'code_kategori_nilai', foreignKey: 'code_kategori_nilai' })
// kelas kuliah
kelasKuliahModel.belongsTo(nilaiKuliahModel, { foreignKey: 'code_kelas' })
nilaiKuliahModel.hasMany(kelasKuliahModel, { sourceKey: 'code_kelas', foreignKey: 'code_kelas' })

module.exports = nilaiKuliahModel