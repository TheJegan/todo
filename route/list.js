var express = require('express');
var router = express.Router();
var env = require('../env/config');
var mongoose	= require('mongoose');
var listSchema = require('../model/list');
var taskSchema = require('../model/task');
var List = mongoose.model('List', listSchema);
var Task = mongoose.model('Task', taskSchema);
// mongoose.connect(env.mongooseURL);


router.get('/', env.isAuthenticated, function(req, res, next)
{

	console.log('user log');
	console.log(req.user);

	List.find({/* UserID: req.user._id */}, function(err, l)
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

router.get('/:id', env.isAuthenticated, function(req, res, next)
{

	console.log('user log');
	console.log(req.user);

	List.find({"_id": req.params.id}, function(err, l)
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

router.get('/:id/task/:taskId', env.isAuthenticated, function(req, res, next)
{

});

router.put('/:id', function(req, res, next)
{	
	console.log("\n\n\n\n\n\params: " + req.params.id);


	List.find({'_id': req.params.id}, function(err, l)
	{

		if(l)
		{
			l = l[0];
			l.tasks = req.body.tasks;

			l.save(function(err) {
		      if (err)
		        console.log('error')
		      else
		        console.log('success')
		    });
		}
	});
	// res.send('test');
});

router.put('/:id/task/:taskId', env.isAuthenticated, function(req, res, next)
{

});


router.post('/', env.isAuthenticated, function(req, res, next)
{
	console.log(req.body);

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
			res.send("saved");
		}
	});
})


module.exports = router;