const httpServer = require('./app');
const cluster = require('cluster');
const os = require('os');
const logger = require('./utils/logger');
const sequelize = require('./config/sequelizeConfig');
require('./models/user_followersList');
require('./models/user_followingList');
require('./models/post');
require('./models/user');


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

		const PORT = process.env.PORT || 3000;

		const server = httpServer.listen(PORT, '0.0.0.0' ,() => {
			logger.info(`App listening on port ${PORT}`);
		});

		server.on('error', err => logger.info(err));
	}
}

server();