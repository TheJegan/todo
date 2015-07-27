var app = app || {};

(function()
{
	app.sec = 1000;

	app.List.fetch();
	
	setInterval(function()
	{
		app.Tasks.fetch({reset: true});
	}, 10000);


	new app.HeaderMenu({model: app.List});
	new app.ReadTask({model: app.Tasks});
	new app.MenuView({model: app.List});
})();