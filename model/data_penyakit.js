const sequelize = require('sequelize');
const db = require('../util/database');

const data_penyakit = db.define('tb_data_penyakit',{
                        id_penyakit:{
                            type:sequelize.INTEGER,
                            allowNull:false,
                            autoIncrement:true,
                            primaryKey:true
                        },
                        id_catatan_medis:sequelize.INTEGER,
                        nama_penyakit:sequelize.STRING
},{freezeTableName:true});

module.exports = data_penyakit;