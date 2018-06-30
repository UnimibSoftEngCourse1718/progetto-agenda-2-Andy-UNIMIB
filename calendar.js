
    // ------------- calendar ----------------
    var		today = new Date();
    var		todaystr = today.toISOString ().substring (0, 10);

    // var		calendar = $('#calendar').fullCalendar ('getCalendar');
    console.log ('CALENDAR');

    $('#calendar').fullCalendar (
    {
      defaultDate: todaystr,	// '2018-06-12'
      header:
      {
        left:   'prev,next today',
        center: 'title',
        right:  'month,agendaWeek,agendaDay,listWeek'
      },
      dayClick: function (date, jsEvent, view) { alert ('a day has been clicked!' + date.format() ); },
      // navLinks: true, // can click day/week names to navigate views
      editable:   true,

      selectable: true,
      selectHelper: true,
      select: function(start, end)
      {
        var title = prompt ('Event Title:');
        var eventData;
        if (title)
	{
	  eventData = { title: title, start: start, end: end };
          $('#calendar').fullCalendar ('renderEvent', eventData, true); // stick? = true
        }
        $('#calendar').fullCalendar ('unselect');
      },

      eventLimit: true, // allow "more" link when too many events
      eventClick: function(calEvent, jsEvent, view)
      {
        alert ('Event: ' + calEvent.title +"\n"+ 'View: ' + view.name +"\n"+
			'Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
        $(this).css ('border-color', 'red');	// change the border color just for fun

        if (event.url) { window.open (event.url); return false; }
      },

      eventDrop: function(event, delta, revertFunc)
      {
        alert (event.title + " was dropped on " + event.start.format ());
        if (!confirm ("Are you sure about this change?"))
          { revertFunc (); }
      },

      // -------------- SAMPLE DATA ------------------
      events: [],

    });




/*
  // ======================================================================
  function	reloadEvents ()
  {
    console.log ('calenddar reloadEvents for user: ['+ Agenda_OK.authuser +']');

    if (Agenda_OK.authuser)
    {
      var	calendar = $('#calendar').fullCalendar ('getCalendar');

      var	trx = Agenda_OK.DBMS.DB.transaction ('events', 'readonly').objectStore ('events');
      var	filter = IDBKeyRange.only (Agenda_OK.authuser);

      trx.openCursor (filter).onsuccess = function (event)
      {
        var         cursor = event.target.result;
        if (cursor)
        {   
	  console.log ("record: %o", cursor.value);
	  // Agenda_OK [tableName].push (cursor.value);
	  eventData = { title: cursor.value.title, start: cursor.value.start, end: cursor.value.end };
	  $('#calendar').fullCalendar ('renderEvent', eventData, true); // stick? = true

	  cursor.continue (); 
        }   
        // else
          // { console.log ("No more records!"); }
      }
    }
  }
*/
