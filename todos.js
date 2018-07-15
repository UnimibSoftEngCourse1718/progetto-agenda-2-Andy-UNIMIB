// ======================================================================
function	reloadTodos ()
{
  console.log ('activities reloadTodos for user: ['+ Agenda_OK.authuser +']');

  if (Agenda_OK.authuser)
  {
    var	trx = Agenda_OK.DBMS.DB.transaction ('todos', 'readonly').objectStore ('todos');

    trx.openCursor ().onsuccess = function (event)
    {
      var         cursor = event.target.result;
      if (cursor)
      {   
	if (cursor.value.id >= Agenda_OK.nextTodoID)
	  Agenda_OK.nextTodoID = cursor.value.id +1;

        if (cursor.value.user == Agenda_OK.authuser)
	{
	  // console.log ("record: %o", cursor.value);
	  var	TodoData = cursor.value;
	  Agenda_OK.todos.push (TodoData);
	  // $('#activities').fullCalendar ('addTodos', TodoData, true); // scroll to the new resource?
        }
	cursor.continue (); 
      }   
      // else
        // { console.log ("No more records!"); }
    }
  }
}

/*
// ======================================================================
function	createTodo (record)
{
  var	tableName = 'events';
  console.log ('create event for user: ['+ Agenda_OK.authuser +'] - event: %o', record);

  console.log ('adding '+tableName+' data ...');
  var               trx = Agenda_OK.DBMS.DB.transaction ([tableName], 'readwrite');
  trx.oncomplete =  function (event) { console.log ('trx initialize '+tableName+' completed'); }
  trx.onerror =     function (event) { console.log ('trx initialize '+tableName+" ERROR!!!", event.target); }
  var               store = trx.objectStore (tableName);

  console.log ("record: %o", record);
  var		request = store.add (record);
  request.onsuccess = function (event) { console.log ('event added ...'); }
  request.onerror   = function (event) { console.log ("event save error: %o", event.target); }
  console.log (tableName+': sample data added ...');
}

// ======================================================================
function	updateTodo (event)
{
  var	tableName = 'events';

  console.log ('update event for user: ['+ Agenda_OK.authuser +'] - event: %o', event);
  var	trx = Agenda_OK.DBMS.DB.transaction ([tableName], 'readwrite').objectStore ('évents');
  var	request = trx.get (event.id);
  request.onerror = function (event) { alert ('failed opening store for updating record: %o', event);  };
  request.onsuccess = function (event)
  {
    // var data = event.target.result;	// Get the old value that we want to update
    // data.age = 42;			// update the value(s) in the object that you want to change

    // Put this updated object back into the database.
    var		requestUpdate = trx.put (event);
    requestUpdate.onerror = function (event) { alert ('failed updating record: %o', event);  };
    requestUpdate.onsuccess = function (event)
    {
      console.log ('event updated: %o', event);
    };
  };
}
*/
