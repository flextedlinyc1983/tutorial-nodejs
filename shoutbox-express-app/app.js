var express = require('express'),
    path = require('path'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

var app = express();

var register = require('./routes/register'),
    login = require('./routes/login'),
    messages = require('./lib/messages');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/register', register.form);
app.post('/register', register.submit);
app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/register', login.logout);

app.use(methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(messages());