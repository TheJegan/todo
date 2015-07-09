var app = app || {};

(function($)
{
	app.ListView = Backbone.View.extend({
		el: 'body',
		template: Handlebars.compile( $('#list-template').html()   ),
		initialize: function()
		{
			var self = this;
			this.render();
			
		},
		render: function()
		{
			//test
			var list = this.model.toJSON()[0];
			$(this.el).html( this.template({ name: list.name, tasks: list.tasks }));
		},
		test: function()
		{
			console.log('filter');
		}
	});
})(jQuery);