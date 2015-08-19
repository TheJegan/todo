var app = app || {};

(function($)
{
	app.MainView = Backbone.View.extend(
	{
		el: "#todo-body",
		template: Handlebars.compile( $('#list-template').html() ),
		initialize: function()
		{
			// this.listenTo(this.model, 'reset', this.render);
			this.render();
		},
		render: function()
		{
			var list = this.template({list: this.model.toJSON()});
			$(this.el).html(list);
		}
	});
})(jQuery);