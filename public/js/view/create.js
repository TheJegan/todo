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
			this.options = option;
			this.render();
		},
		render: function()
		{
			$(this.el).html(this.template());
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
					
				}
			});


			if(typeof self.options.listId !== 'undefined')
					{
						new app.ReadTask({listId: self.options.listId, model: app.Tasks});	
					}else
					{
						new app.MainView({model: app.Tasks})
					}
		}
	});
})(jQuery)