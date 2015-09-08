var app = app || {};


(function()
{
	var list = Backbone.Firebase.Collection.extend({
		model: app.ListModel,
		// url: '/list',
		// localStorage: new Backbone.Todo.LocalStorage("List"),
		url: "https://sweltering-inferno-8653.firebaseio.com/",
		initialize: function()
		{			
		}
	});

	app.List = new list();
})();