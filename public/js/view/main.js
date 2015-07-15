var app = app || {};

(function($)
{
	app.MainView = Backbone.View.extend(
	{
		el: "#app",
		template: Handlebars.compile( $('#main-template').html() ),
		initialize: function()
		{
			this.listenTo(this.model, 'reset', this.render);
			this.model.fetch({reset: true});
			
			this.render();
		},
		render: function()
		{
			var List = this.model.toJSON();

			this.$el.html(this.template({
				list: List
			}));
		},
		close: function() {
		   // clearInterval(this.timer);
		}
	});
})(jQuery);