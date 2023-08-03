const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('socialMedia', 'postgres', 'Marruecos02',{
    host: 'localhost',
    dialect:  'postgres'
})

module.exports = sequelize