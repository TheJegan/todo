var express = require('express');
var router = express.Router();
var env = require('../env/config');
var mongoose	= require('mongoose');
var listSchema = require('../model/list');
var taskSchema = require('../model/task');
var List = mongoose.model('List', listSchema);
var Task = mongoose.model('Task', taskSchema);
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();
var ObjectId = mongoose.Schema.Types.ObjectId;
var ListController = require('../controller/list');

router.get('/',function(req, res, next)
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
	});
});

router.post('/', env.isAuthenticated, function(req, res, next)
{
	console.log(req.body);
	console.log("user " + req.user);
	res.send(200, {status: '1'});

	var collection = req.body;

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

//will change later for better processing
//http://docs.mongodb.org/master/MongoDB-crud-guide.pdf
//upsert

function SyncLocalStorage(req, res, next)
{
	var rec = req.body;
	var bulk = List.collection.initializeUnorderedBulkOp();

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
router.post('/bulk', env.isAuthenticated, SyncLocalStorage, function(req, res, next)
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
	});
});

router.delete('/:id', env.isAuthenticated, function(req, res, next)
{
	var listId = req.params.id;

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
});

module.exports = router;