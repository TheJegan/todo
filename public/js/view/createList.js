var app =  app || {};

(function($)
{
	app.CreateList = Backbone.View.extend({
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
			var listId = guid();
			var model = new this.model({_id: listId, name: name});

			app.List.add(model);			

			app.router.navigate('/');
			
			if(app.FrmMain){app.FrmMain.close();}
			app.FrmMain = new app.MainView({model: app.List});
		},
		close: function() {	      
       		this.$el.off(); 
	    }
	});
})(jQuery)