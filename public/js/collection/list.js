var app = app || {};


(function()
{
	var list = Backbone.Collection.extend({
		model: app.ListModel,
		url: '/list',
		initialize: function()
		{			
		}
		// ,
		// add: function(model, opts){
		// 	// console.log('add');
	 //        Backbone.Collection.prototype.add.call(this, model, opts);
	 //        console.log(model);
	 //    }
	});

	app.List = new list();
})();