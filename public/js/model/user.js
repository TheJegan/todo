var app = app || {};

(function(){
	app.UserModel = Backbone.Model.extend({
		defaults : {
			'_id': null,
			'username': ''
		},
		idAttribute: '_id',
		initialize: function()
		{
			
		}
	});
})();