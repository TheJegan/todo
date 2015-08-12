var app = app || {};

(function($)
{
	app.HeaderMenu = Backbone.View.extend({
		el: '#header',
		template: Handlebars.compile( $('#main-template').html() ),
		events: {
			'click #sync': 'sync'
		},
		initialize: function()
		{
			var self = this;
			
			this.listenTo(app.User, 'reset', this.render);
			this.listenTo(this.model, 'add', this.render);
			this.listenTo(this.model, 'reset', this.render);
			this.render();
		},
		sync: function()
		{
			app.Tasks.fetch({reset: true});
			app.List.fetch({reset: true});
		},
		render: function()
		{
			var list = this.model.toJSON();
			$(this.el).html( this.template({list: list, user: app.User.toJSON()[0]}) );
		}
	});
})(jQuery);