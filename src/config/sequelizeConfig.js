const { Sequelize } = require('sequelize');
const pg = require('pg');

const sequelize = new Sequelize('socialMedia', 'postgres', 'Marruecos02',{
	dialectModule: pg,
	host: 'database-2.crlokgsryokm.us-east-1.rds.amazonaws.com',
	dialect:  'postgres',
	logging: false,
	ssl: true,
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false
		}
	}
});

module.exports = sequelize;