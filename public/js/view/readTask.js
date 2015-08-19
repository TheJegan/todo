var app = app || {};

(function($)
{
	app.ReadTask = Backbone.View.extend({
		el: '#todo-body',
		template: Handlebars.compile( $('#task-template').html() ),
		events: {
			'click .checkbox': 'showMenu'
		},
		initialize: function(options )
		{
			var self = this;
			this.options = options;

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
		}
	});
})(jQuery);