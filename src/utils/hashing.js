const bcrypt = require('bcrypt');

const hash = (string) => {
	return bcrypt.hashSync(string, bcrypt.genSaltSync(10), null);
};

module.exports = hash;