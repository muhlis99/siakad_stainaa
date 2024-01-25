const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const mahasiswaModel = require('./mahasiswaModel.js')


const rfidModel = db.define('rfid', {
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
    tableName: 'tb_rfid',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

mahasiswaModel.belongsTo(rfidModel, { foreignKey: 'nim' })
rfidModel.hasMany(mahasiswaModel, { sourceKey: 'nim', foreignKey: 'nim' })


module.exports = rfidModel