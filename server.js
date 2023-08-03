const httpServer = require('./src/app');
const cluster = require('cluster');
const os = require('os');
const logger = require('./src/utils/logger');
const sequelize = require('./src/config/sequelizeConfig');
require('./src/models/user_followersList');
require('./src/models/user_followingList');
require('./src/models/post');
require('./src/models/user');


async function server (){
	const numCpus = os.cpus().length;

	if(cluster.isPrimary){
		logger.info(numCpus);
		logger.info(process.pid);

		for(let i = 0; i < numCpus; i++){
			cluster.fork();
		}
    
		cluster.on('exit', worker => {
			logger.info(worker.process.pid);
			cluster.fork();
		});
	}else{

		await sequelize.sync({alter: true}).then(() => {
			logger.info('All models were synchronized successfully.');
		}).catch((err) => {
			logger.info(err);
		});

		const PORT = 8080;

		const server = httpServer.listen(PORT, () => {
			logger.info(`App listening on port ${PORT}`);
		});

		server.on('error', err => logger.info(err));
	}
}

server();