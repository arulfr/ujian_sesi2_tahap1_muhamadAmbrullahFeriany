const Sequelize = require('sequelize');
const sequelize = new Sequelize('db_poliklinik', 'root', '',{
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;
