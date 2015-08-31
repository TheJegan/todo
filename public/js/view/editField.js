var app = app || {};


(function($)
{
	app.EditText = Backbone.View.extend({
		// el: '',
		template: Handlebars.compile( $('#edit-task-template').html() ),
		events: {
			'click input': 'log'
		},
		initialize: function(option)
		{	
			this.modelId = option.ModelId;
			this.render();
		},
		render: function()
		{
			var model = this.model.get(this.modelId);
			model = model.toJSON();

			return this.template({name: model.name});
		},
		log: function(e)
		{
			console.log('input');
		}
	});
})(jQuery)