// use 'strict';


// ============================================================================
var	DataStore =
{
  init : function ()
  {
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
  }
};

// ============================================================================
var	AgendaOKstore =
{
  DB :	null,
  myself : null,
  database : 'AgendaOK',
  version  : 1,

  // ----------------------------------------
  open : function ()
  {
    myself = this;

    var request = indexedDB.open (this.database, this.version);

    // ----------------------------------------
    request.onerror = function (event)
    {
      alert ("Database error: " + event.target.error.name);
      console.log ("Database error: " + event.target.error.name);
    };

    // ----------------------------------------
    request.onupgradeneeded = function (event)
    {
      alert ("database need to be upgraded!\nnot implemented yet");

      // The database did not previously exist, so create object stores and indexes.
      myself.DB = request.result;

      var store = myself.DB.createObjectStore("books", {keyPath: "isbn"});
      var titleIndex = store.createIndex("by_title", "title", {unique: true});
      var authorIndex = store.createIndex("by_author", "author");

      // Populate with initial data.
      store.put ({title: "Quarry Memories", author: "Fred",   isbn: 123456});
      store.put ({title: "Water Buffaloes", author: "Fred",   isbn: 234567});
      store.put ({title: "Bedrock Nights",  author: "Barney", isbn: 345678});
    };

    // ----------------------------------------
    request.onsuccess = function()
    {
      myself.DB = request.result;
    };
  },

  // ----------------------------------------
  close : function ()
  {
    myself.DB.close ();
    myself.DB = null;
  }
};


/*
  // ---------------------------------------------
  open : function (DBname, version=1)
  {
    self = this;
    // var		store =  Object.create (DataStore.prototype);
    var 	request = window.indexedDB.open (DBname, version);
    DB = request;

    request.onerror = function (event)
    {
      alert ("Database error: " + event.target.error.name);
      console.log ("Database error: " + event.target.error.name);
    };

    request.onsuccess = function (event)
    {
      DB = event.target.result;
      console.log ("success: "+ DB);
    };

    request.onupgradeneeded = function (event)
    {
      alert ("database need to be upgraded!\nnot implemented yet" + event.target.error.name);
    }
  },

  // tables = array of tables involved in transaction
  // table  = table to read from
  // key    = object / record key
  // ---------------------------------------------
  read : function (tables, table, key)
  {
    self.tables = tables;
    this.tables = tables;
    this.table  = table;
    this.key    = key;
    return;

    var		transaction = self.DB.transaction (tables);
    var		objectStore = transaction.objectStore (table);
    var		request     = objectStore.get (key);

    request.onerror = function (event)
      { alert ("Unable to retrieve data from database!" + table + '/' + key); };

    request.onsuccess = function (event)
    {
      if (request.result)
        { alert ("returned object: " + request.result); }
      else
        { alert ("select failed: no data returned." + table + '/' + key); };
    }
  },
};







// ----------------------------------------------------------------------------
const employeeData = [
	  { id: "00-01", name: "gopal", age: 35, email: "gopal@tutorialspoint.com" },
	  { id: "00-02", name: "prasad", age: 32, email: "prasad@tutorialspoint.com" }
	];

// ----------------------------------------------------------------------------
function read ()
{
  var transaction = DB.transaction (["employee"]);
  var objectStore = transaction.objectStore ("employee");
  var request = objectStore.get ("00-03");

  request.onerror = function (event)
  {
    alert ("Unable to retrieve daa from database!");
  };

  request.onsuccess = function (event)
  {
    // Do something with the request.result!
    if (request.result)
    {
      alert ("Name: " + request.result.name + ", Age: " + request.result.age + ", Email: " + request.result.email);
    } else
    {
      alert ("Kenny couldn't be found in your database!");
    }
  };
}

// ----------------------------------------------------------------------------
function readAll ()
{
  var objectStore = DB.transaction ("employee").objectStore ("employee");

  objectStore.openCursor ().onsuccess = function (event)
  {
    var cursor = event.target.result;

    if (cursor)
    {
      alert ("Name for id " + cursor.key + " is " + cursor.value.name + ", Age: " + cursor.value.age + ", Email: " + cursor.value.email);
      cursor.continue ();
    } else
    {
      alert ("No more entries!");
    }
  };
}

// ----------------------------------------------------------------------------
function add ()
{
  var request = DB.transaction (["employee"], "readwrite")
	.objectStore ("employee")
	.add ({ id: "00-03", name: "Kenny", age: 19, email: "kenny@planet.org" });

  request.onsuccess = function (event)
  {
    alert ("Kenny has been added to your database.");
  };

  request.onerror = function (event)
  {
    alert ("Unable to add data\r\nKenny is aready exist in your database! ");
  }
}

// ----------------------------------------------------------------------------
function remove ()
{
  var request = DB.transaction (["employee"], "readwrite")
	.objectStore ("employee")
	.delete ("00-03");

  request.onsuccess = function (event)
  {
    alert ("Kenny's entry has been removed from your database.");
  };
}


// ----------------------------------------------------------------------------
function ZZZ ()
{
  var request = indexedDB.open ("library");

  request.onupgradeneeded = function()
  {
    // The database did not previously exist, so create object stores and indexes.
    var db = request.result;
    var store = db.createObjectStore("books", {keyPath: "isbn"});
    var titleIndex = store.createIndex("by_title", "title", {unique: true});
    var authorIndex = store.createIndex("by_author", "author");

    // Populate with initial data.
    store.put({title: "Quarry Memories", author: "Fred", isbn: 123456});
    store.put({title: "Water Buffaloes", author: "Fred", isbn: 234567});
    store.put({title: "Bedrock Nights", author: "Barney", isbn: 345678});
  };

  request.onsuccess = function()
  {
    db = request.result;
  };


  db.close();
}

*/
