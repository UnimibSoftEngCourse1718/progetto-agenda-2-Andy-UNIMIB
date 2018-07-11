// ======================================================================
function	reloadCategories ()
{
  console.log ('reloadCategories for user: ['+ Agenda_OK.authuser +']');

  if (Agenda_OK.authuser)
  {
    // var	calendar = $('#calendar').fullCalendar ('getCalendar');

    var	trx = Agenda_OK.DBMS.DB.transaction ('categories', 'readonly').objectStore ('categories');

    trx.openCursor ().onsuccess = function (event)
    {
      var         cursor = event.target.result;
      if (cursor)
      {   
	if (cursor.value.ID >= Agenda_OK.nextCategoryID)
	  Agenda_OK.nextCategoryID = cursor.value.ID +1;

        if (cursor.value.user == Agenda_OK.authuser)
	{
	  console.log ("record: %o", cursor.value);
	  var	catData = cursor.value;
	  // $('#calendar').fullCalendar ('renderCategory', catData, true); // stick? = true
	  addCategoryRow (cursor.value);
        }
	cursor.continue (); 
      }   
      // else
        // { console.log ("No more records!"); }
    }
  }
}

// ======================================================================
function	createCategory (record)
{
  var	tableName = 'categories';
  console.log ('create category for user: ['+ Agenda_OK.authuser +'] - category: %o', record);

  console.log ('adding '+tableName+' data ...');
  var               trx = Agenda_OK.DBMS.DB.transaction ([tableName], 'readwrite');
  trx.oncomplete =  function (event) { console.log ('trx initialize '+tableName+' completed'); }
  trx.onerror =     function (event) { console.log ('trx initialize '+tableName+" ERROR!!!", event.target); }
  var               store = trx.objectStore (tableName);

  console.log ("record: %o", record);
  var		request = store.add (record);
  request.onsuccess = function (event) { console.log ('category added ...'); }
  request.onerror   = function (event) { console.log ("category save error: %o", event.target); }
  console.log (tableName+': sample data added ...');
}

// ======================================================================
function	updateCategory (record)
{
  var	tableName = 'categories';

  console.log ('update category for user: ['+ Agenda_OK.authuser +'] - category: %o', record);
  var	trx = Agenda_OK.DBMS.DB.transaction ([tableName], 'readwrite').objectStore (tableName);
  var	request = trx.get (record.ID);
  request.onerror = function (event) { alert ('failed opening store for updating record: %o', event);  };
  request.onsuccess = function (event)
  {
    // var data = event.target.result;	// Get the old value that we want to update
    // data.age = 42;			// update the value(s) in the object that you want to change

    // Put this updated object back into the database.
    var		requestUpdate = trx.put (record);
    requestUpdate.onerror = function (event) { alert ('failed updating record: %o', event);  };
    requestUpdate.onsuccess = function (event)
    {
      console.log ('category updated: %o', record);
    };
  };
}
