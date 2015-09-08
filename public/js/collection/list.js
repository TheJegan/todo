var app = app || {};


(function()
{
	var list = Backbone.Collection.extend({
		model: app.ListModel,
		url: '/list',
		localStorage: new Backbone.Todo.LocalStorage("List"),
		initialize: function()
		{			
		}
	});

	app.List = new list();
})();