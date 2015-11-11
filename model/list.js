var mongoose = require('mongoose');

var listSchema = new mongoose.Schema({
	name: {type: String, unique: true},
	// _user: {ref: 'User', type: mongoose.Schema.Types.ObjectId},
	_user: String,
	createdOn: {type: Date, default: Date.now}
});

module.exports = listSchema;
