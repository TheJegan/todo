var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var listSchema = require('../model/list');
var List = mongoose.model('List', listSchema);
var env = require('../env/config');

router.get('/menu', function(req, res, next)
{
	List.find({}, function(err, l)
	{
		if(l)
		{
			res.send(l);
		}else
		{
			res.send('err');
		}
	})
});


module.exports = router;