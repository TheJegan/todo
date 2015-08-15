var app = app || {};


(function()
{
	var AppRouter = Backbone.Router.extend({
	    routes: {
	        "list/:id": "renderList",
	        "list/add/": "addList",
	        "list/:id/addTask/": "addTask",
	        "settings/": 'settings',
	        "list/update/:id": "update"
	    }
	});

	// Initiate the router
	app.router = new AppRouter;

	app.router.on('route:renderList', function(id) 
	{	
		// var TaskVM = app.GetTask(id);
		new app.ReadTask({listId: id, model: app.Tasks});
	});

	app.router.on('route:addList', function()
	{
		new app.CreateList();
	});

	app.router.on('route:addTask', function(id)
	{
		new app.CreateTask({listId: id});
	});

	app.router.on('route:settings', function()
	{
		// new app.CreateTask({listId: id});
		new app.Settings();
	});

	app.router.on('route:update', function(id)
	{
		new app.UpdateTask({modelId: id, model: app.Tasks});
	});

	Backbone.history.start();
})();