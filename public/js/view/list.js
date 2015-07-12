var app = app || {};

(function($)
{
	app.ListView = Backbone.View.extend({
		el: '#todo-view',
		template: Handlebars.compile( $('#list-template').html()   ),
		initialize: function()
		{
			var self = this;
			this.render();
		},
		events: {     
	      // 'click .radio': 'ShowMenu'
	      // 'click body': 'HideMenu'
	    },
		render: function()
		{
			var self = this;
			var list = this.model.toJSON()[0];
			//todo figure out why this.el isnt working
			this.$el.html( this.template({ name: list.name, tasks: list.tasks }));



			//still figuring out eventing
			this.BindEvents();
			
		},
		BindEvents: function()
		{
			var self= this;
			$('#addTask').keydown(function(e)
			{
				if(e.keyCode === 13)
				{
					var taskName = $(this).val();
					// var List = app.List.get('');

					// app.List.add(new )
					var ListId = self.model.toJSON()[0]._id;
					var List = app.List.get(ListId);

					var tasks = List.get('tasks');
					tasks.push({name: taskName});
					List.set({tasks: tasks});
					List.save();

					// List.tasks.add(taskName);
					// List.collection.add()

					console.log( List);
				}
			});

			$('.radio').click(function(e)
				{{
					e.preventDefault();
					e.stopPropagation();
					self.ShowMenu();
				}});

			$('body').click(function(e)
			{
				self.HideMenu();
			});
		},
		ShowMenu: function()
		{
			var HeightOfEachMenuItem = 50;

	    	var menuHeight = $('.menuItem').length * HeightOfEachMenuItem;
			var $menu = $('footer');
	
			$menu.animate({
		        height: menuHeight
		    }, 350);
		},
		HideMenu: function()
		{
			var $menu = $('footer');
			$menu.animate({
		        height: 0
		    }, 350);
		}
	});
})(jQuery);