var app =  app || {};

(function($)
{
	app.CreateTask = Backbone.View.extend({
		el: '#todo-body',
		template: Handlebars.compile( $('#add-template').html() ),
		events: {
			'click #btnAdd': 'AddModel'
		},
		initialize: function(option)
		{
			this.options = option;
			this.render();		
		},
		render: function()
		{
			$(this.el).html(this.template({model: this.options.modelName}));
		},
		AddModel: function(e)
		{
			e.preventDefault();
			e.stopPropagation();

			var self = this;
			var name = $('#modelName').val();
			var TaskId = guid();
			var model = new this.model({_id: TaskId, name: name, _list: this.options.listId});

			app.Tasks.add(model);
			app.router.navigate('/list/'+ self.options.listId);	

			if(typeof app.FrmReadTask !== 'undefined'){app.FrmReadTask.close()}
			app.FrmReadTask = new app.ReadTask({listId: this.options.listId, model: app.Tasks});
		},
		close: function() {	      
       		this.$el.off(); 
	    }
	});
})(jQuery)