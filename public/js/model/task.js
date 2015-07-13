var app = app || {};

(function()
{
	app.Task = Backbone.Model.extend({
		defaults: {
			'name': '',
			'_user': '',
			'_list': ''
		},

		initialize: function()
		{

		}
	})
})();