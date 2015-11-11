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


function UpdateTaskLocalStore(TaskIDCollection, data)
{
	for(var i = 0; i < TaskIDCollection.length; i++)
	{
		var id = TaskIDCollection[i];
		var tasks = app.Tasks.get( id );
		tasks.destroy();
	}

	for(var i = 0; i < data.length; i++)
	{
		var model = new app.TaskModel({_id: data[i]._id, name: data[i].name, createdOn: data[i].createdOn, _list: data[i]._list});
		app.Tasks.add(model);
		model.save();	
	}
}

function UpdateListLocalStore(ListIdCollection, data)
{
	for(var i = 0; i < ListIdCollection.length; i++)
	{
		var id = ListIdCollection[i];
		var list = app.List.get( id );
		list.destroy();
	}

	for(var i = 0; i < data.length; i++)
	{
		var model = new app.ListModel({_id: data[i]._id, name: data[i].name, createdOn: data[i].createdOn});
		app.List.add(model);
		model.save();	
	}
}

function Sync()
{
	var arrayOfLists = [];
	var arrayOfTasks = [];

	if(localStorage.length === 0)
	{
		$.ajax(
		{
			url: '/batch',
			contentType: 'application/json',		
			type: 'GET',
			success: function(data)
			{
				console.log("success");
				
				UpdateListLocalStore([], data.lists);
				UpdateTaskLocalStore([], data.tasks);
			},
			error: function(a,b,c)
			{
				console.log('error');
			}
		});

		return
	}
	//get all List ID's, add to collection
	//collection of all list to be removed
	var ListIDs = localStorage.getItem('List');
	ListIDs = ListIDs.split(',');


	for (var i = 0; i < ListIDs.length; i++)
	{
		var record = localStorage.getItem('List-' + ListIDs[i]);
		try
		{
			record = JSON.parse(record);
		    arrayOfLists.push(record);
		}catch(ex)
		{
			console.log("invalid json");
			console.log(ex);
		}
	}
	
	//get all task ID's, add to collection
	//collection of all tasks to be removed
	var TaskIDs = localStorage.getItem('Task');
	TaskIDs = TaskIDs.split(',')

	for (var i = 0; i < TaskIDs.length; i++)
	{
		var record = localStorage.getItem('Task-' + TaskIDs[i]);
		try
		{
			record = JSON.parse(record);
		    arrayOfTasks.push(record);
		}catch(ex)
		{
			console.log("invalid json");
			console.log(ex);
		}
	}

	$.ajax(
	{
		url: '/batch',
		contentType: 'application/json',
		data: JSON.stringify({lists: arrayOfLists, tasks: arrayOfTasks}),
		type: 'POST',
		success: function(data)
		{
			console.log("success");
			
			UpdateListLocalStore(ListIDs, data.lists);
			UpdateTaskLocalStore(TaskIDs, data.tasks);
		},
		error: function(a,b,c)
		{
			console.log('error');
		}
	});

	
}
