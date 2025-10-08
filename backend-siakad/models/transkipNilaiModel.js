const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')

const transkiNilaiModel = db.define('transkipNilai', {
    'id_transkip_nilai': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_transkip_nilai': {
        type: DataTypes.TEXT,
    },
    'nim': {
        type: DataTypes.TEXT,
    },
    'code_mata_kuliah': {
        type: DataTypes.TEXT,
    },
    'nama_mata_kuliah': {
        type: DataTypes.TEXT,
    },
    'code_semester': {
        type: DataTypes.TEXT
    },
    'semester': {
        type: DataTypes.INTEGER
    }
    ,
    'code_prodi': {
        type: DataTypes.INTEGER
    },
    'sks': {
        type: DataTypes.INTEGER
    },
    'nilai_huruf': {
        type: DataTypes.TEXT,
    },
    'nilai_angka': {
        type: DataTypes.TEXT,
    }
    // ,
    // 'ips': {
    //     type: DataTypes.TEXT,
    // }
    ,
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif', 'tidak']
    }
}, {
    tableName: 'tb_transkip_nilai',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})


module.exports = transkiNilaiModel