var app =  app || {};

(function($)
{
	app.Create = Backbone.View.extend({
		el: '#todo-body',
		template: Handlebars.compile( $('#add-template').html() ),
		events: {
			'click #btnAdd': 'AddModel'
		},
		initialize: function(option)
		{
			if(option)
			{
				this.options = option;
				this.render();	
			}			
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
			var model = new this.model({name: name});

			if(typeof this.options.listId !== 'undefined')
			{
				model.urlRoot += '/' + this.options.listId;
			}
			
			model.save({
				success:function()
				{
					console.log('success');
				},
				error: function(a, b, c)
				{
					console.log(b);
				}
			});


			if(typeof self.options.listId !== 'undefined')
			{
				app.router.navigate('/list/'+ self.options.listId);
				new app.ReadTask({listId: self.options.listId, model: app.Tasks});	
			}else
			{
				app.router.navigate('/');
				new app.MainView({model: app.List});
			}
		},
		close: function() {	      
       		this.$el.off(); 
	    }
	});
})(jQuery)