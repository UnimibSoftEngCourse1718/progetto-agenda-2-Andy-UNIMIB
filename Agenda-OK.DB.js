'use strict';

// ============================================================================
function DBMS (databaseName, version=1)
{
  var		databaseName = databaseName;
  var		databaseVersion = version;
  var		databaseSupportChecked = false;
  var		databaseInitialized = false;
  var		DB = null;



  // check if IndexedDB is supported by current browser
  // -----------------------------------------------------------------
  this.checkDatabaseSupport = function ()
  {
    console.log ('checkDatabaseSupport ()');
    if (this.databaseSupportChecked) return;	// already initialized

    // prefixes of implementation that we want to test
    // -----------------------------------------------
    if (!window.indexedDB)
      window.indexedDB    = window.mozIndexedDB
	                 || window.webkitIndexedDB
	                 || window.msIndexedDB;

    // prefixes of window.IDB objects
    // ------------------------------------------------
    window.IDBTransaction = window.IDBTransaction
		         || window.webkitIDBTransaction
		         || window.msIDBTransaction;

    window.IDBKeyRange    = window.IDBKeyRange
	                 || window.webkitIDBKeyRange
	                 || window.msIDBKeyRange;

    // ------------------------------------------------
    if (!window.indexedDB)
      { window.alert ("Your browser doesn't support a stable version of IndexedDB."); }

    this.databaseSupportChecked = true;
    console.log ('databaseSupportChecked ...');
    return window.indexedDB ? true : false;
  };


  // -----------------------------------------------------------------
  this.clear = function ()
  {
    console.log ("clearing database ...");
    var	req = indexedDB.deleteDatabase (this.DatabaseName);
	req.onsuccess = function () { console.log ("Deleted database successfully"); };
	req.onerror   = function () { console.log ("Couldn't delete database"); };
    this.databaseInitialized = 1;
    // $.holdReady (false);		// allow onDocumentReady and start application ...
  };

  // -----------------------------------------------------------------
  this.open = function ()
  {
    var		self = this;
    var		request = window.indexedDB.open (this.DatabaseName, this.databaseVersion);

    // ------------------------------
    request.onerror = function(event)
    {
      var	msg = 'ERROR: failed opening the database ...' + event.target.errorCode;
      alert (msg);
      console.log (msg);
      $.holdReady (false);		// allow onDocumentReady and start application ...
    }

    // ------------------------------
    request.onsuccess = function(event)
    {
      console.log ('DB.open request.onsuccess');
      self.DB = event.target.result;
      // Agenda_OK.DBMS.DB = event.target.result;

      // loadSampleData (this.DB, 'users',  sampleUsers);
      // loadSampleData (this.DB, 'events', sampleEvents);

      // preloadData ('users',  sampleUsers);
      // preloadData ('events', sampleEvents, onEventsLoaded);

      self.databaseInitialized = true;
      $.holdReady (false);		// allow onDocumentReady and start application ...
    };

    // ------------------------------
    request.onupgradeneeded = function (event)
    { 
      // Save the IDBDatabase interface 
      var	newDB = event.target.result;

      console.log ('onupgradeneeded from prev version: '+event.oldVersion+' to current '+self.databaseVersion);
      switch (event.oldVersion)
      {
        case 0:
        case 1:	upgrade_DB_v1 (newDB); break;
        case 2:	upgrade_DB_v1 (newDB); break;
        default:	alert ('upgrade not available from version '+event.oldVersion); break;
      }

      self.DB = newDB;
      self.databaseInitialized = true;
      $.holdReady (false);		// allow onDocumentReady and start application ...
    };
  };

  // --------------------------------
  function	upgrade_DB_v1 (DB)
  {
    console.log ('upgrade_DB_v1 (DB)');

    // -------------------
    console.log ('create objectStore for users ...');
    var	users         = DB.createObjectStore ('users', { keyPath: 'username' });
    var	usernameIndex = users.createIndex ('username', 'username', { unique:true });
    var	emailIndex    = users.createIndex ('email', 'email', { unique:true });
    users.transaction.oncomplete = function (event) { loadSampleData (DB, 'users', sampleUsers); }

    // -------------------
    console.log ('create objectStore for events ...');
    var	events      = DB.createObjectStore ('events', { keyPath: 'id' });
    var	userIndex   = events.createIndex ('user', 'user');
    var	titleIndex  = events.createIndex ('title', 'title');
    var	startIndex  = events.createIndex ('start', 'start');
    var	endIndex    = events.createIndex ('end', 'end');
    events.transaction.oncomplete = function (event) { loadSampleData (DB, 'events', sampleEvents); }

    // -------------------
    var	todos       = DB.createObjectStore ('todos', { keyPath: 'user' });

    console.log ('initialize_DB_v1 (DB) DONE.');
  };

  // --------------------------------
  function	loadSampleData (DB, tableName, sampleData)
  {
    var	trx0 = DB.transaction (tableName, 'readwrite').objectStore (tableName).clear ();

    trx0.onsuccess = function (event)
    {
      console.log ('adding '+tableName+' data ...');
      var		trx = DB.transaction ([tableName], 'readwrite');
      trx.oncomplete =	function (event) { console.log ('initialize '+tableName+' completed'); }
      trx.onerror =	function (event) { console.log ('initialize '+tableName+" ERROR!!!", event.target); }
      var		store = trx.objectStore (tableName);

      sampleData.forEach (function (record)
      {
        console.log ("record: %o", record);
        var request = store.add (record);
        request.onsuccess = function (event) { console.log ('record added ...'); }
        request.onerror   = function (event) { console.log ("error: %o", event.target); }
      });
      console.log (tableName+': sample data added ...');
    }
  };

  this.checkDatabaseSupport ();
  // this.open (databaseName);
}
