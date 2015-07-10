var express = require('express');
var router = express.Router();
var env = require('../env/config');
var listSchema = require('../model/list');
var mongoose	= require('mongoose');
var List = mongoose.model('List', listSchema);
// mongoose.connect(env.mongooseURL);


function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  console.log('is not isAuthenticated');

  //console.log(req.user.username);

  res.redirect('/failure')
}


router.get('/', isAuthenticated, function(req, res, next)
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

router.get('/:id', isAuthenticated, function(req, res, next)
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


router.post('/', function(req, res, next)
{
	console.log(req.body);

	var list = new List({
		name: req.body.name,
		tasks: req.body.tasks,
		createdOn: req.body.createdOn,
		isDefaultDisplay: req.body.isDefaultDisplay
	});

	res.send('complete');
	// list.save(function(err)
	// 	{
	// 		if(err)
	// 		{
	// 			res.send(err);
	// 		}
	// 		else
	// 		{
	// 			res.send("saved");
	// 		}
	// 	});
})


module.exports = router;