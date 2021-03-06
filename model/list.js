var mongoose = require('mongoose');

var listSchema = new mongoose.Schema({
	name: String,
	_user: {ref: 'User', type: mongoose.Schema.Types.ObjectId},
	createdOn: {type: Date, default: Date.now}
});

module.exports = listSchema;
