// use 'strict';

// default versione: may be updated by programmed in main program
var	DatabaseVersion = 1;
var	DatabaseCompatibilityChecked = false;
// var	DatabaseInitialized = false;


// ============================================================================
// sleep time expects milliseconds
function sleep (time) { return new Promise((resolve) => setTimeout(resolve, time)); }

// ============================================================================
var	transactionPending = false;

function	waitPendingTransactions (acquireLock = false)
{
  /*
  if (transactionPending) alert ('lock pending');
  while (transactionPending)	// while lock pending,
    sleep (100).then (() => { alert ('resume'); /* here when timeout expired * / });
  if (acquireLock)
    transactionPending = true;	// acquire lock
  */
}

// ============================================================================
function	getElement (obj, key)
{
  for (var p in obj)
    if (obj.hasOwnProperty (p) && obj [p].key == key)
      return obj [p].value;
  alert ('object for key '+key+' not found');
  return null;
}

// ============================================================================
function	checkDatabaseCompatibility ()
{
  console.log ('checkDatabaseCompatibility ()');
  if (DatabaseCompatibilityChecked) return;	// already initialized

  // prefixes of implementation that we want to test
  // -----------------------------------------------
  window.indexedDB = window.indexedDB
	          || window.mozIndexedDB
	          || window.webkitIndexedDB
	          || window.msIndexedDB;

  // prefixes of window.IDB objects
  // ------------------------------------------------
  window.IDBTransaction = window.IDBTransaction
		       || window.webkitIDBTransaction
		       || window.msIDBTransaction;

  window.IDBKeyRange = window.IDBKeyRange
	            || window.webkitIDBKeyRange
	            || window.msIDBKeyRange;

  // ------------------------------------------------
  if (!window.indexedDB)
    { window.alert ("Your browser doesn't support a stable version of IndexedDB."); }

  DatabaseCompatibilityChecked = true;
  console.log ('DatabaseCompatibilityChecked ...');
}
