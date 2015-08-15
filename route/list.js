var express = require('express');
var router = express.Router();
var env = require('../env/config');
var mongoose	= require('mongoose');
var listSchema = require('../model/list');
var taskSchema = require('../model/task');
var List = mongoose.model('List', listSchema);
var Task = mongoose.model('Task', taskSchema);

router.get('/', env.isAuthenticated, function(req, res, next)
{
	List.find({'_user': req.user._id}, function(err, l)
	{
		if(err)
		{
			res.send(err);
		}else
		{
			res.send(l);
		}
	})
});

router.post('/', env.isAuthenticated, function(req, res, next)
{
	console.log(req.body);
	console.log("user " + req.user);

	var list = new List({
		name: req.body.name,
		_user: req.user._id
	});

	// res.send('complete');
	list.save(function(err)
	{
		if(err)
		{
			res.send(err);
		}
		else
		{
			res.send({"status" : "saved"});
		}
	});
});

router.put('/:listId', env.isAuthenticated, function(req, res, next)
{
	List.find({'_id': id}, function(err, t)
	{
		if(!err)
		{
			t = t[0];
			t.name = req.body.name;

			res.send({'status': 'ok'});
		}
	});
});

router.delete('/:id', env.isAuthenticated, function(req, res, next)
{
	var listId = req.params.id;

	List.find({'_id': id}, function(err, t)
	{
		if(!err)
		{
			res.send({'status': 'ok'});
		}
	}).remove().exec();
})
module.exports = router;