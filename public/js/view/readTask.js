var app = app || {};

(function($)
{
	app.ReadTask = Backbone.View.extend({
		el: '#todo-body',
		template: Handlebars.compile( $('#list-template').html() ),
		events: {
			// 'click .menuItem': "moveToList",
			'click .checkbox': 'showMenu'
		},
		initialize: function(options )
		{
			var self = this;
			this.options = options;
			this.model.url =  '/task/' + options.listId;
			this.listenTo(self.model, 'add', this.render);
			this.listenTo(self.model, 'reset', this.render);
			this.listenTo(self.model, 'change', this.render);
			this.render();

			this.model.fetch({reset: true});
			return this;
		},
		render: function()
		{
			var list = {id: this.options.listId, tasks: this.model.toJSON()};
			$("#todo-view").html(
				this.template(list)
			);


			var self =this;
			$('.menuItem').unbind('click').click(function(e)
			{
				// self.moveToList(e);
				var listId = $(this).attr('data-id');
				var taskId = $('input:checked').attr('data-id');

				 self.moveToList(listId, taskId);
			});
			return this;
		},
		moveToList: function(listId, taskId)
		{
			var self = this;
			var task = this.model.get(taskId);
			task.set({_list: listId});		
			task.save(null,
			{
				success: function() 
				{
					self.model.fetch({reset: true});
		        }
		    });

		},
		showMenu: function(e)
		{
			var HeightOfEachMenuItem = 50;

	    	var menuHeight = $('.menuItem').length * HeightOfEachMenuItem;
			var $menu = $('footer');
	
			$menu.animate({
		        height: menuHeight
		    }, 350);

		},
		close: function() {
		   clearInterval(this.timer);
		}
	});
})(jQuery);