const sequelize = require('sequelize');
const db = require('../util/database');

const pemeriksaan = db.define('tb_pemeriksaan',{
                        id_pemeriksaan:{
                            type:sequelize.INTEGER,
                            allowNull:false,
                            autoIncrement:true,
                            primaryKey:true
                        },
                        id_catatan_medis:sequelize.INTEGER,
                        tinggi_badan:sequelize.STRING,
                        berat_badan:sequelize.STRING,
                        tekanan_darah:sequelize.STRING,
                        kesimpulan:sequelize.TEXT,
                        tgl_pemeriksaan:sequelize.DATEONLY
},{freezeTableName:true});

module.exports = pemeriksaan;