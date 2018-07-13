
    // ------------- compute activity compatibility number ----------------
    function	swap (array, index1, index2)
    {
      var	tmp = array [index1];
      array [index1] = array [index2];
      array [index2] = tmp;
    }

    // ------------- compute activity compatibility number ----------------
    function	sort (array)
    {
      for (var i=0; i<array.length; i++)
        for (var j=i+1; j<array.length; j++)
          if (array [i] > array [j])
	    { swap (array, i, j); }
    }

    // ------------- compute activity compatibility number ----------------
    function	computeCompatibleActivities ()
    {
      var	testArray = [ 3, 4, 1, 0 ];
      sort (testArray);

      var	rc = { total:10, compatible:3 };
      // var	events = .fullCalendar( ‘clientEvents’ [, idOrFilter ] ) -> Array;
      var	events = $('#scheduler').fullCalendar ('clientEvents');

      for (var i=0; i<events.length; i++)
        ; // events [i];
      console.log ('computeCompatibleActivities () : %o', rc);
      return rc;
    }

    // ------------- scheduler ----------------
    var		currentId = 44;
    var		scheduler = $('#scheduler').fullCalendar ('getCalendar');
    $('#scheduler').fullCalendar (
    {
      height :     '80%',
      locale:      'it',
      // defaultDate: '2018-05-12',
      defaultDate: todaystr,
      defaultView: 'timelineDay',
      editable:	   true,
      dayClick: function (date, jsEvent, view) { alert ('a day has been clicked!' + date.format () ); },

      // -----------
      selectable: true,
      selectHelper: true,
      // select: function (start, end, allDay, calendar, rid)
      select: function (start, end, allDay, ev, res)
      {
        var	title = prompt ('Event Title:');
        var	eventData;
        if (title)
	{
	  // alert ('view name/type:'+this.type +"\n" + (start.format ()) +' / '+ (end.format ()) + "\nrid:"+res.id);
	  eventData = { title:title, start:start, end:end, id:currentId++, allDay:allDay, resourceId:res.id }; // this.uid };
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
        // alert (event.title + " was dropped on " + event.start.format ());
        if (!confirm ("Confermi la modifica?"))
          { revertFunc (); }
	else
	{
	  var	result = computeCompatibleActivities ();
	  $('#statusbar') [0].innerText = 'Attività compatibili: '+result.compatible+' su '+result.total+' ...';
	}
      },

      // -----------
      resourceLabelText: 'Attività',
      resources:	[], // resourcesSampleData,
      events:		[], // eventsSampleData,

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
          text: 'nuova categoria',
          click: function()
	  {
            var catname = prompt ('nome della categoria:');
            if (catname)
	    {
              $('#scheduler').fullCalendar ('addResource', { title: catname }, true); // scroll to the new resource?
            }
          }
        }
      },
    });

// ------------------
$(document).ready (function ()
{
  $('.fc-rows tr').on ('click', function ()
  {
    alert ($(this).text ());
  });
});
