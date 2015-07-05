var express = require('express');
var router = express.Router();
var listSchema = require('../model/list');
var mongoose	= require('mongoose');
var List = mongoose.model('List', listSchema);

mongoose.connect('mongodb://localhost/todo');


router.get('/', function(req, res, next)
{
	List.find({}, function(err, l)
	{
		if(err)
		{
			res.send(err);
		}else
		{
			res.send(l);
		}
	})
})

module.exports = router;