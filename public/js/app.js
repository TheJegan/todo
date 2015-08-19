var app = app || {};

(function()
{
	app.sec = 0;

	app.List.fetch({reset: true, success: function()
		{
			new app.HeaderMenu({model: app.List});
			new app.MainView({model: app.List});
		}
	});
	app.Tasks.fetch({reset: true});
	app.User.fetch({reset: true});
	
	
	// new app.ReadTask({model: app.Tasks});
	
})();