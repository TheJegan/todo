var app = app || {};

(function()
{
	app.ListModel = Backbone.Model.extend({
		defaults: {
			'_id': '',
			'name': '',
			'tasks': [],
			'createdOn': '',
			'isDefaultDisplay': ''
		},

		initialize: function()
		{

		}
	});

})();