var app = app || {};

(function(){
	// new app.MainView({model: app.List});
	new app.HeaderMenu({model: app.List});
	new app.ReadTask({model: app.Tasks});
})();