var app = app || {};


(function()
{
	var AppRouter = Backbone.Router.extend({
	    routes: {
	        "list/:id": "renderList",
	        "*actions": "cool"
	        // matches http://example.com/#anything-here
	    }
	});
	// Initiate the router
	var app_router = new AppRouter;

	app_router.on('route:renderList', function(id) {
		//app.List
			// app.List.GetList(id);
		//console.log(app.List.url);

		app.List.fetch({
			success: function(a, b, c)
			{
				var filter =app.List.GetList(id);
				new app.ListView({model: filter});
			},
			error: function(a, b, c)
			{
				console.log(b);
			}
		});
	});


	Backbone.history.start();

})();