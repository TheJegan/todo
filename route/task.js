var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var taskSchema = require('../model/task');
var Task = mongoose.model('Task', taskSchema);
var env = require('../env/config');


router.get('/', env.isAuthenticated, function(req, res, next)
{
	Task.find({'_user': req.user._id}, function(err, l)
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

router.get('/:listId', env.isAuthenticated, function(req, res, next)
{
	Task.find({'_list': req.params.listId, '_user': req.user._id}, function(err, l)
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

// router.post('/:listId', env.isAuthenticated, function(req, res, next)
// {
// 	var listId = req.params.listId;

// 	var task = new Task(
// 	{
// 		name: req.body.name,
// 		_list: listId,
// 		_user: req.user._id
// 	});

// 	task.save(function(err){
// 		if(err)
// 		{
// 			res.send(err);
// 		}
// 		else
// 		{
// 			res.send({'status': 'saved'});
// 			//res with stat
// 		}
// 	});	
// });

function SyncLocalStorage(req, res, next)
{
	var rec = req.body;
	var bulk = Task.collection.initializeUnorderedBulkOp();

	if(rec.length === 0)
	{
		next();
	}
	else
	{

		for(var i = 0; i < rec.length; i++)
		{
			if(rec[i].isDelete === true)
			{
				bulk.find({'_id': rec[i]._id}).remove({'_id': rec[i]._id});
			}
			else
			{
				if(rec[i]._id.length === 36) //place holder hack
				{
					bulk.insert({ name: rec[i].name, _user: req.user._id})
				}
				else
				{
					bulk.find( {'_id': rec[i]._id}).upsert().update(
					   {
					      $set: { name: rec[i].name, _user: req.user._id} 
					   }
					);
				}		
			}
		}

		bulk.execute(function(err,results) {
	   		// result contains stats of the operations
	   		next();
		});
	}

}

router.put('/:taskId', env.isAuthenticated, function(req, res, next)
{
	var listId = req.body._list;
	var taskId = req.params.taskId;

	Task.find({'_id': taskId}, function(err, t)
	{
		if(!err)
		{
			t = t[0];
			t.name = req.body.name;
			t._list = listId;

			t.save(function(err)
				{
					if(err)
					{
						console.log(err);
						res.send(err);
					}else
					{
						console.log('updated');
						res.send({'status': 'ok'});

					}
				});
		}
	});
});

router.delete('/:taskId', env.isAuthenticated, function(req, res, next)
{
	Task.find({'_id': req.params.taskId}, function(err, t)
	{
		if(!err)
		{
			res.send({'status': 'ok'});
		}
	}).remove().exec();

})

module.exports = router;