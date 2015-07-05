var express = require('express');
var app = express();
var mongoose = require('mongoose');
var list = require('./route/list');

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);
app.use('/list', list);

app.listen(app.get('port'), function()
{
	console.log('listening...');
});
