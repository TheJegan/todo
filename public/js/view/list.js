var app = app || {};

(function($)
{
	app.ListView = Backbone.View.extend({
		el: 'body',
		template: Handlebars.compile( $('#list-template').html()   ),
		initialize: function()
		{
			var self = this;
			app.List.fetch({
				success: function(a, b, c)
				{
					self.render();
				},
				error: function(a, b, c)
				{
					console.log(b);
				}
			})
		},
		render: function()
		{
			$(this.el).html( this.template({List: app.List.toJSON()}) );
		}
	});
})(jQuery);