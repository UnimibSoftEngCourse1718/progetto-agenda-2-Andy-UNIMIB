
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
      editable:   true,

      dayClick: function (date, jsEvent, view)
      {
	if (!Agenda_OK.authuser)
	  alert ('user not authenticated!');
	// else
          // alert ('a day has been clicked!' + date.format ());
      },
      // navLinks: true, // can click day/week names to navigate views

      selectable: true,
      selectHelper: true,
      select: function(start, end)
      {
	if (!Agenda_OK.authuser)
	  alert ('user not authenticated!');
        else
	{
	  var	eventData = { title: '', start: start, end: end, id: Agenda_OK.nextEventID++ };
          var	rc = $("#event-dialog").data ('action', 'renderEvent').data ('calEvent', eventData).dialog ("open");
          // if (title)
            // $('#calendar').fullCalendar ('renderEvent', eventData, true); // stick? = true

	  /*
	  var title = prompt ('Event Title:');
          var eventData;
          if (title)
	  {
	    eventData = { title: title, start: start, end: end };
            $('#calendar').fullCalendar ('renderEvent', eventData, true); // stick? = true
          }
	  */
	}
        $('#calendar').fullCalendar ('unselect');
      },

      eventLimit: true, // allow "more" link when too many events
      eventClick: function (calEvent, jsEvent, view)
      {
        var	rc = $("#event-dialog").data ('action', 'updateEvent').data ('calEvent', calEvent).dialog ("open");
	// $('#calendar').fullCalendar ('updateEvent', calEvent); //, true); // stick? = true
	/*
	alert ('Event: ' + calEvent.title +"\n"+ 'View: ' + view.name +"\n"+
			'Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
        $(this).css ('border-color', 'red');	// change the border color just for fun
	*/

        if (calEvent.url) { window.open (calEvent.url); return false; }
      },

      eventDrop: function (event, delta, revertFunc)
      {
        // alert (event.title + " was dropped on " + event.start.format ());
        if (confirm ("Are you sure about this change?"))
	{
	  console.log ('EVENT DROP: MUST UPDATE DATABASE: %o', event, ' - delta: %o', delta);
	  updateEvent (event);
	}
	else
          { revertFunc (); }
      },

      // -------------- SAMPLE DATA ------------------
      events: [],

    });
