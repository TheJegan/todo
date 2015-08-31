var app = app || {};

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

(function(){

	app.User.fetch({reset: true,
		success: function(model, response, options) 
		{
			app.User.trigger('authorized');
		},
		error: function(a,b,c)
		{
			app.User.trigger('not_authorized');
		}
	});

	app.User.on('authorized', function()
	{		
		app.List.fetch({reset: true});
		app.Tasks.fetch({reset: true});

		if(app.FrmMain){app.FrmMain.close();}
		app.FrmMain = new app.MainView({model: app.List});
	});

	app.User.on('not_authorized', function()
	{
		new app.LoginView();
	});
})();