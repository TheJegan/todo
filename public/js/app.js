var app = app || {};

(function()
{
	app.sec = 0;

	app.List.fetch({reset: true});
	app.Tasks.fetch({reset: true});
	app.User.fetch({reset: true});
	
	var seconds = 1000;
	

	if(app.sec > 0)
	{
		setInterval(function()
		{
			app.Tasks.fetch({reset: true});
		}, app.sec * seconds);

		setInterval(function()
		{
			app.Tasks.fetch({reset: true});
		}, app.sec * seconds);
	}

	new app.HeaderMenu({model: app.List});
	new app.ReadTask({model: app.Tasks});
	new app.MenuView({model: app.List});
})();