const sequelize = require('sequelize');
const db = require('../util/database');

const pasien = db.define('tb_pasien',{
                        id_pasien:{
                            type:sequelize.INTEGER,
                            allowNull:false,
                            autoIncrement:true,
                            primaryKey:true
                        },
                        nama:sequelize.STRING,
                        email:sequelize.STRING,
                        password:sequelize.TEXT,
                        alamat:sequelize.TEXT,
                        telepon:sequelize.STRING,
                        jenis_kelamin:sequelize.ENUM('1','2'),
                        tempat_lahir:sequelize.STRING(100),
                        tgl_lahir:sequelize.DATEONLY
                        },{freezeTableName:true});
module.exports = pasien;