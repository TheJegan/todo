var express = require('express');
var app = express();
var mongoose = require('mongoose');
var list = require('./route/list');
var auth = require('./route/auth');
var system = require('./route/system');
// var menu = require('./route/menu')
var config = require('./env/config');
var session = require('express-session');
var passport = require('passport');
var bodyParser = require('body-parser');
mongoose.connect(config.mongooseURL);


app.use(express.static(__dirname + '/public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// app.use(express.cookieParser());
app.use(session({ secret: 'TODO MAKE UP SOMETHING', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.set('port', process.env.PORT || 3000);
app.use('/list', list);
app.use('/auth', auth);
app.use('/system', system);

app.listen(app.get('port'), function()
{
	console.log('listening...');
});
