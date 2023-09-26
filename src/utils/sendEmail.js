/* const nodemailer = require('nodemailer');
const logger = require('./logger');

const sendEmail = async(from, to, subject, message) => {
	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: 465 ,
		secure: false,
		secureOptions:{
			ssl: 'TLSv1_2_method'
		},
		auth:{
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS
		},
		tls:{
			rejectUnauthorized: false,
			ciphers: 'TLSv1.2'
		}
	});

	await new Promise((resolve, reject) => {
		transporter.verify(function (error, success) {
			if (error) {
				logger.info(error);
				reject(error);
			} else {
				logger.info('Server is ready to take our messages');
				resolve(success);
			}
		});
	});

	const options = {
		from,
		to,
		subject,
		html: message
	};

	await new Promise((resolve, reject) => {
		transporter.sendMail(options, (err, info) => {
			if (err) {
				logger.info('hubo un error ' + err);
				reject(err);
			} else {
				logger.info(info,'mail enviado');
				resolve(info);
			}
		});
	});
};

module.exports = sendEmail; */
const mailgun = require('mailgun-js');
const logger = require('./logger');

const mg = mailgun({
	apiKey: '29ef25f7e47cbb6d39c2f1b3d5f30d40-db137ccd-655691ab',
	domain: 'sandbox365385809aed417ba4f9ba504739810e.mailgun.org',
});

const sendEmail = async (from, to, subject, message) => {
	const data = {
		from,
		to,
		subject,
		html: message,
	};

	try {
		await mg.messages().send(data);
		logger.info('Correo enviado');
	} catch (error) {
		logger.error('Error al enviar el correo:', error);
		throw error;
	}
};

module.exports = sendEmail;
