const sequelize = require('sequelize');
const db = require('../util/database');

const obat_masuk = db.define('tb_obat_masuk',{
                        id_obat_masuk:{
                            type:sequelize.INTEGER,
                            allowNull:false,
                            autoIncrement:true,
                            primaryKey:true
                        },
                        id_obat:sequelize.INTEGER,
                        jumlah:sequelize.INTEGER,
                        supplier:sequelize.STRING,
},{freezeTableName:true});

module.exports = obat_masuk;