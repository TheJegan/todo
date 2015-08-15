var app = app || {};

(function($)
{
	app.HeaderMenu = Backbone.View.extend({
		el: '#header',
		template: Handlebars.compile( $('#main-template').html() ),
		events: {
			'click #sync': 'sync',
			'click .deleteList': 'delete'
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
		delete: function(e)
		{
			var self = this;
			var id = $(e.target).attr('id');
			var listName = $(e.target).next().text();

			$('#myModal')
			.find('.modal-body')
			.html('<p> Are you sure you want to delete <strong>' + listName + '</strong>?</p>');

			$('#myModal').modal({
			  keyboard: false
			});


			$('#yes').unbind('click').click(function(e)
			{
				$('#myModal').modal('hide')
				self.deleteList(id);
				// console.log(id);
			});
		},

		deleteList: function(id)
		{
			var list = this.model.get(id);
			list.destroy();
		}, 
		render: function()
		{
			var list = this.model.toJSON();
			$(this.el).html( this.template({list: list, user: app.User.toJSON()[0]}) );
		}
	});
})(jQuery);