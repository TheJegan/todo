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
		idAttribute: '_id',

		initialize: function()
		{

		}
	});

})();