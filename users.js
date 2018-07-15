// ======================================================================
function	reloadUsers ()
{
  console.log ('reloadUsers for user: ['+ Agenda_OK.authuser +']');

  var	trx = Agenda_OK.DBMS.DB.transaction ('users', 'readonly').objectStore ('users');

  trx.openCursor ().onsuccess = function (event)
  {
    var         cursor = event.target.result;
    if (cursor)
    {   
      if (cursor.value.id >= Agenda_OK.nextUserID)
      Agenda_OK.nextUserID = cursor.value.id +1;

      if (cursor.value.user == Agenda_OK.authuser)
      {
	// console.log ("record: %o", cursor.value);
	var	userData = cursor.value;
	Agenda_OK.users.push (userData);
      }
      cursor.continue (); 
    }   
    // else
      // { console.log ("No more records!"); }
  }
}

// ======================================================================
function	createUser (record)
{
  if (record && record.username && Agenda_OK.DBMS)
  {
    var	tableName = 'users';
    console.log ('create user: ['+ Agenda_OK.authuser +'] - user: %o', record);

    console.log ('adding '+tableName+' data ...');
    var               trx = Agenda_OK.DBMS.DB.transaction ([tableName], 'readwrite');
    trx.oncomplete =  function (event) { console.log ('trx initialize '+tableName+' completed'); }
    trx.onerror =     function (event) { console.log ('trx initialize '+tableName+" ERROR!!!", event.target); }
    var               store = trx.objectStore (tableName);

    console.log ("record: %o", record);
    var		request = store.add (record);
    request.onsuccess = function (event) { console.log ('user added ...'); }
    request.onerror   = function (event) { console.log ("user save error: %o", event.target); }
    console.log (tableName+': sample data added ...');
  }
}

/*
// ======================================================================
function	updateUser (record)
{
  var	tableName = 'users';

  console.log ('update record for user: ['+ Agenda_OK.authuser +'] - record: %o', record);
  var	trx = Agenda_OK.DBMS.DB.transaction (tableName, 'readwrite').objectStore ('évents');
  var	request = trx.get (record.id);
  request.onerror = function (event) { alert ('failed opening store for updating record: %o', event);  };
  request.onsuccess = function (event)
  {
    // var data = event.target.result;	// Get the old value that we want to update
    // data.age = 42;			// update the value(s) in the object that you want to change

    // Put this updated object back into the database.
    var		requestUpdate = trx.put (event);
    requestUpdate.onerror = function (event) { alert ('failed updating record: %o', event);  };
    requestUpdate.onsuccess = function (event) { console.log ('record updated: %o', event); };
  };
}
*/
