const jwt = require('jsonwebtoken');

const UsersDAO = require('../database/users');
const usersDAO = new UsersDAO();

const authMiddleware = async(req, res, next) => {
	const authorizationHeader = req.headers.authorization;

	if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
		const token = authorizationHeader.split(' ')[1];
		try {
			const decoded = jwt.verify(token, 'adsfdcsfeds3w423ewdas');
			req.user = await usersDAO.getUserById(decoded.id);
			next();
		} catch (error) {
			res.status(401).json({ error: 'Token inválido' });
		}
	} else {
		res.status(401).json({ error: 'Se requiere autenticación' });
	}
};

module.exports = authMiddleware;