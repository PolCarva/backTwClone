const express = require('express');
const path = require('path');
const passport = require('passport');
const morgan = require('morgan');
const session = require('express-session');
const cors = require('cors');
const{ Server: HttpServer } = require('http');

const app = express(); 
const httpServer = new HttpServer(app);

require('dotenv').config();
require('./config/passport');

//MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(cors({
	origin: '*',
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
	allowedHeaders: ['Access-Control-Allow-Origin', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
	credentials: true
}));
app.use(passport.initialize());
app.use(passport.session());

//ROUTES

const AuthRouter  = require('./routes/auth');
const PostsRouter  = require('./routes/posts');
const FollowersListsRouter  = require('./routes/followersLists');
const FollowingListsRouter  = require('./routes/followingLists');
const PostCommentsRouter  = require('./routes/postComments');
const CommentRepliesRouter  = require('./routes/commentReplies');
const NotificationsRouter  = require('./routes/notifications');
const SavedPostsListsRouter  = require('./routes/savedPostsLists');
const RetweetsRouter  = require('./routes/retweets');

const authRouter = new AuthRouter();
const postsRouter = new PostsRouter();
const followersListsRouter = new FollowersListsRouter();
const followingListsRouter = new FollowingListsRouter();
const postCommentsRouter = new PostCommentsRouter();
const commentRepliesRouter = new CommentRepliesRouter();
const notificationsRouter = new NotificationsRouter();
const savedPostsListsRouter = new SavedPostsListsRouter();
const retweetsRouter = new RetweetsRouter();

app.use('/api', authRouter.start());
app.use('/api', postsRouter.start());
app.use('/api', followersListsRouter.start());
app.use('/api', followingListsRouter.start());
app.use('/api', postCommentsRouter.start());
app.use('/api', commentRepliesRouter.start());
app.use('/api', notificationsRouter.start());
app.use('/api', savedPostsListsRouter.start());
app.use('/api', retweetsRouter.start());

module.exports = httpServer;