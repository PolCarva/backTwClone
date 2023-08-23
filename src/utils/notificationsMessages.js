const newFollowerTitle = () => {
	return 'Nuevo seguidor!';
};

const newFollowerMessage = (followerUsername) => {
	return `${followerUsername} ha comenzado a seguirte`;
};

const newCommentTitle = () => {
	return 'Nuevo comentario!';
};

const newCommentMessage = (commentUser) => {
	return `${commentUser} comento tu publicacion`;
};

const newCommentReplyTitle = () => {
	return 'Respondieron a tu comentario!';
};

const newCommentReplyMessage = (commentUser) => {
	return `${commentUser} respondio tu comentario`;
};

const postRetweetedTitle = () => {
	return 'tu post recibio un retweet!';
};

const postRetweetedMessage = (commentUser) => {
	return `${commentUser} retuiteo tu post`;
};

const welcomeTitle = () => {
	return 'Bienvenido a la app';
};

const welcomeMessage = () => {
	return 'lucas y pablo te dan la bienvenida a esta gran red social';
};

const likeTitle = () => {
	return 'Recibiste un like';
};

const likeMessage = (usuario, likeado) => {
	return `${usuario} dio like a tu ${likeado}`;
};

module.exports = {
	newFollowerTitle,
	newFollowerMessage,
	newCommentTitle,
	newCommentMessage,
	newCommentReplyTitle,
	newCommentReplyMessage,
	postRetweetedTitle,
	postRetweetedMessage,
	welcomeTitle,
	welcomeMessage,
	likeTitle,
	likeMessage
};