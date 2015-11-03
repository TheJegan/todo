var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
	name: String,
	_user: String,
	_list: {ref: 'List', type: mongoose.Schema.Types.ObjectId},
	createdOn: {type: Date, default: Date.now}
});

module.exports = taskSchema;