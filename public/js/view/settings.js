// var app = app || {};

// (function($)
// {
// 	app.Settings = Backbone.View.extend({
// 		el: '#todo-body',
// 		template: Handlebars.compile( $('#settings-template').html() ),
// 		events : {
// 			'keydown #interval': 'updateSettings'
// 		},
// 		initialize: function()
// 		{
// 			this.render();
// 		},
// 		render: function()
// 		{
// 			$(this.el).html( this.template({seconds: app.sec }) );
// 		},
// 		updateSettings: function(e)
// 		{
// 			app.sec = parseInt( $( e.currentTarget ).val() );
// 			app.router.navigate("/", true);
// 		}
// 	});
// })(jQuery);