
// ------------- check if import are supported ----------------
/*
function supportsImports () { return 'import' in document.createElement('link'); }
if (supportsImports ()) { alert ('OK: import supported!'); }
else { alert ('problem: import non supported!!!'); }
*/

// ------------- utility date vars ----------------
var		todayDate = moment().startOf('day');
var		YESTERDAY = todayDate.clone().subtract(1, 'day').format('YYYY-MM-DD');
var		TODAY     = todayDate.format('YYYY-MM-DD');
var		TOMORROW  = todayDate.clone().add(1, 'day').format('YYYY-MM-DD');
