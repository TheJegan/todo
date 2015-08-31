var app = app || {};

(function($)
{
	app.ReadTask = Backbone.View.extend({
		el: '#todo-body',
		template: Handlebars.compile( $('#read-task-template').html() ),
		events: {
			'click .checkbox': 'showMenu',
			'click .taskName': 'EditTask',
			'click #done': 'UpdateTask'
		},
		initialize: function(options )
		{
			var self = this;
			this.options = options;

			this.listenTo(self.model, 'add', this.render);
			this.listenTo(self.model, 'change', this.render);
			this.listenTo(self.model, 'destroy', this.render);
			
			this.render();
			
		},
		render: function()
		{
			var task = this.model.where({_list: this.options.listId});
			var list = app.List.get(this.options.listId);

			if(app.FrmHeader){ app.FrmHeader.close(); }
			app.FrmHeader = new app.HeaderMenu({model: app.List, syncModel: this.model});

			if(list)
			{
				list = list.toJSON();	
				var list_template = {
						id: this.options.listId, 
						tasks: _.map( task, function( model ){ return model.toJSON(); } ),
						listName: list.name,
						listId: this.options.listId
					};
				this.CheckForOpenTasks();
				$(this.el).html('');
				$(this.el).html(
					this.template(list_template)
				);

				this.trigger('rendered');
			}
		},
		CheckForOpenTasks: function()
		{
			this.UpdateTask();
		},
		EditTask: function(e)
		{
			var self =this;
			var TaskId = $(e.target).data('id');
			
			this.on('rendered', function()
			{
				console.log('rendered');
				var input = new app.EditText({ModelId: TaskId, model: self.model}).render();
				input = $(input).data('id', TaskId);

				var $task = $('#' + TaskId);
				$task.find('.taskName').hide()
				$task.find('label').append(input);

				$('#done').show();

				this.off('rendered');
			})

			
		},
		Edit: function()
		{

		},
		UpdateTask: function(e)
		{
			var $task = $('#editModel');
			var taskModel = this.model.get($task.data('id'));
			var self = this;

			if(taskModel)
			{
				taskModel.set(
				{
					name: $task.val().trim()
				});

				taskModel.save(null,{
					success: function(model, response)
					{
						self.model.fetch();
					}});
			}
		},
		close: function() {	      
       		this.$el.off(); 
	    }
	});
})(jQuery);