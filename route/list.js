var express = require('express');
var router = express.Router();
var listSchema = require('../model/list');
var mongoose	= require('mongoose');
var List = mongoose.model('List', listSchema);


router.get('/', function(req, res, next)
{
	res.send('list');	
})

module.exports = router;