var mongoose = require('mongoose');
var listSchema = require('../model/list');
var List = mongoose.model('List', listSchema);

exports.create = function(argument) {
	
}

exports.readListByUserId = function(id)
{
	console.log('user id: ' + id);

	List.find({}, function(err, l)
	{
		if(err)
		{
			// res.send(err);
			return err;
		}else
		{
			console.log(l)
			// res.send(l);
			return l;
		}
	})
}