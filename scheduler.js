
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

    // ------------- compute activity compatibility number ----------------
    // loop'o su tutti gli eventi, e gestisco (ricorsivamente) le sovrapposizioni
    // per identificare il minimo numero di sovrapposizioni
    function	countNonOverlapping (indexArray, eventArray, currPos=0)
    {
      var	count = 0;

      console.log ('enter countNonOverlapping() at pos='+currPos);

      for (var i=currPos; i<indexArray.length; i++)
      {
	if (!next.end._isValid)
	  alert ('invalid end!!! %o', next);	// fullDay? uso start+24h ???

	var	curr = eventArray [indexArray [i]];
	var	next = eventArray [indexArray [i+1]];

	if (next.start._d > curr.end._d)	// if not overlapping,
	{	// count++ and go check nect
	  count++;
	  console.log ('non overlapping at i='+i+' count now = '+count);
	}
	else
	{
	  // here if overlapping ...
	  var	bestCount = 0;		// keep track of best result
	  var	bestPos = -1;

          for (var j=i+1; j<indexArray.length; j++)
	  {
	    console.log ('evaluating overlapping at pos j='+j);
	    var	next = eventArray [indexArray [j]];

	    if (!next.end._isValid)
	      alert ('invalid end!!! %o', next);	// fullDay? uso start+24h ???

	    if (next.start._d > curr.end._d)	// if next not overlapping, return current count
	      break;
	    else
	    {
	      var		innerCount = countNonOverlapping (indexArray, eventArray, j);
	      if (innerCount > bestMatch)
	        { bestMatch = innerCount; bestPos = j; }
	    }
	  }

	  count += bestMatch;
	  console.log ('after  overlapping ad i='+i+' count now = '+count);
	}
      }

      console.log ('exiting countNonOverlapping() with count='+count);
      return count;
    }

    // ------------- compute activity compatibility number ----------------
    function	computeCompatibleActivities ()
    {
      var	testArray = [ 3, 4, 1, 0 ];
      sort (testArray);

      var	rc = { total:10, compatible:3 };
      // var	events = .fullCalendar( ‘clientEvents’ [, idOrFilter ] ) -> Array;
      var	events = $('#scheduler').fullCalendar ('clientEvents');

      // creo un array di indici unici degli eventi
      var	eventIDs = [];
      for (var i=0; i<events.length; i++)
        eventIDs.push (events [i].UID);
      // ordino l'array degli indici in base alla data di inizio di ogni evento
      eventSort (eventIDs, events);

      // identifico il minimo numero di sovrapposizioni
      var	nonOverlapping = countNonOverlapping (eventIDs, events);

      var	rc = { total:events.length, compatible:nonOvelapping };
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
	  var	msg  = 'Attività compatibili: '+result.compatible+' su '+result.total+' ...';
	  alert (msg);
	  $('#statusbar') [0].innerText = msg;
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
