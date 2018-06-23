
    // ------------- scheduler ----------------
    var		currentId = 44;
    var		scheduler = $('#scheduler').fullCalendar ('getCalendar');
    $('#scheduler').fullCalendar (
    {
      locale:      'it',
      // defaultDate: '2018-05-12',
      defaultDate: todaystr,
      defaultView: 'timelineDay',
      editable:	   true,
      dayClick: function (date, jsEvent, view) { alert ('a day has been clicked!' + date.format () ); },

      // -----------
      selectable: true,
      selectHelper: true,
      select: function (start, end)
      {
        var	title = prompt ('Event Title:');
        var	eventData;
        if (title)
	{
	  alert ('view name/type:'+this.type +"\n" + (start.format ()) +' / '+ (end.format ()) + "\nuid:"+this.uid);
	  eventData = { title: title, start: start, end: end, id: 99, resourceId: 'c' }; // this.uid };
	  $('#scheduler').fullCalendar ('renderEvent', eventData, true); // stick? = true
        }
        $('#scheduler').fullCalendar ('unselect');
	return true;
      },

      // -----------
      eventLimit:  true, // allow "more" link when too many events
      eventClick: function (calEvent, jsEvent, view)
      {
        alert ('Event: ' + calEvent.title +"\n"+
      	 'View: ' + view.name +"\n"+
      	 'Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
        $(this).css ('border-color', 'red');	// change the border color just for fun

        if (event.url) { window.open (event.url); return false; }
      },

      // -----------
      eventDrop: function (event, delta, revertFunc)
      {
        alert (event.title + " was dropped on " + event.start.format ());
        if (!confirm ("Are you sure about this change?"))
          { revertFunc (); }
      },

      // -----------
      resourceLabelText: 'Attività',
      resources:
      [
        { id: 'a', title: 'Auditorium A' },
        { id: 'b', title: 'Auditorium B', eventColor: 'green' },
        { id: 'c', title: 'Auditorium C', eventColor: 'orange' },
        { id: 'd', title: 'Auditorium D', children:
					[
					  { id: 'd1', title: 'Room D1' },
					  { id: 'd2', title: 'Room D2' }
					]
	},
      ],

      // -----------
      events:
      [
        { id: '1', resourceId: 'b', start: TODAY + 'T02:00:00', end: TODAY + 'T07:00:00', title: 'event 1' },
        { id: '2', resourceId: 'c', start: TODAY + 'T05:00:00', end: TODAY + 'T22:00:00', title: 'event 2' },
        { id: '3', resourceId: 'd', start: YESTERDAY, end: TOMORROW, title: 'event 3' },
        { id: '4', resourceId: 'e', start: TODAY + 'T03:00:00', end: TODAY + 'T08:00:00', title: 'event 4' },
        { id: '5', resourceId: 'f', start: TODAY + 'T00:30:00', end: TODAY + 'T02:30:00', title: 'event 5' }
      ],

      // -----------
      header:
      {
	left:   'promptResource today prev,next',
	center: 'title',
        // right:  'month,agendaWeek,agendaDay,listWeek'
	right:  'month,agendaWeek,timelineThreeDays,timelineDay'
      },

      // -----------
      customButtons:
      {
        promptResource:
	{
          text: 'add new cat',
          click: function()
	  {
            var catname = prompt ('nuova categoria:');
            if (catname)
	    {
              $('#scheduler').fullCalendar ('addResource', { title: catname }, true); // scroll to the new resource?
            }
          }
        }
      },
    });
