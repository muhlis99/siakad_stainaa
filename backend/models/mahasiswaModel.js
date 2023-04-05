const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const jenjangPendidikanModel = require('./jenjangPendidikanModel.js')
const fakultasModel = require('./fakultasModel.js')
const prodiModel = require('./prodiModel.js')
const { desa, kecamatan, kabupaten, provinsi, negara } = require('../models/alat_alatMahasiswaModel.js')


const mahasiswaModel = db.define('mahasiswa', {
    'id_mahasiswa': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'nim': {
        type: DataTypes.TEXT,
    },
    'no_kk': {
        type: DataTypes.TEXT
    },
    'nik': {
        type: DataTypes.TEXT
    },
    'no_kps': {
        type: DataTypes.TEXT
    },
    'nisn': {
        type: DataTypes.TEXT
    },
    'npwp': {
        type: DataTypes.TEXT
    },
    'nama': {
        type: DataTypes.TEXT
    },
    'tanggal_lahir': {
        type: DataTypes.TEXT
    },
    'tempat_lahir': {
        type: DataTypes.TEXT
    },
    'jenis_kelamin': {
        type: DataTypes.ENUM,
        values: ['l', 'p']
    },
    'jalan': {
        type: DataTypes.TEXT
    },
    'dusun': {
        type: DataTypes.TEXT
    },
    'rt': {
        type: DataTypes.INTEGER
    },
    'rw': {
        type: DataTypes.INTEGER
    },
    'kode_pos': {
        type: DataTypes.INTEGER
    },
    'desa': {
        type: DataTypes.INTEGER
    },
    'kecamatan': {
        type: DataTypes.INTEGER
    },
    'kabupaten': {
        type: DataTypes.INTEGER
    },
    'provinsi': {
        type: DataTypes.INTEGER
    },
    'negara': {
        type: DataTypes.INTEGER
    },
    'alat_transportasi': {
        type: DataTypes.TEXT
    },
    'jalur_pendaftaran': {
        type: DataTypes.TEXT
    },
    'jenis_pendaftaran': {
        type: DataTypes.TEXT
    },
    'jenis_tinggal': {
        type: DataTypes.TEXT
    },
    'penerima_kps': {
        type: DataTypes.ENUM,
        values: ['ya', 'tidak']
    },
    'mulai_semester': {
        type: DataTypes.TEXT
    },
    'tanggal_masuk_kuliah': {
        type: DataTypes.TEXT
    },
    'email': {
        type: DataTypes.TEXT
    },
    'no_hp': {
        type: DataTypes.TEXT
    },
    'no_telepon': {
        type: DataTypes.TEXT
    },
    'nik_ayah': {
        type: DataTypes.TEXT
    },
    'nama_ayah': {
        type: DataTypes.TEXT
    },
    'tanggal_lahir_ayah': {
        type: DataTypes.TEXT
    },
    'pekerjaan_ayah': {
        type: DataTypes.TEXT
    },
    'penghasilan_ayah': {
        type: DataTypes.TEXT
    },
    'pendidikan_ayah': {
        type: DataTypes.TEXT
    },
    'nik_ibu': {
        type: DataTypes.TEXT
    },
    'nama_ibu': {
        type: DataTypes.TEXT
    },
    'tanggal_lahir_ibu': {
        type: DataTypes.TEXT
    },
    'pekerjaan_ibu': {
        type: DataTypes.TEXT
    },
    'penghasilan_ibu': {
        type: DataTypes.TEXT
    },
    'pendidikan_ibu': {
        type: DataTypes.TEXT
    },
    'nik_wali': {
        type: DataTypes.TEXT
    },
    'nama_wali': {
        type: DataTypes.TEXT
    },
    'tanggal_lahir_wali': {
        type: DataTypes.TEXT
    },
    'pekerjaan_wali': {
        type: DataTypes.TEXT
    },
    'penghasilan_wali': {
        type: DataTypes.TEXT
    },
    'pendidikan_wali': {
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
    'foto_diri': {
        type: DataTypes.TEXT
    },
    'foto_kk': {
        type: DataTypes.TEXT
    },
    'foto_ktp': {
        type: DataTypes.TEXT
    },
    'foto_ijazah': {
        type: DataTypes.TEXT
    },
    'foto_kip': {
        type: DataTypes.TEXT
    },
    'status': {
        type: DataTypes.ENUM,
        values: ["aktif", "tidak"]
    },
    'lastId': {
        type: DataTypes.VIRTUAL,
        get() {
            return this.id_mahasiswa;
        }, set(value) {
            throw new Error('Do not try to set the `id mahasiswa` value!');
        }
    }
}, {
    tableName: 'tb_mahasiswa',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

// join jenjang pendidikan
jenjangPendidikanModel.belongsTo(mahasiswaModel, { foreignKey: 'code_jenjang_pendidikan' })
mahasiswaModel.hasMany(jenjangPendidikanModel, { sourceKey: 'code_jenjang_pendidikan', foreignKey: 'code_jenjang_pendidikan' })
// join fakultas
fakultasModel.belongsTo(mahasiswaModel, { foreignKey: 'code_fakultas' })
mahasiswaModel.hasMany(fakultasModel, { sourceKey: 'code_fakultas', foreignKey: 'code_fakultas' })
// join prodi
prodiModel.belongsTo(mahasiswaModel, { foreignKey: 'code_prodi' })
mahasiswaModel.hasMany(prodiModel, { sourceKey: 'code_prodi', foreignKey: 'code_prodi' })
// join prodi
desa.belongsTo(mahasiswaModel, { foreignKey: 'code_desa' })
mahasiswaModel.hasMany(desa, { sourceKey: 'desa', foreignKey: 'code_desa' })
// join kecamatan
kecamatan.belongsTo(mahasiswaModel, { foreignKey: 'code_kecamatan' })
mahasiswaModel.hasMany(kecamatan, { sourceKey: 'kecamatan', foreignKey: 'code_kecamatan' })
// join kabupaten
kabupaten.belongsTo(mahasiswaModel, { foreignKey: 'code_kabupaten' })
mahasiswaModel.hasMany(kabupaten, { sourceKey: 'kabupaten', foreignKey: 'code_kabupaten' })
// join provinsi
provinsi.belongsTo(mahasiswaModel, { foreignKey: 'code_provinsi' })
mahasiswaModel.hasMany(provinsi, { sourceKey: 'provinsi', foreignKey: 'code_provinsi' })
// join negara
negara.belongsTo(mahasiswaModel, { foreignKey: 'code_negara' })
mahasiswaModel.hasMany(negara, { sourceKey: 'negara', foreignKey: 'code_negara' })

module.exports = mahasiswaModel