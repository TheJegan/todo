var app = app || {};

(function($)
{
	app.ReadTask = Backbone.View.extend({
		el: '#todo-body',
		template: Handlebars.compile( $('#task-template').html() ),
		events: {
			'click .checkbox': 'showMenu',
			'click .taskName': 'EditTask',
			'click #done': 'UpdateTask'
		},
		initialize: function(options )
		{
			var self = this;
			this.options = options;
			app.sync();

			this.listenTo(self.model, 'add', this.render);
			this.listenTo(self.model, 'reset', this.render);
			this.listenTo(self.model, 'change', this.render);
			this.listenTo(self.model, 'destroy', this.render);
			this.render();
			return this;
		},
		render: function()
		{
			var task = this.model.where({_list: this.options.listId});
			var list = app.List.get(this.options.listId).toJSON();

			var list_template = {
					id: this.options.listId, 
					tasks: _.map( task, function( model ){ return model.toJSON(); } ),
					listName: list.name,
					listId: this.options.listId
				};

			$(this.el).html(
				this.template(list_template)
			);
		},
		EditTask: function(e)
		{
			//save everything that was previousely opened and the
			//$('.taskName').show()
			app.sync();

			var TaskId = $(e.target).prev('input').data('id');
			var input = new app.EditText({ModelId: TaskId, model: this.model}).render();
			input = $(input).data('id', TaskId);

			var $task =$(e.target).closest('.task');
			$task.find('.taskName').hide()
			$task.find('label').append(input);

			$('#done').show();
		},
		UpdateTask: function(e)
		{
			var $task = $('#editModel');


			var taskModel = this.model.get($task.data('id'));
			taskModel.set(
			{
				name: $task.val().trim()
			});
			taskModel.save({success: function()
				{
					app.sync();
				}});
			console.log('done');
		}
	});
})(jQuery);