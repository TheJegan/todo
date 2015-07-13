var app = app || {};

(function()
{
	app.ListModel = Backbone.Model.extend({
		defaults: {
			'_id': null,
			'name': '',
			'_user': '',
			'createdOn': ''
		},
		idAttribute: '_id',
		urlRoot: '/list',

		initialize: function()
		{

		}
	});

})();