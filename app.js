var path = require('path')
var express = require('express')
var app = express();
var hbs = require('hbs');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var index = require('./routes/index');
var http = require('http');


var port = process.env.PORT || '3000'
app.set('port', port);

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'hbs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'secret', resave: false, saveUninitialized: true}))


app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

app.use('/', index);

var server = http.createServer(app);
server.listen(port);


module.exports = app