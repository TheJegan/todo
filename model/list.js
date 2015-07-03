var mongoose = require('mongoose');

var listSchema = new Schema({
	name: String,
	tasks: [{
		name: String
		}],
	createdOn: {type: Date, default: Date.now},
	isDefaultDisplay: {type: Boolean, default: false}
});

module.exports = listSchema;
