const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const tahunAjaranModel = require('./tahunAjaranModel.js')
const semesterModel = require('./semesterModel.js')

const settingJadwalNilaiModel = db.define('settingJadwalNilai', {
    'id_setting': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_tahun_ajaran': {
        type: DataTypes.TEXT,
    },
    'code_semester': {
        type: DataTypes.TEXT
    },
    'tanggal_mulai': {
        type: DataTypes.TEXT
    },
    'tanggal_akhir': {
        type: DataTypes.TEXT
    },
    'lastId': {
        type: DataTypes.VIRTUAL,
        get() {
            return this.id_setting;
        }, set(value) {
            throw new Error('Do not try to set the `id setting` value!');
        }
    }
}, {
    tableName: 'tb_setting_jadwal_nilai',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

tahunAjaranModel.belongsTo(settingJadwalNilaiModel, { foreignKey: 'code_tahun_ajaran' })
settingJadwalNilaiModel.hasMany(tahunAjaranModel, { sourceKey: 'code_tahun_ajaran', foreignKey: 'code_tahun_ajaran' })

semesterModel.belongsTo(settingJadwalNilaiModel, { foreignKey: 'code_semester' })
settingJadwalNilaiModel.hasMany(semesterModel, { sourceKey: 'code_semester', foreignKey: 'code_semester' })


module.exports = settingJadwalNilaiModel