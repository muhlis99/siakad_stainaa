const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')

const loginModel = db.define('login', {
    'id': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'username': {
        type: DataTypes.TEXT,
    },
    'email': {
        type: DataTypes.TEXT
    },
    'password': {
        type: DataTypes.TEXT
    },
    'role': {
        type: DataTypes.TEXT
    },
    'verify_code': {
        type: DataTypes.TEXT
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif', 'tidak']
    },
    'lastId': {
        type: DataTypes.VIRTUAL,
        get() {
            return this.id;
        }, set(value) {
            throw new Error('Do not try to set the `id mahasiswa` value!');
        }
    }
}, {
    tableName: 'tb_login',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

module.exports = loginModel