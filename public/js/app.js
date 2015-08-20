var app = app || {};

(function()
{
	app.sec = 0;

	app.sync = function(callback)
	{
		var taskFetchComplete = false;
		var listFetchComplete = false;

		app.Tasks.fetch({reset: true});
		app.List.fetch({reset: true});

		app.Tasks.on('reset', function()
		{
			taskFetchComplete =true;

			if(listFetchComplete && taskFetchComplete)
			{
				if(typeof callback !== 'undefined')
				{
					callback();	
				}
			}
		});

		app.List.on('reset', function()
		{
			listFetchComplete = true;

			if(listFetchComplete && taskFetchComplete)
			{
				if(typeof callback !== 'undefined')
				{
					callback();	
				}
			}
		});
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