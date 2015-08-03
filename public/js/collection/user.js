var app = app || {};

(function()
{
	var user = Backbone.Collection.extend({
		model: app.UserModel,
		url: '/user/me',
		initialize: function()
		{

		}
	});

	app.User = new user();
})()