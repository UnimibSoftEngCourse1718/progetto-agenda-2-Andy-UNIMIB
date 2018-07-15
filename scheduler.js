
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
      for (var i=0; i<array.length-1; i++)
        for (var j=i+1; j<array.length; j++)
          if (array [i] > array [j])
	    { swap (array, i, j); }
    }

    // ------------- compute activity compatibility number ----------------
    function	eventSort (indexArray, eventArray)
    {
      for (var i=0; i<indexArray.length-1; i++)
        for (var j=i+1; j<indexArray.length; j++)
          if (eventArray [indexArray [i]].start._d > eventArray [indexArray [j]].start._d)
	    { swap (indexArray, i, j); }
    }

    // ------------- verifico che l'evento 2 si sovrappone all'evento 1 ----------------
    function	overlapping (event1, event2)
    {
      var	s1 = event1.start._d;
      var	e1 = event1.end._d;
      var	s2 = event2.start._d;
      var	e2 = event2.end._d;
      var	overlap = !((e2 <= s1) || (s2 >= e1));
      return overlap;
    }

    // ------------- verifico che l'evento 2 si sovrappone all'evento 1 ----------------
    // conto i non overlapping, e per tutti gli overlapping costruisco un sottoinsieme
    // di eventi sovrapposti, e vado a verificare ricorsivamente quanti tra loro 
    // non si sovrappongono.
    var	indent = '';
    function	count_not_overlapping (indexArray, eventArray, pos)
    {
      if (indexArray.length == 0)
      {
        // console.log (indent, 'EMPTY indexArray : return 0');
        return 0;
      }

      var	orgIndent = indent;
      indent += '> ';

      if (indent.length > 30) { alert ('infinite recursion!'); exit (); }

      if (indexArray.length == 1)
      {
	indent = orgIndent;
        return 1;
      }

      var	overlapping_events = [];		// list ov events overlapping with this one
      var	not_overlapping_events = [];		// list ov events not overlapping with this one

      for (var i=0; i < indexArray.length; i++)
      {
	if (indexArray [i] == pos)			// prevent infinite recursion
	  continue;

        var	curr = eventArray [indexArray [i]];
	var	overlaps = false;

        for (var j=0; j < indexArray.length; j++)
	  if (overlaps = i != j && overlapping (curr, eventArray [indexArray [j]]))
	    break;

	if (overlaps)
	  overlapping_events.push (indexArray [i]);
	else
	  not_overlapping_events.push (indexArray [i]);
      }

      // console.log (indent, 'EVENTS: overlapping: ', overlapping_events, ' / not overlapping with: %o', not_overlapping_events);

      var	best = 0;
      for (var i=0; i < overlapping_events.length; i++)
      {
	// console.log (indent, 'checking overlapping ...');
	var	N = count_not_overlapping (overlapping_events, eventArray, indexArray [i]);
	if (N > best)
	  best = N;
      }
      // console.log (indent, 'EVENTS best from overlapping: ', best);

      count = not_overlapping_events.length + best;
      // console.log (indent, 'RETURNINIG ', count, ' = ', not_overlapping_events.length, ' + ', best);
      indent = orgIndent;
      return count;
    }

    // ------------- compute activity compatibility number ----------------
    function	computeCompatibleActivities ()
    {
      var	rc = { total:10, compatible:3 };
      // var	events = .fullCalendar( ‘clientEvents’ [, idOrFilter ] ) -> Array;
      var	events = $('#scheduler').fullCalendar ('clientEvents');

      // creo un array di indici unici degli eventi
      var	eventIDs = [];
      for (var i=0; i<events.length; i++)
        eventIDs.push (i); // (events [i].UID);
      // ordino l'array degli indici in base alla data di inizio di ogni evento
      eventSort (eventIDs, events);

      for (var i=0; i<eventIDs.length; i++)
        console.log ('evento ['+i+'] : %o', events [eventIDs[i]]);
      for (var i=0; i<eventIDs.length; i++)
        console.log ('evento ['+i+'] : UID=', events [eventIDs[i]].id, events [eventIDs[i]].start._d, events [eventIDs[i]].end._d);
        // console.log ('evento ['+i+'] : %o', events [eventIDs[i]]);

      var	N = count_not_overlapping (eventIDs, events);

      var	rc = { total:events.length, compatible:N };
      console.log ('computeCompatibleActivities () : %o', rc);

      var	msg  = 'Attività compatibili: '+rc.compatible+' su '+rc.total+' ...';
      alert (msg);
      $('#statusbar') [0].innerText = msg;
      return rc;
    }

    // ------------- scheduler ----------------
    // var		currentId = 44;
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
	  var	res ='a';	// !!!!!!!!!!! DA PRELEVARE DAL DIALOG !!!!!!!!!!!!!
	  eventData = { title:title, start:start, end:end, id:Agenda_OK.nextEventID++, allDay:allDay, resourceId:res.id }; // this.uid };
	  $('#scheduler').fullCalendar ('renderEvent', eventData, true); // stick? = true
	  computeCompatibleActivities ();
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

        if (calEvent.url) { window.open (calEvent.url); return false; }
      },

      // -----------
      eventDrop: function (event, delta, revertFunc)
      {
        // alert (event.title + " was dropped on " + event.start.format ());
        if (!confirm ("Confermi la modifica?"))
          { revertFunc (); }
	else
	{
	  computeCompatibleActivities ();
	  /*
	  var	result = computeCompatibleActivities ();
	  var	msg  = 'Attività compatibili: '+result.compatible+' su '+result.total+' ...';
	  alert (msg);
	  $('#statusbar') [0].innerText = msg;
	  */
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
