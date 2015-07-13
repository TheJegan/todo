var app = app || {};

(function()
{
	app.TaskModel = Backbone.Model.extend({
		defaults: {
			'_id': null,
			'name': '',
			'_user': '',
			'_list': ''
		},

		idAttribute: '_id',
		urlRoot: '/task',
		initialize: function()
		{

		}
	})
})();