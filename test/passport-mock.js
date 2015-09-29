/**
 * Author: Michael Weibel <michael.weibel@gmail.com>
 * License: MIT
 */
var passport = require('passport')
	, StrategyMock = require('./strategy-mock');
module.exports = function(app, options) {
// create your verify function on your own -- should do similar things as
// the "real" one.
	passport.use(new StrategyMock(options, 
			 
		});
	);
	app.get('/mock/login', passport.authenticate('mock'));
};