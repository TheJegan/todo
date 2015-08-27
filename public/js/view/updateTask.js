var app = app || {};

(function($)
{
	app.UpdateTask = Backbone.View.extend({
		el: "#todo-body",
		template: Handlebars.compile( $('#move-task-template').html() ),
		events: {
			'click a': 'MoveTask'
		},
		initialize: function(option)
		{
			this.options = option;
			this.listenTo(this.model, 'reset', this.render);
			this.model.fetch({reset: true});
			this.render();
			
		},
		render: function()
		{
			if(app.FrmHeader){ app.FrmHeader.close(); }

			app.FrmHeader = new app.HeaderMenu({model: app.List, syncModel: this.model});

			var list = this.template({list: this.model.toJSON()});
			$(this.el).html(list);
		},
		MoveTask: function(e)
		{
			var listId = $(e.target).data('id');
			var id = this.options.modelId;
			var task = app.Tasks.get(id);

			task.set({
				_list: listId
			});

			task.save({
				success: function()
				{
					app.Tasks.fetch({reset: true});
					console.log('success');
				}
			});

		},
		close: function()
		{
			this.off(); 
		}
	});
})(jQuery);