const path = require('path');

const swaggerSpec = {
	definition: {
		openapi: '3.0.0',
		info:{
			title: 'socialMediaClone',
			version: '1.0.0'
		},
		servers: [
			{
				url: 'http://localhost:3000'
			}
		]
	},
	apis: [`${path.join(__dirname, './routes/*.js')}`]
};

module.exports = swaggerSpec;