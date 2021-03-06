var app = app || {};

(function($)
{
	app.MenuView = Backbone.View.extend({
		el: '#menu',
		template: Handlebars.compile( $('#menu-template').html()),
		initialize: function()
		{
			this.listenTo(this.model, 'add', this.render);
			this.render();
		},
		render: function()
		{
			var list = this.model.toJSON();
			$(this.el).html( this.template({list: list}) );
		}	

	});
})(jQuery)