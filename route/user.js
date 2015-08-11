var express = require('express');
var router = express.Router();

router.get('/me', function(req,res, next)
{
	if(typeof req.user === 'undefined')
	{
		req.user._id = '';
		req.user.username = '';
	}
	res.json({
		'_id': req.user._id,
		"username": req.user.username
	})
});

router.get('/logout', function(req,res, next)
{
	req.logout();
	res.redirect('/');
})



module.exports = router;