const express = require('express');
const path = require('path');
const passport = require('passport');
const morgan = require('morgan');
const session = require('express-session');
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

//RUTAS
const AuthRouter  = require('./routes/auth');
const PostsRouter  = require('./routes/posts');
const FollowersListsRouter  = require('./routes/followersLists');
const FollowingListsRouter  = require('./routes/followingLists');
const PostCommentsRouter  = require('./routes/postComments');

const authRouter = new AuthRouter();
const postsRouter = new PostsRouter();
const followersListsRouter = new FollowersListsRouter();
const followingListsRouter = new FollowingListsRouter();
const postCommentsRouter = new PostCommentsRouter();

app.use('/api', authRouter.start());
app.use('/api', postsRouter.start());
app.use('/api', followersListsRouter.start());
app.use('/api', followingListsRouter.start());
app.use('/api', postCommentsRouter.start());

module.exports = httpServer;