var app = app || {};


(function($)
{
	app.addList = Backbone.View.extend(
	{
		el: '#todo-view',
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
		AddList: function()
		{
			// console.log("add list");
			var listName = $("#ListName").val();
			var list = new app.ListModel({name: listName});

			// console.log(list);
			// app.List.add(list);

			list.save();

		}
	})
})(jQuery);