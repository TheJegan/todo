var app = app || {};

(function($)
{
	app.UpdateTask = Backbone.View.extend({
		el: '#todo-body',
		template: Handlebars.compile($('#update-template').html()),
		initialize: function(options)
		{	
			this.taskId = options.taskId;
			
			this.listenTo(this.model, 'add', this.render);
			this.listenTo(this.model, 'reset', this.render);

			this.render();
		},
		render: function()
		{
			var task = this.model.get(this.taskId).toJSON();
			$(this.el).html(this.template({name: task.name}));
		}
	});
})(jQuery);