var app = app || {};

(function($)
{
	app.ReadTask = Backbone.View.extend({
		el: '#todo-body',
		template: Handlebars.compile( $('#list-template').html() ),
		events: {
			'click .checkbox': 'showMenu'
		},
		initialize: function(options )
		{
			var self = this;
			this.options = options;

			this.listenTo(self.model, 'add', this.render);
			this.listenTo(self.model, 'reset', this.render);
			this.listenTo(self.model, 'change', this.render);
			this.listenTo(self.model, 'destroy', this.render);
			this.render();
			return this;
		},
		render: function()
		{
			var task = this.model.where({_list: this.options.listId});
			

			var list = {
							id: this.options.listId, 
							tasks: _.map( task, function( model ){ return model.toJSON(); } )
						};
			$(this.el).html(
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

			$('.delete').unbind('click').click(function(e)
			{
				e.preventDefault();
				e.stopPropagation();

				//simplify
				self.deleteTodo( 
					$(this).closest('.checkbox').find('input').attr('data-id'),
					$(this).next('.taskName').text().trim()		
					);
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
		deleteTodo: function(id, taskName)
		{
			var self = this;

			$('#myModal')
			.find('.modal-body')
			.html('<p> Are you sure you want to delete <strong>' + taskName + '</strong>?</p>');

			$('#myModal').modal({
			  keyboard: false
			});


			$('#yes').unbind('click').click(function(e)
			{
				$('#myModal').modal('hide')
				self.DeleteTask(id);
				// console.log(id);
			});
		},
		DeleteTask: function(id)
		{
			var task = this.model.get(id);
			task.destroy();
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