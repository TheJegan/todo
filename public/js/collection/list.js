var app = app || {};


(function()
{
	var list = Backbone.Collection.extend({
		model: app.ListModel,
		url: '/list',
		initialize: function()
		{
			
		},
		GetList: function(id)
		{
			filtered = this.filter(function (todo) {
	            return todo.get("_id") === id;
	        });

	        return new list(filtered);
		}

	});

	app.List = new list();
})();