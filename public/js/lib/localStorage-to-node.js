//Purpose to extend Backbone.localStorage.js

Backbone.Todo = []
Backbone.Todo.LocalStorage = function()
{
	this.create = function(model)
	{
		Backbone.LocalStorage.prototype.create.call(this, model);
	}

	this.update = function(model)
	{
		Backbone.LocalStorage.prototype.update.call(this, model);
	}

	this.destroy = function(model)
	{
		console.log('destroy');
		Backbone.LocalStorage.prototype.destroy.call(this, model);
	}
}

Backbone.Todo.LocalStorage.prototype = new Backbone.LocalStorage();
Backbone.Todo.LocalStorage.prototype.constructor = Backbone.Todo.LocalStorage;


function SyncList()
{
	var collection = new Backbone.LocalStorage("List");
	collection = collection.findAll();


	function GetList()
	{
		//clear out backbone collection and populate
		$.ajax(
		{
			url: '/list',
			contentType: 'application/json',
			type: 'GET',
			success: function(data)
			{
				collection = new Backbone.LocalStorage("List");
				while ( model=collection.shift() )
				{ 
					model.destroy();
				}

				for(var i = 0; i < data.length; i++)
				{
					var model = new app.ListModel({_id: listId, name: name});
					app.List.add(model);	
					model.save();
				}
			},
			error: function(a,b,c)
			{
				console.log('error');
			}
		});
	}

	$.ajax(
	{
		url: '/list',
		contentType: 'application/json',
		data: JSON.stringify(collection),
		type: 'POST',
		success: function(data)
		{
			console.log("success");
			GetList();
		},
		error: function(a,b,c)
		{
			console.log('error');
		}
	});
}

function SyncTask(id)
{
	var collection = new Backbone.LocalStorage("Task");
	collection = collection.findAll();	

	function GetTasks()
	{
		//clear out backbone collection and populate
	}

	$.ajax(
	{
		url: '/list/' + id,
		contentType: 'application/json',
		data: JSON.stringify(collection),
		type: 'POST',
		success: function(a, b,c)
		{
			console.log("success");
			GetTasks();
		},
		error: function(a,b,c)
		{
			console.log('error');
		}
	});
}

function Sync()
{
	// SyncList();
	// SyncTask();
	
}

