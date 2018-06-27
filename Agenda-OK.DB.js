
var	DatabaseName = 'Agenda-OK';
var	DatabaseVersion = 2;
var	DatabaseInitialized = false;
var	DB = null;

checkDatabaseCompatibility ();

if (!DatabaseInitialized)



var	request = window.indexedDB.open (DatabaseName, DatabaseVersion);
request.onerror = function(event)
{
  var	msg = 'ERROR: failed opening the database ...' + event.target.errorCode;
  alert (msg);
  console.log (msg);
}
request.onsuccess = function(event)
{
  // Do something with request.result!
  DB = event.target.result;
  DatabaseInitialized = true;
};
request.onupgradeneeded = function (event)
{ 
  // Save the IDBDatabase interface 
  var	DB = event.target.result;

  console.log ('onupgradeneeded from prev version: '+event.oldVersion+' to current '+DatabaseVersion);
  switch (event.oldVersion)
  {
    case 0:
    case 1:	initialize_DB_v1 (DB); break;
    case 2:	initialize_DB_v1 (DB); break;
    default:	alert ('upgrade not available from version '+event.oldVersion); break;
  }
};





// --------------------------------
const userData = [
		   { username: "root",  password: "admin", email: "webmaster@company.com" },
		   { username: "pippo", password: "X",     email: "bill@company.com" },
		   { username: "pluto", password: "Y",     email: "donna@home.org" }
		 ];

// --------------------------------
function	initialize_DB_v1 (DB)
{
  console.log ('initialize_DB_v1 (DB)');

  // alert ('initialization of database v1 ...');
  var	users       = DB.createObjectStore ('users', { keyPath: 'username' });
  var	usernameIdx = users.createIndex ('username', 'username', { unique:true });
  var	emailIndex  = users.createIndex ('email', 'email', { unique:true });
  users.transaction.oncomplete = function (event)
  {
    console.log ('adding users ...');
    var	cursor = DB.transaction ('users', 'readwrite').objectStore ('users');
    userData.forEach (function (user) { cursor.add (user); });
    console.log ('users added.');
  }

  // var	events = DB.createTable ('events', 'key');

  // var	toDos = DB.createTable ('todos', 'key');

  console.log ('initialize_DB_v1 (DB) DONE.');
}



// DB.insert ('users', userData);
// DB.select ('users', 'root');
// DB.dropTable ('users');

