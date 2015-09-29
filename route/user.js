var express = require('express');
var router = express.Router();
var env = require('../env/config');

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



module.exports = router;