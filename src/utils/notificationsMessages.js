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

const welcomeTitle = () => {
	return 'Bienvenido a la app';
};

const welcomeMessage = () => {
	return 'lucas lorenzo te da la bienvenida a esta gran red social';
};

module.exports = {
	newFollowerTitle,
	newFollowerMessage,
	newCommentTitle,
	newCommentMessage,
	newCommentReplyTitle,
	newCommentReplyMessage,
	welcomeTitle,
	welcomeMessage
};