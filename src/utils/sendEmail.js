const nodemailer = require('nodemailer');
const logger = require('./logger');

const sendEmail = async(from, to, subject, message) => {
	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: 587,
		secure: false,
		secureOptions:{
			ssl: 'TLSv1_2_method'
		},
		auth:{
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS
		},
		tls:{
			rejectUnauthorized: true,
			ciphers: 'SSLv3'
		}
	});

	const options = {
		from,
		to,
		subject,
		html: message
	};

	transporter.sendMail(options, function(err, info) {
		if(err){
			logger.info('hubo un error ' + err);
		}else{
			logger.info(info,'HOLA');
		}
	});
};

module.exports = sendEmail;