'use strict';

// ======================================================================
var	Agenda_OK =
{
  DatabaseName :	 'Agenda-OK',
  DatabaseVersion :	 1,
  DatabaseInitialized :	 false,
  DBMS :	 	null,
  authuser :		'',
  users :	 	[],
  events :	 	[],
  nextEventID :		1,
  calendar :		[],
};

console.log ('AGENDA_OK');

// ======================================================================
function	reloadEvents ()
{
  console.log ('calendar reloadEvents for user: ['+ Agenda_OK.authuser +']');

  if (Agenda_OK.authuser)
  {
    var	calendar = $('#calendar').fullCalendar ('getCalendar');

    var	trx = Agenda_OK.DBMS.DB.transaction ('events', 'readonly').objectStore ('events');

    trx.openCursor ().onsuccess = function (event)
    {
      var         cursor = event.target.result;
      if (cursor)
      {   
	if (cursor.value.id >= Agenda_OK.nextEventID)
	  Agenda_OK.nextEventID = cursor.value.id +1;

        if (cursor.value.user == Agenda_OK.authuser)
	{
	  console.log ("record: %o", cursor.value);
	  var	eventData = cursor.value;
	  $('#calendar').fullCalendar ('renderEvent', eventData, true); // stick? = true
        }
	cursor.continue (); 
      }   
      // else
        // { console.log ("No more records!"); }
    }
  }
}

// ======================================================================
function	createEvent (record)
{
  var	tableName = 'events';
  console.log ('calendar create event for user: ['+ Agenda_OK.authuser +'] - event: %o', record);

  console.log ('adding '+'events'+' data ...');
  var               trx = Agenda_OK.DBMS.DB.transaction (['events'], 'readwrite');
  trx.oncomplete =  function (event) { console.log ('trx initialize '+'events'+' completed'); }
  trx.onerror =     function (event) { console.log ('trx initialize '+'events'+" ERROR!!!", event.target); }
  var               store = trx.objectStore ('events');

  console.log ("record: %o", record);
  var		request = store.add (record);
  request.onsuccess = function (event) { console.log ('event added ...'); }
  request.onerror   = function (event) { console.log ("event save error: %o", event.target); }
  console.log ('events'+': sample data added ...');
}

// ======================================================================
function	updateEvent (event)
{
  console.log ('calendar update event for user: ['+ Agenda_OK.authuser +'] - event: %o', event);
  var	trx = Agenda_OK.DBMS.DB.transaction (['events'], 'readwrite').objectStore ('évents');
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
