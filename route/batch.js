var express = require('express');
var router = express.Router();
var env = require('../env/config');
var mongoose	= require('mongoose');
var listSchema = require('../model/list');
var taskSchema = require('../model/task');
var List = mongoose.model('List', listSchema);
var Task = mongoose.model('Task', taskSchema);



//var arrayOfLists = [{"_id":"809eab60-06a2-54c2-792f-038375a19225","name":"todo","_user":"","createdOn":""},{"_id":"0a429c91-ef20-aad2-1405-2725f568ed74","name":"doing","_user":"","createdOn":""},{"_id":"035b946e-dc30-e575-d2d9-2e5eda66c895","name":"done","_user":"","createdOn":""}];

function SyncLocalStorageList(req, res, next)
{
	var rec = req.body.lists;
	var bulk = List.collection.initializeUnorderedBulkOp();
	var ObjectId = mongoose.Types.ObjectId;
	var IDs = [];

	//for debugging purposes
	if(typeof req.user === 'undefined')
	{
		req.user = [];
		req.user._id = 1;
	}

	if(rec.length === 0)
	{
		next();
	}
	else
	{
		console.log(rec.length);
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
					//add ID and update list
					var _id = new ObjectId().toString();
					bulk.insert({ _id: _id, name: rec[i].name, _user: req.user._id});
					IDs.push({_old: rec[i]._id, _new: _id});
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

		results = bulk.execute(function(err, results)
		{
			res.locals.listIds = IDs;
			next();
		});
	}

}


function SyncLocalStorageTask(req, res, next)
{	
	var rec = req.body.tasks;

	//for debugging purposes
	if(typeof req.user === 'undefined')
	{
		req.user = [];
		req.user._id = 1;
	}

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
					var ListID = GetNewID(rec[i]._list, res.locals.listIds);
					bulk.insert({ name: rec[i].name, _user: req.user._id, _list: ListID.toString()});
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
	

	// next();
}

function GetNewID(ListID, Records)
{
	for(var i=0; i < Records.length; i++)
	{
		if(ListID == Records[i]._old)
		{
			return Records[i]._new;
		}
	}
	return ListID;
}
router.post('/', SyncLocalStorageList, SyncLocalStorageTask, function(req, res, next)
{
	
	List.find({'_user': req.user._id}, function(err, l)
	{
		if(err)
		{
			res.send(err);
		}else
		{

			// res.send(l);
			//will replace with promises or events emitter. calm down guys!
			Task.find({'_user': req.user._id}, function(err, t){
				if(err)
				{
					res.send(err);
				}
				else
				{
					res.json({lists: l, tasks: t});
				}
			});
		}
	});
});

module.exports = router;


// var arrayOfLists = [{"_id":"809eab60-06a2-54c2-792f-038375a19225","name":"todo","_user":"","createdOn":""},{"_id":"0a429c91-ef20-aad2-1405-2725f568ed74","name":"doing","_user":"","createdOn":""},{"_id":"035b946e-dc30-e575-d2d9-2e5eda66c895","name":"done","_user":"","createdOn":""}];
// var arrayOfTasks = [{"_id":"2a1bb0c9-f7f3-2d0c-e75f-7136a8db8f3f","name":"task #1","_list":"809eab60-06a2-54c2-792f-038375a19225","_user":""},{"_id":"f5864afc-63d4-f1b9-8ef4-67589f2455e6","name":"task 2","_list":"809eab60-06a2-54c2-792f-038375a19225","_user":""},{"_id":"68f261b9-b05d-50d8-fd55-2ec3af7c5c25","name":"task 3","_list":"0a429c91-ef20-aad2-1405-2725f568ed74","_user":""}]
// {lists: arrayOfLists, tasks: arrayOfTasks}
