const sequelize = require('sequelize');
const db = require('../util/database');

const catatan_medis = db.define('tb_catatan_medis',{
                        id_catatan_medis:{
                            type:sequelize.INTEGER,
                            allowNull:false,
                            autoIncrement:true,
                            primaryKey:true
                        },
                        id_pasien:sequelize.INTEGER,
                        id_dokter:sequelize.INTEGER,
                        keluhan:sequelize.TEXT,
                        diagnosa:sequelize.TEXT,
                        tgl_catatan:sequelize.DATEONLY,
},{freezeTableName:true});

module.exports = catatan_medis;