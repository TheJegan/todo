//Purpose to extend Backbone.localStorage.js
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

Backbone.Todo = []
Backbone.Todo.LocalStorage = function(name, serializer)
{
	var self = this;
	self.name = name;
	Backbone.LocalStorage.apply(this,arguments);
	this.destroy = function(model)
	{
		self.destroyTemp(model);
		Backbone.LocalStorage.prototype.destroy.call(this, model);
	}

	this.destroyTemp = function(model)
	{
		//flag for deletion
		// console.log('destroyTemp');
		var m = model.toJSON();
		m.isDelete = true;
		var listName = 'Delete-' + self.name + '-'+ m._id;


		if(localStorage.getItem(listName) === null)
		{
			localStorage.setItem(listName, JSON.stringify(m));
		}
	}
}

Backbone.Todo.LocalStorage.prototype = Backbone.LocalStorage.prototype; //hack
Backbone.Todo.LocalStorage.prototype.constructor = Backbone.Todo.LocalStorage;
// var tmpDestroy
// Backbone.LocalStorage.prototype.destroy

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

