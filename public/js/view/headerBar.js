var app = app || {};

(function($)
{
	app.HeaderMenu = Backbone.View.extend({
		el: '#header',
		template: Handlebars.compile( $('#main-template').html() ),
		initialize: function()
		{
			var self = this;
			this.listenTo(this.model, 'reset', this.render);


			setInterval(function()
			{
				self.model.fetch({reset: true});
			}, 10 * app.sec);
			this.render();
		},
		render: function()
		{
			var list = this.model.toJSON();
			$(this.el).html( this.template({list: list}) );
		}
	});
})(jQuery);