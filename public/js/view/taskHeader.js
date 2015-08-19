var app = app || {};


(function($)
{
	app.TaskHeader = Backbone.View.extend({
		el: '#header',
		initialize: function(option)
		{
			this.options = option;
		},
		render: function()
		{
			var list = app.Tasks.get(this.options.listId);

			
		}
	});
})(jQuery)