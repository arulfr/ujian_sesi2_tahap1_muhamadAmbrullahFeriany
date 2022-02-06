const sequelize = require('sequelize');
const db = require('../util/database');

const transaksi = db.define('tb_transaksi',{
                        id_transaksi:{
                            type:sequelize.INTEGER,
                            allowNull:false,
                            autoIncrement:true,
                            primaryKey:true
                        },
                        id_obat:sequelize.INTEGER,
                        id_pemeriksaan:sequelize.INTEGER,
                        tgl_transaksi:sequelize.DATEONLY,
                        jumlah:sequelize.INTEGER,
                        harga_obat:sequelize.INTEGER,
                        harga_pemeriksaan:sequelize.INTEGER
},{freezeTableName:true});

module.exports = transaksi;