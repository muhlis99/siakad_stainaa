const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const mahasiswaModel = require('./mahasiswaModel.js')
const kategoriNilaiModel = require('./kategoriNilaiModel.js')
const mataKuliahModel = require('./mataKuliahModel.js')
const kelasKuliahModel = require('./kelasKuliahModel.js')
const tahunAjaranModel = require('./tahunAjaranModel.js')
const semesterModel = require('./semesterModel.js')
const jenjangPendidikanModel = require('./jenjangPendidikanModel.js')
const fakultasModel = require('./fakultasModel.js')
const prodiModel = require('./prodiModel.js')
const sebaranMataKuliah = require('./sebaranMataKuliah.js')

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
    'nim': {
        type: DataTypes.TEXT
    },
    'nilai_presentasi': {
        type: DataTypes.TEXT
    },
    'nilai_penguasaan_materi': {
        type: DataTypes.TEXT
    },
    'nilai_slide_power_point': {
        type: DataTypes.TEXT
    },
    'nilai_keaktifan': {
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
sebaranMataKuliah.belongsTo(nilaiKuliahModel, { foreignKey: 'code_mata_kuliah' })
nilaiKuliahModel.hasMany(sebaranMataKuliah, { sourceKey: 'code_mata_kuliah', foreignKey: 'code_mata_kuliah' })
// mahasiswa
mahasiswaModel.belongsTo(nilaiKuliahModel, { foreignKey: 'nim' })
nilaiKuliahModel.hasMany(mahasiswaModel, { sourceKey: 'nim', foreignKey: 'nim' })
// kategori nilai
kategoriNilaiModel.belongsTo(nilaiKuliahModel, { foreignKey: 'code_kategori_nilai' })
nilaiKuliahModel.hasMany(kategoriNilaiModel, { sourceKey: 'code_kategori_nilai', foreignKey: 'code_kategori_nilai' })
// kelas kuliah
kelasKuliahModel.belongsTo(nilaiKuliahModel, { foreignKey: 'code_kelas' })
nilaiKuliahModel.hasMany(kelasKuliahModel, { sourceKey: 'code_kelas', foreignKey: 'code_kelas' })
// tahun ajaran
tahunAjaranModel.belongsTo(nilaiKuliahModel, { foreignKey: 'code_tahun_ajaran' })
nilaiKuliahModel.hasMany(tahunAjaranModel, { sourceKey: 'code_tahun_ajaran', foreignKey: 'code_tahun_ajaran' })
// semester
semesterModel.belongsTo(nilaiKuliahModel, { foreignKey: 'code_semester' })
nilaiKuliahModel.hasMany(semesterModel, { sourceKey: 'code_semester', foreignKey: 'code_semester' })
// jenjang pendidikan
jenjangPendidikanModel.belongsTo(nilaiKuliahModel, { foreignKey: 'code_jenjang_pendidikan' })
nilaiKuliahModel.hasMany(jenjangPendidikanModel, { sourceKey: 'code_jenjang_pendidikan', foreignKey: 'code_jenjang_pendidikan' })
// fakultas
fakultasModel.belongsTo(nilaiKuliahModel, { foreignKey: 'code_fakultas' })
nilaiKuliahModel.hasMany(fakultasModel, { sourceKey: 'code_fakultas', foreignKey: 'code_fakultas' })
// prodi
prodiModel.belongsTo(nilaiKuliahModel, { foreignKey: 'code_prodi' })
nilaiKuliahModel.hasMany(prodiModel, { sourceKey: 'code_prodi', foreignKey: 'code_prodi' })


module.exports = nilaiKuliahModel