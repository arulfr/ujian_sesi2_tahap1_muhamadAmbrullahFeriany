const sequelize = require('sequelize');
const db = require('../util/database');

const dokter = db.define('tb_dokter',{
                id_dokter:{
                    type:sequelize.INTEGER,
                    allowNull:false,
                    autoIncrement:true,
                    primaryKey:true
                },
                nama:sequelize.STRING,
                email:sequelize.STRING,
                password:sequelize.TEXT,
                telepon:sequelize.STRING,
                alamat:sequelize.TEXT
},{freezeTableName:true})

module.exports = dokter;