// Express
const express = require('express');
const expressSession = require('express-session');

// Utils
const dotenv = require('dotenv').config({path: './config/.env'});
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const path = require('path');

// Redis
const RedisStore = require('connect-redis')(expressSession);

// Redis options
let redisOpts = {};

console.log(process.env.REDIS_HOST);

if (process.env.REDIS_HOST != 'null') {
  redisOpts = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    pass: process.env.REDIS_PASSWORD
  };
}

redisOpts.disableTTL = true;

// Initialize Express
const app = express();

// Middlewares
app.use(helmet.noCache());
app.use(helmet.frameguard());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/img',  express.static('dist/img'));
app.use('/css', express.static('dist/css'));
app.use('/js', express.static('dist/js'));
app.use('/assets', express.static('src/assets'));
app.use('/', express.static(__dirname));

if (process.env.REDIS_HOST != 'null') {
  app.use(expressSession({
    secret: 'very very secret',
    resave: true,
    saveUninitialized: false,
    store: new RedisStore(redisOpts)
  }));
}

// View config
app.set('view cache', false);
app.set('views', [ path.join(__dirname, 'src/views')]);

// Server listen to .env port
app.listen(process.env.PORT);

// Application routes
app.use(require('./app/routes'));
