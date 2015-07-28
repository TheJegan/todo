var app = app || {};

(function()
{
	app.sec = 1000;

	app.List.fetch({reset: true});
	app.Tasks.fetch({reset: true});
	var seconds = 1000;
	
	// setInterval(function()
	// {
	// 	app.Tasks.fetch({reset: true});
	// }, 0 * seconds);

	// setInterval(function()
	// {
	// 	app.Tasks.fetch({reset: true});
	// }, 0 * seconds);


	new app.HeaderMenu({model: app.List});
	new app.ReadTask({model: app.Tasks});
	new app.MenuView({model: app.List});
})();