var mongoose = require('mongoose');
var listSchema = require('../model/list');
var List = mongoose.model('List', listSchema);


function SyncLocalStorage(next)
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


exports.create = function(argument) {
	
}

exports.readListByUserId = function(id, res, next)
{
	console.log('user id: ' + id);

	List.find({'_user': id}, function(err, l)
	{
		if(err)
		{
			res.send(err);
		}else
		{
			console.log(l)
			res.send(l);
			
		}
	})
}





exports.bulkProcess = function()
{

}