const db = require('../config/database.js')
const { Sequelize, DataTypes } = require('sequelize')
const { desa, kecamatan, kabupaten, provinsi, negara,
    alatTransportasi, pendidikan } = require('./equipmentDsnMhsModel.js')


const dosenModel = db.define('dosen', {
    'id_dosen': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'nidn': {
        type: DataTypes.TEXT,
    },
    'nama': {
        type: DataTypes.TEXT
    },
    'tempat_lahir': {
        type: DataTypes.TEXT
    },
    'tanggal_lahir': {
        type: DataTypes.TEXT
    },
    'jenis_kelamin': {
        type: DataTypes.ENUM,
        values: ['l', 'p']
    },
    'alamat_lengkap': {
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
    'kode_pos': {
        type: DataTypes.INTEGER
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
    'pendidikan_terakhir': {
        type: DataTypes.TEXT
    },
    'alat_transportasi': {
        type: DataTypes.TEXT
    },
    'foto_diri': {
        type: DataTypes.TEXT
    },
    'foto_ktp': {
        type: DataTypes.TEXT
    },
    'foto_sehat_rohani': {
        type: DataTypes.TEXT
    },
    'foto_sehat_jasmani': {
        type: DataTypes.TEXT
    },
    'foto_sk_bebas_narkotika': {
        type: DataTypes.TEXT
    },
    'foto_sk_dari_pimpinan_pt': {
        type: DataTypes.TEXT
    },
    'foto_surat_perjanjian_kerja': {
        type: DataTypes.TEXT
    },
    'foto_sk_dosen': {
        type: DataTypes.TEXT
    },
    'foto_sk_aktif_melaksanakan_tridma_pt': {
        type: DataTypes.TEXT
    },
    'tanggal_mulai': {
        type: DataTypes.TEXT
    },
    'tanggal_berhenti': {
        type: DataTypes.TEXT
    },
    'status_kepegawaian': {
        type: DataTypes.ENUM,
        values: ["non_pns", "pns", "x"]
    },
    'status': {
        type: DataTypes.ENUM,
        values: ["aktif", "tidak"]
    },
    'lastId': {
        type: DataTypes.VIRTUAL,
        get() {
            return this.id_dosen;
        }, set(value) {
            throw new Error('Do not try to set the `id dosen` value!');
        }
    }
}, {
    tableName: 'tb_dosen',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})


desa.belongsTo(dosenModel, { foreignKey: 'code_desa' })
dosenModel.hasMany(desa, { sourceKey: 'desa', foreignKey: 'code_desa' })
// join kecamatan
kecamatan.belongsTo(dosenModel, { foreignKey: 'code_kecamatan' })
dosenModel.hasMany(kecamatan, { sourceKey: 'kecamatan', foreignKey: 'code_kecamatan' })
// join kabupaten
kabupaten.belongsTo(dosenModel, { foreignKey: 'code_kabupaten' })
dosenModel.hasMany(kabupaten, { sourceKey: 'kabupaten', foreignKey: 'code_kabupaten' })
// join provinsi
provinsi.belongsTo(dosenModel, { foreignKey: 'code_provinsi' })
dosenModel.hasMany(provinsi, { sourceKey: 'provinsi', foreignKey: 'code_provinsi' })
// join negara
negara.belongsTo(dosenModel, { foreignKey: 'code_negara' })
dosenModel.hasMany(negara, { sourceKey: 'negara', foreignKey: 'code_negara' })
// join pendidikan terakhir
pendidikan.belongsTo(dosenModel, { foreignKey: 'code_pendidikan' })
dosenModel.hasMany(pendidikan, { sourceKey: 'pendidikan_terakhir', foreignKey: 'code_pendidikan' })
// alat transportasi
alatTransportasi.belongsTo(dosenModel, { foreignKey: 'code_alatTransportasi' })
dosenModel.hasMany(alatTransportasi, { sourceKey: 'alat_transportasi', foreignKey: 'code_alatTransportasi' })

module.exports = dosenModel