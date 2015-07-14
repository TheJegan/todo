var app = app || {};


(function()
{
	var list = Backbone.Collection.extend({
		model: app.ListModel,
		url: '/list',
		initialize: function()
		{			
		}
	});

	app.List = new list();
})();