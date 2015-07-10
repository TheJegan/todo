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
			filtered = this.filter(function (todo) 
			{
	            return todo.get("_id") === id;
	        });

	        return new list(filtered);
		},
		MoveToDo: function(fromCategoryId, fromTaskId, toCategoryId, toTaskId)
		{
			//delete from category

			//add to Category
		}
		// ,
		// Add: function(CategoryId, TaskId)
		// {

		// },
		// Delete: function(CategoryId, TaskId)
		// {

		// }

	});

	app.List = new list();
})();