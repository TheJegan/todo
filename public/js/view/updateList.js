var app = app || {};

(function($)
{
	app.UpdateList = Backbone.View.extend({
		el: '#todo-body',
		events: {
			'click #update': 'updateModel',
			'click #delete': 'deleteModel'
		},
		template: Handlebars.compile($('#update-list-template').html()),
		initialize: function(options)
		{	
			this.modelId = options.modelId;
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
			model.destroy();

			if(app.FrmMain){app.FrmMain.close();}
			app.FrmMain = new app.MainView({model: app.List});
			this.remove();
		},
		close: function() {	      
       		this.$el.off(); 
	    }
	});
})(jQuery);