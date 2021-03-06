var app = app || {};

(function($)
{
	app.UpdateTask = Backbone.View.extend({
		el: "#todo-body",
		template: Handlebars.compile( $('#move-task-template').html() ),
		events: {
			'click a': 'moveTask',
			'click delete': 'deleteTask'
		},
		initialize: function(option)
		{
			this.options = option;
			this.render();
			
		},
		render: function()
		{
			if(app.FrmHeader){ app.FrmHeader.close(); }

			app.FrmHeader = new app.HeaderMenu({model: app.List, syncModel: this.model});

			var list = this.template({list: this.model.toJSON()});
			$(this.el).html(list);
		},
		moveTask: function(e)
		{
			var listId = $(e.target).data('id');
			var id = this.options.modelId;
			var task = app.Tasks.get(id);

			task.set({
				_list: listId
			});

			task.save();
		},
		deleteTask: function(e)
		{
			var id = this.options.modelId;
			var task = app.Tasks.get(id);

			task.destroy();
		},
		close: function()
		{
			this.off(); 
		}
	});
})(jQuery);