var app = app || {};

(function()
{
	app.sec = 1000;
	
	new app.HeaderMenu({model: app.List});
	new app.ReadTask({model: app.Tasks});
	new app.MenuView({model: app.List});
})();