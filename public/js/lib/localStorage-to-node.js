var app = app || {};



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

function UpdateLocalStorage(data)
{
	

	//update
	//localStorage.setItem();
	//add new models using backbone js
	localStorage.clear();

	for(var i = 0; data.length; i++)
	{
		var model = new app.ListModel({_id: data[i]._id, name: data[i].name, createdOn: data[i].createdOn});
		app.List.add(model);
		model.save();	
	}

}

function Sync()
{
	// SyncList();
	// SyncTask();
	var array = [];

	for (var i = 0; i < localStorage.length; i++)
	{
		var record = localStorage.getItem(localStorage.key(i));
		try
		{
			record = JSON.parse(record);
		    array.push(record);
		}catch(ex)
		{
			console.log("invalid json");
			console.log(ex);
		}
	}

	console.log(array);

	$.ajax(
	{
		url: '/list/bulk/',
		contentType: 'application/json',
		data: JSON.stringify(array),
		type: 'POST',
		success: function(data)
		{
			console.log("success");
			
			UpdateLocalStorage(data)
			// GetTasks();
		},
		error: function(a,b,c)
		{
			console.log('error');
		}
	});
}
