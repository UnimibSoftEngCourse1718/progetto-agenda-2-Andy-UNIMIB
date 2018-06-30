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
    // var	filter = IDBKeyRange.only (Agenda_OK.authuser);

    // trx.openCursor (filter).onsuccess = function (event)
    trx.openCursor ().onsuccess = function (event)
    {
      var         cursor = event.target.result;
      if (cursor)
      {   
        if (cursor.value.user == Agenda_OK.authuser)
	{
	  console.log ("record: %o", cursor.value);
	  // Agenda_OK [tableName].push (cursor.value);
	  var	eventData = { title: cursor.value.title, start: cursor.value.start, end: cursor.value.end };
	  $('#calendar').fullCalendar ('renderEvent', eventData, true); // stick? = true
        }
	cursor.continue (); 
      }   
      // else
        // { console.log ("No more records!"); }
    }
  }
}
