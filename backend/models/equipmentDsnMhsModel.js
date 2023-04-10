const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')


const desa = db.define('desa', {
    'id_desa': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_kecamatan': {
        type: DataTypes.TEXT,
    },
    'code_desa': {
        type: DataTypes.TEXT
    },
    'nama_desa': {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'tb_desa',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

const kecamatan = db.define('kecamatan', {
    'id_kecamatan': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_kabupaten': {
        type: DataTypes.TEXT,
    },
    'code_kecamatan': {
        type: DataTypes.TEXT
    },
    'nama_kecamatan': {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'tb_kecamatan',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

const kabupaten = db.define('kabupaten', {
    'id_kabupaten': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_provinsi': {
        type: DataTypes.TEXT,
    },
    'code_kabupaten': {
        type: DataTypes.TEXT
    },
    'nama_kabupaten': {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'tb_kabupaten',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

const provinsi = db.define('provinsi', {
    'id_provinsi': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_negara': {
        type: DataTypes.TEXT,
    },
    'code_provinsi': {
        type: DataTypes.TEXT
    },
    'nama_provinsi': {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'tb_provinsi',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

const negara = db.define('negara', {
    'id_negara': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_negara': {
        type: DataTypes.TEXT,
    },
    'nama_negara': {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'tb_negara',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})


// join desa
kecamatan.belongsTo(desa, { foreignKey: 'code_kecamatan' })
desa.hasMany(kecamatan, { sourceKey: 'code_kecamatan', foreignKey: 'code_kecamatan' })
// join kecamatan
kabupaten.belongsTo(kecamatan, { foreignKey: 'code_kabupaten' })
kecamatan.hasMany(kabupaten, { sourceKey: 'code_kabupaten', foreignKey: 'code_kabupaten' })
// join kabupaten
provinsi.belongsTo(kabupaten, { foreignKey: 'code_provinsi' })
kabupaten.hasMany(provinsi, { sourceKey: 'code_provinsi', foreignKey: 'code_provinsi' })
// join provinsi
negara.belongsTo(provinsi, { foreignKey: 'code_negara' })
provinsi.hasMany(negara, { sourceKey: 'code_negara', foreignKey: 'code_negara' })


// ----------------------------------------------------------------------------------------------- //
const alatTransportasi = db.define('alat_transportasi', {
    'id_alat_transportasi': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_alat_transportasi': {
        type: DataTypes.TEXT,
    },
    'nama_alat_transportasi': {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'tb_alat_transportasi',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

const agama = db.define('agama', {
    'id_agama': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_agama': {
        type: DataTypes.TEXT,
    },
    'nama_agama': {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'tb_agama',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

const jalurPendaftaran = db.define('jalur_pendaftaran', {
    'id_jalur_pendaftaran': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_jalur_pendaftaran': {
        type: DataTypes.TEXT,
    },
    'nama_jalur_pendaftaran': {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'tb_jalur_pendaftaran',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

const jenisPendaftaran = db.define('jenis_pendaftaran', {
    'id_jenis_pendaftaran': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_jenis_pendaftaran': {
        type: DataTypes.TEXT,
    },
    'nama_jenis_pendaftaran': {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'tb_jenis_pendaftaran',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

const jenisTinggal = db.define('jenis_tinggal', {
    'id_jenis_tinggal': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_jenis_tinggal': {
        type: DataTypes.TEXT,
    },
    'nama_jenis_tinggal': {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'tb_jenis_tinggal',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

const pekerjaan = db.define('pekerjaan', {
    'id_pekerjaan': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_pekerjaan': {
        type: DataTypes.TEXT,
    },
    'nama_pekerjaan': {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'tb_pekerjaan',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

const pendidikan = db.define('pendidikan', {
    'id_pendidikan': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_pendidikan': {
        type: DataTypes.TEXT,
    },
    'nama_pendidikan': {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'tb_pendidikan',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

const penghasilan = db.define('penghasilan', {
    'id_penghasilan': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_penghasilan': {
        type: DataTypes.TEXT,
    },
    'nama_penghasilan': {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'tb_penghasilan',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})
module.exports = {
    desa, kecamatan, kabupaten, provinsi, negara, alatTransportasi,
    agama, jalurPendaftaran, jenisPendaftaran, jenisTinggal, pekerjaan, pendidikan, penghasilan
}