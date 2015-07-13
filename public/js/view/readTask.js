var app = app || {};

(function($)
{
	app.readTask = Backbone.View.extend({
		el: '#todo-view',
		template: Handlebars.compile( $('#list-template').html() ),
		listId: 0,
		initialize: function(options )
		{
			var self = this;
			this.options = options;
			app.Tasks.url = '/task/' + options.listId;

			app.Tasks.fetch(
			{
				success: function(a,b,c)
				{
					self.render();
				}
			});

			return this;
		},
		render: function()
		{

			var list = {id: this.options.listId, tasks: app.Tasks.toJSON()};

			$(this.el).html(
				this.template(list)
			);

			// return this;
		}

	});
})(jQuery);