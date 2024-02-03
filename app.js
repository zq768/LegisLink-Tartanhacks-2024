// initialize express and app class object
var express = require('express');
var app = express();
var mysql = require('mysql');

// initialize handlebars templating engine
var hbs = require('hbs');
app.set('view engine', 'hbs');
app.use(express.static('static'));

// initialize the built-in library 'path'
var path = require('path');
console.log(__dirname);
app.use(express.static(path.join(__dirname,'public')));

//cookies
var cookieSession = require('cookie-session');
app.set('trust proxy', 1);
app.use(cookieSession({
    name: 'encr',
    keys: ['tAr3]DhKVtV+md?e', 'D3w8ATmew;7^B2y', 'f^hw8,g-K;duS:L:']
}));
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// -------------- mysql initialization -------------- //
var sql_params = {
  connectionLimit : 10,
  user            : 'root',
  password        : 'wearethestories',
  host            : 'localhost',
  database        : 'hackcmu'
};

var pool  = mysql.createPool(sql_params);
app.locals.pool = pool;

// Other endpoint handlers 
const login = require('./routes/login.js');
app.use(login);

const main = require('./routes/main.js');
app.use(main);

const post = require('./routes/post.js');
app.use(post);

const user = require('./routes/user.js');
app.use(user);

module.exports = app;
