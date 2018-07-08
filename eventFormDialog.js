
    $(function ()
    {
      var dialog; // , form;

      // update data back to caller
      function addEvent ()
      {
	var	valid = true;
        var	action = $('#event-dialog').data ('action');
        var	eventData = $('#event-dialog').data ('calEvent');
        console.log ('saving calEvent: %o', eventData, 'action: ', action);
	var	title = $('#title')[0].value;
	valid = title != '';
	if (valid)
	{
	  var	DB_Event =
	  {
	    title :	$('#title')[0].value,
	    id :	eventData.id,
	    user :	Agenda_OK.authuser,
	    start :	eventData.start._d,
	    allDay :	eventData.allDay,
	    priority :	eventData.priority,
	  };
	  if (eventData.end) DB_Event.end = eventData.end._d;

	  // eventData.title = $('#title')[0].value;
	  // if (action == 'renderEvent')
	    // eventData.title = Agenda_OK.nextEventID++;
	  $('#calendar').fullCalendar (action, DB_Event); //, true); // stick? = true
          console.log ('--- MUST SAVE / UPDATE DATABASE: %o', DB_Event);
	  switch (action)
	  {
	    case 'renderEvent': createEvent (DB_Event); break;
	    case 'updateEvent': updateEvent (DB_Event); break;
	    default: console.log ('Event unmanaged database action: '+ action); break;
	  }
	  dialog.dialog ('close');
	}
	return valid;
      };

      dialog = $('#event-dialog').dialog (
      {
        autoOpen: false,
        height: 400,
        width: '40em', // 450,
        modal: true,

        buttons:	// intialize dialog
        {
          'Add / update event': addEvent,
          Cancel: function () { dialog.dialog ('close'); }
        },

	// populate dialog fields
	// -----------------------------------------------
        open: function ()
        {
          var	eventData = $('#event-dialog').data ('calEvent');
          console.log ('popping up calEvent: %o', eventData);

	  // initialize fields with event data ...
	  $('#title')[0].value = eventData.title;
	  $('#notes').value    = eventData.notes;
	  $('#category').value = eventData.category;
	  var	field = $('#priority');
	  // if (eventData.priority !== null) $('#priority')[eventData.priority].checked = true;
	  if (eventData.priority !== null) $('#priority')[0].value = eventData.priority;
	  // ... more ...
        },

	// called any way on OK or cancel (to be verified)
	// -----------------------------------------------
        close: function ()
        {
	  // $("#Event-Dialog-Form").reset ();
	  var	form = $("#Event-Dialog-Form") [0];
	  form.reset ();
	  // $("Event-Dialog-Form").reset ();
          // form [0].reset ();
          // allFields.removeClass ('ui-state-error');
        }
      });
    } );
