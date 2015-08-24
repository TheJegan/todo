var app = app || {};


(function()
{
	var AppRouter = Backbone.Router.extend({
	    routes: {
	        "list/:id": "renderList",
	        "list/add/": "addList",
	        "list/:id/addTask/": "addTask",
	        "settings/": 'settings',
	        "task/update/:id": "updateTask",
	        "list/update/:id": "updateList"
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
		//new app.CreateList();
		new app.Create({model: app.ListModel, modelName: 'List'});
	});

	app.router.on('route:addTask', function(id)
	{
		// new app.CreateTask({listId: id});
		new app.Create({model: app.TaskModel, listId:id, modelName: 'Task'});
	});

	app.router.on('route:settings', function()
	{
		// new app.CreateTask({listId: id});
		new app.Settings();
	});

	app.router.on('route:updateTask', function(id)
	{
		new app.Update({modelId: id, model: app.Tasks});
	});

	app.router.on('route:updateList', function(id)
	{
		new app.Update({modelId: id, model: app.List});
	});

	Backbone.history.start();
})();