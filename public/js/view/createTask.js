var app = app || {};

(function($){
	app.Task = Backbone.View.extend({
		el: '#todo-view',
		listId: 0, //hack
		events: {
			'click #btnAddList': 'AddTask'
		},
		template: Handlebars.compile( $('#add-list-template').html() ),
		initialize: function(options)
		{
			this.options = options
			this.render();
		},
		render: function()
		{
			$(this.el).html( this.template() );
		},
		AddTask: function()
		{
			var taskName = $('#ListName').val();

			var list = new app.TaskModel({name: taskName});
			list.urlRoot += '/' + this.options.listId;
			list.save();
		}
	});
})(jQuery);