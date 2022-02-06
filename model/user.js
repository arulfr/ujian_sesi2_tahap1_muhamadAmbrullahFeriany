const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('tb_user', {
  id_user: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nama: Sequelize.STRING,
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password:Sequelize.TEXT,
  alamat:Sequelize.TEXT,
  telepon:Sequelize.STRING
},{
  freezeTableName: true,
});

module.exports = User;
