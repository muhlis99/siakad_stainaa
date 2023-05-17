const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const mahasiswaModel = require('./mahasiswaModel.js')
const kelasModel = require('./kelasModel.js')
const ruangModel = require('./ruangModel.js')
const mataKuliahModel = require('./mataKuliahModel.js')


const plotingKelasModel = db.define('plotingKelas', {
    'id_ploting_kelas': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_ploting_kelas': {
        type: DataTypes.TEXT,
    },
    'nim': {
        type: DataTypes.TEXT
    },
    'code_mata_kuliah': {
        type: DataTypes.TEXT
    },
    'code_kelas': {
        type: DataTypes.TEXT
    },
    'code_ruang': {
        type: DataTypes.TEXT,
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif', 'tidak']
    }
}, {
    tableName: 'tb_ploting_kelas',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})


// mahasiswa 
mahasiswaModel.belongsTo(plotingKelasModel, { foreignKey: 'nim' })
plotingKelasModel.hasMany(mahasiswaModel, { sourceKey: 'nim', foreignKey: 'nim' })
// kelas 
kelasModel.belongsTo(plotingKelasModel, { foreignKey: 'code_kelas' })
plotingKelasModel.hasMany(kelasModel, { sourceKey: 'code_kelas', foreignKey: 'code_kelas' })
// ruang 
ruangModel.belongsTo(plotingKelasModel, { foreignKey: 'code_ruang' })
plotingKelasModel.hasMany(ruangModel, { sourceKey: 'code_ruang', foreignKey: 'code_ruang' })
// mata kuliah 
mataKuliahModel.belongsTo(plotingKelasModel, { foreignKey: 'code_mata_kuliah' })
plotingKelasModel.hasMany(mataKuliahModel, { sourceKey: 'code_mata_kuliah', foreignKey: 'code_mata_kuliah' })


module.exports = plotingKelasModel