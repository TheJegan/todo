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
	app.router = new AppRouter;

	app.router.on('route:renderList', function(id) 
	{	
		new app.ReadTask({listId: id, model: app.Tasks});
	});

	app.router.on('route:addList', function()
	{
		new app.addList();
	});

	app.router.on('route:addTask', function(id)
	{
		new app.Task({listId: id});
	})
	Backbone.history.start();
})();