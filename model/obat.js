const sequelize = require('sequelize');
const db = require('../util/database');

const obat = db.define('tb_obat',{
                        id_obat:{
                            type:sequelize.INTEGER,
                            allowNull:false,
                            autoIncrement:true,
                            primaryKey:true
                        },
                        nama_obat:sequelize.STRING,
                        jumlah:{
                            type:sequelize.INTEGER,
                            defaultValue:0
                        },
                        harga_jual:sequelize.INTEGER,
                        harga_beli:sequelize.INTEGER,
},{freezeTableName:true});

module.exports = obat;