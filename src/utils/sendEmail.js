const nodemailer = require('nodemailer');
const logger = require('./logger');

const sendEmail = async(from, to, subject, message) => {
	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: 587,
		secure: true,
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


	await new Promise((resolve, reject) => {
		// verify connection configuration
		transporter.verify(function (error, success) {
			if (error) {
				console.log(error);
				reject(error);
			} else {
				console.log('Server is ready to take our messages');
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
		// send mail
		transporter.sendMail(options, (err, info) => {
			if (err) {
				console.error(err);
				reject(err);
			} else {
				console.log(info);
				resolve(info);
			}
		});
	});
};

module.exports = sendEmail; 