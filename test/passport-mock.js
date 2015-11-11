/**
 * Author: Michael Weibel <michael.weibel@gmail.com>
 * License: MIT
 */
var passport = require('passport')
	, StrategyMock = require('./strategy-mock');

var mongoose = require('mongoose');
var userSchema = require('../model/user');
var User = mongoose.model('User', userSchema);
var supertest = require('supertest')
var request = require('superagent');

var api = supertest('http://localhost:3000')

module.exports = function(app, options) {
// create your verify function on your own -- should do similar things as
// the "real" one.
	console.log('passport');
	passport.use(    new StrategyMock(options, User.findOne)  );
	api.get('/mE', passport.authenticate('mock'));
	console.log('end passport')
	// app.get('/mock/login')
};