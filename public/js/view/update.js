var app = app || {};

(function($)
{
	app.Update = Backbone.View.extend({
		el: '#todo-body',
		events: {
			'click #update': 'updateModel',
			'click #delete': 'deleteModel'
		},
		template: Handlebars.compile($('#update-template').html()),
		initialize: function(options)
		{	
			this.modelId = options.modelId;
			
			this.listenTo(this.model, 'add', this.render);
			this.listenTo(this.model, 'reset', this.render);

			this.render();
		},
		render: function()
		{
			var task = this.model.get(this.modelId).toJSON();
			$(this.el).html(this.template({name: task.name}));
		},
		updateModel: function()
		{
			var model = this.model.get(this.modelId);
			model.set(
			{
				name: $('#model_name').val()
			})
			model.save();
		},
		deleteModel: function()
		{
			var model = this.model.get(this.modelId);
			model.destroy(
			{
				success: function(a,b,c)
				{
					console.log('success');
				}
			})
		}
	});
})(jQuery);