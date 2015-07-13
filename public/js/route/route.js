var app = app || {};


(function()
{
	var AppRouter = Backbone.Router.extend({
	    routes: {
	        "list/:id": "renderList",
	        "list/add/": "addList",
	        "list/:id/addTask/": "addTask"
	    }
	});

	// Initiate the router
	var app_router = new AppRouter;

	app_router.on('route:renderList', function(id) 
	{	
		new app.readTask({listId: id});
	});

	app_router.on('route:addList', function()
	{
		new app.addList();
	});

	app_router.on('route:addTask', function(id)
	{
		new app.Task({listId: id});
	})
	Backbone.history.start();
})();