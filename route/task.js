var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var taskSchema = require('../model/task');
var Task = mongoose.model('Task', taskSchema);

router.get('/:listId', function(req, res, next)
{
	Task.find({'_list': req.params.listId}, function(err, l)
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


router.post('/:listId', function(req, res, next)
{
	var listId = req.params.listId;

	var task = new Task(
	{
		name: req.body.name,
		_list: listId,
		_user: req.user._id
	});

	task.save(function(err){
		if(err)
		{
			res.send(err);
		}
		else
		{
			res.send('saved');
			//res with stat
		}
	});	
});



module.exports = router;