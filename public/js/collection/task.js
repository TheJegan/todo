var app = app || {};

(function()
{
	task = Backbone.Collection.extend({
		url: '/task',
		model: app.TaskModel
	});

	app.Tasks = new task();
})()