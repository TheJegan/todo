var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var taskSchema = require('../model/task');
var Task = mongoose.model('Task', taskSchema);

router.get('/', function(req, res, next)
{

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
})