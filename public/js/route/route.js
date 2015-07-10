var app = app || {};


(function()
{
	var AppRouter = Backbone.Router.extend({
	    routes: {
	        "list/:id": "renderList"
	    }
	});
	// Initiate the router
	var app_router = new AppRouter;

	app_router.on('route:renderList', function(id) {
		
		var filter = app.List.GetList(id);
		new app.ListView({model: filter});
	});


	Backbone.history.start();

})();