const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const dosenModel = require('./dosenModel.js')


const rfidDosenModel = db.define('rfidDosen', {
    'id_rfid': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_rfid': {
        type: DataTypes.TEXT,
    },
    'nip_ynaa': {
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
    tableName: 'tb_rfid_dosen',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

dosenModel.belongsTo(rfidDosenModel, { foreignKey: 'nip_ynaa' })
rfidDosenModel.hasMany(dosenModel, { sourceKey: 'nip_ynaa', foreignKey: 'nip_ynaa' })


module.exports = rfidDosenModel