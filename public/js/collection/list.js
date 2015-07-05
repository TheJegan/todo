var app = app || {};


(function()
{
	var list = Backbone.Collection.extend({
		model: app.ListModel,
		url: '/list'
	});

	app.List = new list();
})();