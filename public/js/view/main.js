var app = app || {};

(function($)
{
	app.MainView = Backbone.View.extend(
	{
		el: "#todo-body",
		template: Handlebars.compile( $('#list-template').html() ),
		initialize: function()
		{
			this.listenTo(this.model, 'reset', this.render);
			this.model.fetch({reset: true});
			this.render();
			
		},
		render: function()
		{
			if(app.FrmHeader){ app.FrmHeader.close(); }

			app.FrmHeader = new app.HeaderMenu({model: app.List, syncModel: this.model});
			var list = this.template({list: this.model.toJSON()});
			$(this.el).html(list);
		},
		close: function()
		{
			this.off(); 
		}
	});
})(jQuery);