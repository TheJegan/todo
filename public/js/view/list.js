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
	      'click .radio': 'ShowMenu'
	    },
		render: function()
		{
			var list = this.model.toJSON()[0];

			//todo figure out why this.el isnt working
			this.$el.html( this.template({ name: list.name, tasks: list.tasks }));
		},
		ShowMenu: function()
		{
			var HeightOfEachMenuItem = 50;
			app.Todos.models

	    	var menuHeight = app.Todos.length * HeightOfEachMenuItem;
			var $menu = $('footer');
			$menu.html('');

			for(var i=0; i < app.Todos.length; i++)
			{
				//var model = app.Todos.models[i].attributes;
				//$menu.append('<p class="text-muted">' + this.model.tasks[i].name + '</p>');
			}

			$menu.animate({
		        height: menuHeight
		    }, 350);
		}
	});
})(jQuery);