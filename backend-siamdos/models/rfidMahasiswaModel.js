const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const mahasiswaModel = require('./mahasiswaModel.js')


const rfidMahasiswaModel = db.define('rfidMahasiswa', {
    'id_rfid': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_rfid': {
        type: DataTypes.TEXT,
    },
    'nim': {
        type: DataTypes.TEXT
    },
    'tanggal_aktif': {
        type: DataTypes.TEXT,
    },
    'tanggal_non_aktif': {
        type: DataTypes.TEXT,
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif', 'tidak']
    }
}, {
    tableName: 'tb_rfid_mahasiswa',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

mahasiswaModel.belongsTo(rfidMahasiswaModel, { foreignKey: 'nim' })
rfidMahasiswaModel.hasMany(mahasiswaModel, { sourceKey: 'nim', foreignKey: 'nim' })


module.exports = rfidMahasiswaModel