/* const {S3Client, PutObjectCommand, GetObjectCommand} = require('@aws-sdk/client-s3');
const fs = require('fs');
require('dotenv').config();

const client = new S3Client({region: process.env.AWS_BUCKET_REGION,
	credentials:{
		accessKeyId: process.env.AWS_ACCESS_KEY,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	}
});

async function uploadFile(file, imageName){
	const stream = fs.createReadStream(file.tempFilePath);

	const uploadParams = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: imageName,
		Body: stream
	};
	const command = new PutObjectCommand(uploadParams);

	return await client.send(command);
}

async function readFile(imageName){
	const uploadParams = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: imageName
	}; 
	const command = new GetObjectCommand(uploadParams);
	const result = await client.send(command);
	result.Body.pipe(fs.createWriteStream(`./images/${imageName}`));
}

module.exports = {
	uploadFile,
	readFile
}; */