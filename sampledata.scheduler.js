
// -------------- resource categories ------------------
const	sampleResources =
[
	{ user: 'root', id: 'P', title: 'Personal', eventColor: 'green' },
	{ user: 'root', id: 'B', title: 'Business', eventColor: 'orange' },
	{ user: 'root', id: 'a', title: 'Famiglia', eventColor: 'blue' },
	{ user: 'root', id: 'b', title: 'Resource B' },
	{ user: 'root', id: 'c', title: 'Resource C' },
	{ user: 'root', id: 'd', title: 'Resource D', children: [ { id: 'd1', title: 'SubRsrc D1' }, { id: 'd2', title: 'SubRsrc D2' } ]
	},
	{ user: 'prof', id: 'B', title: 'Business', eventColor: 'red' },
	{ user: 'prof', id: 'a', title: 'Famiglia', eventColor: 'yellow' },
	{ user: 'prof', id: 'b', title: 'Resource B' },
	{ user: 'prof', id: 'c', title: 'Resource C' },
];

// -------------- activities ------------------
const	sampleActivities = 
[
	{ UID:1, user: 'root', id: '1', resourceId: 'B', priority: 'low', start: TODAY + 'T02:00:00', end: TODAY + 'T07:00:00', title: 'event 1' },
	{ UID:2, user: 'root', id: '2', resourceId: 'P', priority: 'low', start: TODAY + 'T05:00:00', end: TODAY + 'T22:00:00', title: 'event 2' },
	{ UID:3, user: 'root', id: '3', resourceId: 'a', priority: 'low', start: YESTERDAY, end: TOMORROW, title: 'event 3' },
	{ UID:4, user: 'root', id: '4', resourceId: 'b', priority: 'low', start: TODAY + 'T03:00:00', end: TODAY + 'T08:00:00', title: 'event 4' },
	{ UID:5, user: 'root', id: '5', resourceId: 'f', priority: 'low', start: TODAY + 'T00:30:00', end: TODAY + 'T02:30:00', title: 'event 5' },
	{ UID:6, user: 'prof', id: '2', resourceId: 'P', priority: 'low', start: TODAY + 'T05:00:00', end: TODAY + 'T22:00:00', title: 'event 2' },
	{ UID:7, user: 'prof', id: '3', resourceId: 'a', priority: 'low', start: YESTERDAY, end: TOMORROW, title: 'event 3' },
	{ UID:8, user: 'prof', id: '4', resourceId: 'b', priority: 'low', start: TODAY + 'T03:00:00', end: TODAY + 'T08:00:00', title: 'event 4' },
	{ UID:9, user: 'prof', id: '5', resourceId: 'f', priority: 'low', start: TODAY + 'T00:30:00', end: TODAY + 'T02:30:00', title: 'event 5' },
];
