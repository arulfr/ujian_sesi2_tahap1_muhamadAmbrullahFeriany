const sequelize = require('sequelize');
const db = require('../util/database');

const obat_keluar = db.define('obat_keluar',{
                        id_obat_keluar:{
                            type:sequelize.INTEGER,
                            allowNull:false,
                            autoIncrement:true,
                            primaryKey:true
                        },
                        id_obat:sequelize.INTEGER,
                        id_pemeriksaan:sequelize.INTEGER,
                        nama_obat:sequelize.STRING,
                        jumlah:sequelize.INTEGER,
                        harga_jual:sequelize.INTEGER,
},{freezeTableName:true});

module.exports = obat_keluar;