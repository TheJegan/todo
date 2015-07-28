var app = app || {};


(function($)
{
	app.CreateList = Backbone.View.extend(
	{
		el: '#todo-body',
		events: {
			'click #btnAddList': 'AddList'
		},
		template: Handlebars.compile( $('#add-list-template').html()),
		initialize: function()
		{
			this.render();
		},
		render: function()
		{
			$(this.el).html(this.template());
		},
		AddList: function(e)
		{
			e.preventDefault();
			e.stopPropagation();
			var listName = $("#ListName").val();
			var list = new app.ListModel({name: listName});
			
			list.save({
				success: function()
				{
					new app.MainView({model: app.List});
				}
			});
		}
	})
})(jQuery);