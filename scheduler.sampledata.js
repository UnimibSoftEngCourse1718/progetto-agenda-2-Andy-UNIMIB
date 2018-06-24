
      // -------------- SAMPLE DATA ------------------
      var	resourcesSampleData =
      [
        { id: 'P', title: 'Personal', eventColor: 'green' },
        { id: 'B', title: 'Business', eventColor: 'orange' },
        { id: 'a', title: 'Auditorium A' },
        { id: 'b', title: 'Auditorium B' },
        { id: 'c', title: 'Auditorium C' },
        { id: 'd', title: 'Auditorium D', children:
					[
					  { id: 'd1', title: 'Room D1' },
					  { id: 'd2', title: 'Room D2' }
					]
	},
      ];

      // -------------- SAMPLE DATA ------------------
      var	eventsSampleData = 
      [
        { id: '1', resourceId: 'b', start: TODAY + 'T02:00:00', end: TODAY + 'T07:00:00', title: 'event 1' },
        { id: '2', resourceId: 'c', start: TODAY + 'T05:00:00', end: TODAY + 'T22:00:00', title: 'event 2' },
        { id: '3', resourceId: 'd', start: YESTERDAY, end: TOMORROW, title: 'event 3' },
        { id: '4', resourceId: 'e', start: TODAY + 'T03:00:00', end: TODAY + 'T08:00:00', title: 'event 4' },
        { id: '5', resourceId: 'f', start: TODAY + 'T00:30:00', end: TODAY + 'T02:30:00', title: 'event 5' }
      ];
