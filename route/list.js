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
	List.find({'_id': req.params.listId}, function(err, t)
	{
		if(!err)
		{
			t = t[0];
			t.name = req.body.name;
			t.save(function(err){
				if(!err)
				{
					res.send({'status': 'ok'});
				}
			})
			
		}
	});
});

router.delete('/:id', env.isAuthenticated, function(req, res, next)
{
	var listId = req.params.id;
	// ( respond when all list and associated tasks have been deleted )
	List.find({'_id': listId}, function(err, t)
	{
		if(!err)
		{
		}
	}).remove().exec();

	Task.find({'_list': listId}, function(err, t)
	{
		if(!err)
		{
		}
	}).remove().exec();

	res.send({'status': 'ok'});
})
module.exports = router;