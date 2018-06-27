
DatabaseVersion = 1;

// --------------------------------
function	initDBv1 (DB)
{
  console.log ('initDBv1 (DB)');

  // alert ('initialization of database v1 ...');

  DB.createTable ('users', 'username');
  DB.createIndex ('users', 'username', true);
  DB.createIndex ('users', 'email',    true);

  // var	events = DB.createTable ('events', 'key');

  // var	toDos = DB.createTable ('todos', 'key');
  console.log ('initDBv1 (DB) - end');
}

var	DB = new DBMS ();

/*
while (!DatabaseInitialized)
{
  console.log ('sleeping .2 secs ...');
  sleep (20).then (() => { console.log ('DB initialized: resuming ...'); /* here when timeout expired * / });
}
*/

DB.drop ('Agenda-OK');
DB.use ('Agenda-OK', initDBv1);


const userData = [
		   { username: "root",  password: "admin", email: "webmaster@company.com" },
		   { username: "pippo", password: "X",     email: "bill@company.com" },
		   { username: "pluto", password: "Y",     email: "donna@home.org" }
		 ];


// DB.insert ('users', userData);
// DB.select ('users', 'root');
// DB.dropTable ('users');

