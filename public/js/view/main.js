var app = app || {};

(function($)
{
	app.MainView = Backbone.View.extend(
	{
		el: "#app",
		template: Handlebars.compile( $('#main-template').html() ),
		initialize: function()
		{
			this.timer = setInterval(function() {
			      app.List.fetch()
			 }, 2000);

			this.listenTo(app.List, 'add', this.render);
		},
		render: function()
		{
			var List = app.List.toJSON();

			this.$el.html(this.template({
				list: List
			}));
		},
		close: function() {
		   clearInterval(this.timer);
		}
	});
})(jQuery);