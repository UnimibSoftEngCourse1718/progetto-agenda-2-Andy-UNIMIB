'use strict';

// ============================================================================
function DBMS (_databaseName, version=1)
{
  var	self = this;
  this.databaseName = _databaseName;
  this.databaseVersion = version;
  this.databaseSupportChecked = false;
  this.databaseInitialized = false;
  this.initializeData = false;
  this.DB = null;

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
    {
      var	originURL = /([^?]*)/.exec (window.location) [0];
      var	URL = originURL.replace (/\.html/, '.error.html');
      var	errorMessage =  'Your browser doesn\'t support a stable version of IndexedDB.';
      location.replace (URL + '?error='+errorMessage);
    }

    this.databaseSupportChecked = true;
    console.log ('databaseSupportChecked ...');
    return window.indexedDB ? true : false;
  };


  // -----------------------------------------------------------------
  this.clear = function ()
  {
    console.log ("clearing database: "+self.databaseName);
    var	req = indexedDB.deleteDatabase (self.databaseName);
	req.onsuccess = function ()
	{
	  if (self.DB) self.DB.close ();
	  self.DB = null;
	  console.log ("Deleted database successfully");
	};
	req.onerror   = function () { console.log ("Couldn't delete database: "+self.databaseName); };
    self.databaseInitialized = false;
    // $.holdReady (false);		// allow onDocumentReady and start application ...
  };

  // -----------------------------------------------------------------
  this.open = function ()
  {
    // var		self = this;
    var		request = window.indexedDB.open (self.databaseName, self.databaseVersion);

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
      self.databaseInitialized = true;
      if (self.initializeData)
      {
        loadSampleData (self.DB, 'users',      sampleUsers);
        loadSampleData (self.DB, 'events',     sampleEvents);
        loadSampleData (self.DB, 'categories', sampleCategories);
        loadSampleData (self.DB, 'resources',  sampleResources);
        loadSampleData (self.DB, 'activities', sampleActivities);
        loadSampleData (self.DB, 'todos',      sampleTodos);
      }
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
    console.log ('create objectStore for categories ...');
    // var	categories    = DB.createObjectStore ('categories', { keyPath: ['user','name'] });
    var	categories    = DB.createObjectStore ('categories', { keyPath: 'ID' });
    categories.createIndex ('ID', 'ID', { unique:true });
    categories.createIndex ('unique', ['user','name'], { unique:true });
    // categories.transaction.oncomplete = function (event) { loadSampleData (DB, 'categories', sampleCategories); }

    // -------------------
    console.log ('create objectStore for users ...');
    var	users         = DB.createObjectStore ('users', { keyPath: 'username' });
    users.createIndex ('username', 'username', { unique:true });
    users.createIndex ('email',    'email',    { unique:true });
    // users.transaction.oncomplete = function (event) { loadSampleData (DB, 'users', sampleUsers); }

    // -------------------
    console.log ('create objectStore for events ...');
    var	events      = DB.createObjectStore ('events', { keyPath: 'id' });
    events.createIndex ('user',  'user');
    events.createIndex ('title', 'title');
    events.createIndex ('start', 'start');
    events.createIndex ('end',   'end');
    // events.transaction.oncomplete = function (event) { loadSampleData (DB, 'events', sampleEvents); }

    // -------------------
    var	resources  = DB.createObjectStore ('resources',  { keyPath: ['user','id'] });
    resources.createIndex ('title', 'title');

    var	activities = DB.createObjectStore ('activities', { keyPath: 'UID' });
    activities.createIndex ('activity', ['user','id'], { unique:true });

    // -------------------
    var	todos  = DB.createObjectStore ('todos',  { keyPath: ['user','id'] });
    todos.createIndex ('title', 'title');

    console.log ('initialize_DB_v1 (DB) DONE.');
  }

  // --------------------------------
  function	loadSampleData (DB, tableName, sampleData)
  {
    console.log ('loadSampleData (DB, '+tableName+', %o', sampleData)
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
        // console.log ("record: %o", record);
        var request = store.add (record);
        request.onsuccess = function (event) { console.log ('record added ...'); }
        request.onerror   = function (event) { console.log ("error: %o", event.target); }
      });
      console.log (tableName+': sample data added ...');
    }
  }

  this.checkDatabaseSupport ();
  // this.open (databaseName);
}
