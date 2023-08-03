const {pino} = require('pino')

function buildDefaultLogger() {
	const defaultLogger = pino();
	defaultLogger.level = 'info';
	return defaultLogger;
}

function buildProdLogger() {
	const prodLogger = pino('warn-error.log');
	prodLogger.level = 'warn';
	return prodLogger;
}

let logger = buildDefaultLogger();

if (process.env.NODE_ENV == 'prod') {
	logger = buildProdLogger();
}

module.exports = logger