var app = app || {};

(function()
{
	app.sec = 0;

	app.User.fetch({reset: true,
		success: function(model, response, options) 
		{
			app.List.fetch({reset: true});	
			app.Tasks.fetch({reset: true});
		},
		error: function(a,b,c)
		{
			//flash message
			new app.LoginView();
		}

	});

	app.List.on('reset', function(eventName)
	{
		new app.HeaderMenu({model: app.List});
		new app.MainView({model: app.List});
	});
	
	
	
})();