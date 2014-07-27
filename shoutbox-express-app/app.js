var express = require('express'),
    path = require('path'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

var app = express();

var user = require('./lib/middleware/user'),
    validate = require('./lib/middleware/validate'),
    page = require('./lib/middleware/page');

var Entry = require('./lib/entry'),
    messages = require('./lib/messages');

var register = require('./routes/register'),
    login = require('./routes/login'),
    entries = require('./routes/entries'),
    api = require('./routes/api');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/',
    page(Entry.count, 5),
    entries.list);
app.get('/post', entries.form);
app.post('/post',
    validate.required('entry[title]'),
    validate.lengthAbove('entry[title]', 4),
    entries.submit);
app.get('/register', register.form);
app.post('/register', register.submit);
app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/register', login.logout);

// REST API
app.get('/api/user/:id', api.user);
app.get('/api/entries/:page?', page(Entry.count), api.entries);
app.post('/api/entry', entries.submit);

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(methodOverride);
app.use(express.cookieParser('your secret here'));
app.use('/api', api.auth);  // before user data middleware
app.use(user);
app.use(messages);
app.use(app.router);