var app = app || {};


(function()
{
	var listCollection = Backbone.Collection.extend({
		model: app.List,
		url: '/list'
	});

	app.ListCollection = new listCollection();
})();