var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
	name: String,
	_list: {ref: 'List', type: mongoose.Schema.Types.ObjectId},
	_user: {ref: 'User', type: mongoose.Schema.Types.ObjectId},
	createdOn: {type: Date, default: Date.now}
});

module.exports = taskSchema;