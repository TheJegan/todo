var express = require('express');
var router = express.Router();
var env = require('../env/config');
var mongoose = require('mongoose');
var userSchema = require('../model/user');
var User = mongoose.model('User', userSchema);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/*
{
    // set the field name here
    usernameField: 'username',
    passwordField: 'password'
  },
  */
passport.use(new LocalStrategy(
  {
      usernameField: 'username',
      passwordField: 'password'
  },
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      // if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

router.get('/me', env.isAuthenticated, function(req,res, next)
{
	res.json({
		'_id': req.user._id,
		"username": req.user.username
	})
});

router.get('/logout', env.isAuthenticated, function(req,res, next)
{
	req.logout();
	res.redirect('/');
})
// router.get('/login', env.isAuthenticated, function(req, res)
// {
// 	res.send('coo')
// });


router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/localSuccess');
  });


router.post('/signup', function(req, res)
{
	var profile = req.body;
	 var user = new User({
        oauthID: profile.id,
        username: profile.username,
        displayName: profile.displayName,
        created: Date.now()
    });
});


module.exports = router;