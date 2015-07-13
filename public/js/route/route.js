var app = app || {};


(function()
{
	var AppRouter = Backbone.Router.extend({
	    routes: {
	        "list/:id": "renderList",
	        "list/add/": "addList"
	    }
	});

	// Initiate the router
	var app_router = new AppRouter;

	app_router.on('route:renderList', function(id) 
	{	
		var filter = app.List.GetList(id);
		new app.ListView({model: filter});
	});

	app_router.on('route:addList', function()
	{
		// console.log('addList');
		new app.addList();
	});

	Backbone.history.start();
})();