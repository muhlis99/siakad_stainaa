const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const pembimbingAkademik = require('./pembimbingAkademikModel.js')
const mahasiswaModel = require('./mahasiswaModel.js')

const detailPembimbingAkademik = db.define('detailPembimbingAkademik', {
    'id_detail_pembimbing_akademik': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_detail_pembimbing_akademik': {
        type: DataTypes.TEXT,
    },
    'code_pembimbing_akademik': {
        type: DataTypes.TEXT
    },
    'nim': {
        type: DataTypes.TEXT
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['disetujui1', 'disetujui2', 'tidak']
    }
}, {
    tableName: 'tb_detail_pembimbing_akademik',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

pembimbingAkademik.belongsTo(detailPembimbingAkademik, { foreignKey: 'code_pembimbing_akademik' })
detailPembimbingAkademik.hasMany(pembimbingAkademik, { sourceKey: 'code_pembimbing_akademik', foreignKey: 'code_pembimbing_akademik' })


mahasiswaModel.belongsTo(detailPembimbingAkademik, { foreignKey: 'nim' })
detailPembimbingAkademik.hasMany(mahasiswaModel, { sourceKey: 'nim', foreignKey: 'nim' })


module.exports = detailPembimbingAkademik