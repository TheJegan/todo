var app = app || {};

(function($)
{
	app.MainView = Backbone.View.extend(
	{
		el: 'body',
		template: Handlebars.compile( $('#main-template').html() ),
		initialize: function()
		{
			var self = this;
			app.List.fetch({
				success: function(a,b,c)
				{
					self.render();
				}
			});
			//this.listenTo(app.List, 'change', this.test)
			// this.render();
		},
		render: function()
		{

			var self = this;
			var List = app.List.toJSON();

			$(this.el).html(this.template({
				list: List
			}));
		}
	});
})(jQuery);