var app = app || {};

(function()
{
	app.sec = 0;

	app.sync = function()
	{
		app.Tasks.fetch({reset: true});
		app.List.fetch({reset: true});
	};

	app.User.fetch({reset: true,
		success: function(model, response, options) 
		{
			app.User.trigger('authorized');
		},
		error: function(a,b,c)
		{
			app.User.trigger('not_authorized');
		}

	});

	app.User.on('authorized', function()
	{
		app.List.fetch({reset: true});			
		app.Tasks.fetch(
			{	
				reset: true, 
				success: function()
				{
					new app.HeaderMenu({model: app.List});
					new app.MainView({model: app.List});
				}
			});
	});

	app.User.on('not_authorized', function()
	{
		new app.LoginView();
	})
	
	
})();