// use 'strict';

// default versione: may be updated by programmed in main program
var	DatabaseVersion = 1;
var	DatabaseCompatibilityChecked = false;
var	DatabaseInitialized = false;


// ============================================================================
// sleep time expects milliseconds
function sleep (time) { return new Promise((resolve) => setTimeout(resolve, time)); }

// ============================================================================
var	transactionPending = false;

function	waitPendingTransactions (acquireLock = false)
{
  return;
  if (transactionPending) alert ('lock pending');
  while (transactionPending)	// while lock pending,
    sleep (100).then (() => { alert ('resume'); /* here when timeout expired */ });
  if (acquireLock)
    transactionPending = true;	// acquire lock
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

// ============================================================================
function	DBMS ()
{
  console.log ('DBMS ()');

  if (!DatabaseInitialized)
    checkDatabaseCompatibility ();

  // this._self =	this;
  var _DB	= null;
  var _name	= null;
  this.tables	= [];
  console.log ('DBMS () created');
};

// ----------------------------------------------------------------------------
DBMS.prototype.use = function (name, initialize)
{
  console.log ('use ()');
  var		_self = this;

  var		request = window.indexedDB.open (name, DatabaseVersion);

  request.onsuccess = function (event)
	{ _DB = event.target.result;
	  _DB.DBMS = _self;
	  _name	= name;
	  _DB.onerror = function (event) { alert ("Database error: " + event.target.errorCode); }
        }
  request.onerror   = function (event)
	{ alert ('ERROR: '+event.type); }
  request.onupgradeneeded = function (event)
	{
	  console.log ('onupgradeneeded');
	  _self._DB = event.target.result;
	  _self._DB.DBMS = _self;
	  initialize (_self);
	  DatabaseInitialized = true;
	  console.log ('DatabaseInitialized');
	}
}

// ----------------------------------------------------------------------------
DBMS.prototype.close = function ()
{
  // if (!DatabaseInitialized) return null;
  console.log ('close ()');
  waitPendingTransactions (true);
  this._DB.close ();
  this._DB = null;
  DatabaseInitialized = false;
}

// ----------------------------------------------------------------------------
DBMS.prototype.drop = function (databaseName)
{
  console.log ('drop ()');
  waitPendingTransactions (true);
  var req = indexedDB.deleteDatabase (databaseName);
  req.onsuccess = function () { /* alert ("Deleted database successfully"); */ _DB = null; _name = null; };
  req.onerror   = function () { alert ("Couldn't delete database"); };
  req.onblocked = function () { alert ("Couldn't delete database due to the operation being blocked"); };
  transactionPending = false;	// release lock
  DatabaseInitialized = false;
}

// ----------------------------------------------------------------------------
DBMS.prototype.createTable = function (tableName, keyField)
{
  var	_self = this;
  console.log ('createTable ()');
  waitPendingTransactions (true);
  // var	_self = this._DB.DBMS._self;
  var	table = this._DB.createObjectStore (tableName, { keyPath: keyField });
  table.transaction.oncomplete = function (event)
  {
    _self.tables.push ({ key:tableName, value:table });
    console.log ('table '+tableName+' created');
  }
  // alert ('table '+tableName+' created');
  transactionPending = false;	// release lock
}

// ----------------------------------------------------------------------------
DBMS.prototype.dropTable = function (tableName)
{
  console.log ('fropTable ()');
  _DB.deleteObjectStore (tableName);
}

// ----------------------------------------------------------------------------
DBMS.prototype.createIndex = function (table, keyField, unique=false)
{
  console.log ('createIndex ()');
  waitPendingTransactions (true);
  // var	_self  = this._DB.DBMS._self;
  var	_table = getElement (this.tables, table)
  var	index  = _table.createIndex (keyField, keyField, { unique: unique });
  transactionPending = false;	// release lock
}

// ----------------------------------------------------------------------------
DBMS.prototype.insert = function (tableName, values)
{
  console.log ('insert ()');
  waitPendingTransactions (true);
  var	_self  = this._DB.DBMS._self;
  var	_table = this._DB.transaction (tableName, 'readwrite').objectStore (tableName);
  values.forEach (function (user) { _table.add (user); });
  transactionPending = false;	// release lock
}

// ----------------------------------------------------------------------------
DBMS.prototype.select = function (tableName, values=null)
{
  console.log ('select ()');
  waitPendingTransactions (true);
  var	_table = this._DB.transaction (tableName, 'readwrite').objectStore (tableName);
  //var	request = _table.get ("444-44-4444");
  var	request = _table.getAll ();
  request.onsuccess = function (event)
  {
    alert ("email for "+values+ " is " + request.result.email);
    transactionPending = false;	// release lock
  };
}
