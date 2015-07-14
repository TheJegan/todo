var app = app || {};

(function($)
{
	app.readTask = Backbone.View.extend({
		el: '#todo-view',
		template: Handlebars.compile( $('#list-template').html() ),
		listId: 0,
		initialize: function(options )
		{
			var self = this;
			this.options = options;
			app.Tasks.url = '/task/' + options.listId;

			// app.Tasks.fetch(
			// {
			// 	success: function(a,b,c)
			// 	{
			// 		self.render();
			// 	}
			// });
			// $(this.el).html('');			
			// window.setInterval(app.Tasks.fetch, 2000);
			// $(this.el).append(' <a href="#/list/'÷ +options.listId+'/addTask/" style="font-size: 20px"> +Task </a>');
			 this.timer = setInterval(function() {
			      app.Tasks.fetch()
			 }, 2000);

			this.listenTo(app.Tasks, 'add', this.render);
			this.listenTo(app.Tasks, 'change', this.render);
			return this;
		},
		render: function()
		{

			var list = {id: this.options.listId, tasks: app.Tasks.toJSON()};

			$("#todo-view").html(
				this.template(list)
			);

			return this;
		},
		renderRow: function()
		{
			// $(this.el).html('');
			var self= this;
			_.each(app.Tasks.models, function(data) {

	           // $(self.el).append( this.template({name: data.attributes.name})  );
	           $("#todo-view").append( this.template({name: data.attributes.name})  );

	        }, this);
			console.log('render');
	        return this;
		},
		reRenderRow: function()
		{

		},
		close: function() {
		   clearInterval(this.timer);
		}

	});
})(jQuery);