	  // --------------------------
	  function onLogin (needReload=true)
	  {
	    var	username = $('#username')[0].value;
	    // alert ('current user: '+username);
	    if (username)
	    {
	      // $('#loggeduser')[0].innerText = $('#username')[0].value;
	      $('#loggeduser')[0].innerText = username;
	      $('#getuser').hide ();
	      $('#hiuser').show ();
	      $('#loginbtn').hide ();
	      $('#logoutbtn').show ();

	      var	userFound = false;
	      for (var i=0; i < Agenda_OK.users.length; i++)
	        if (userFound = Agenda_OK.users [i].username == username)
		  break;
	      if (!userFound)
	        createUser ({ username:username, password:'', email:'' });

	      // here must reload document with new user
	      // location.replace ("https://www.w3schools.com");
	      // alert (location + "\n" + location.origin + location.pathname + '?username='+username);
	      var	RE = new RegExp ('^[^?]*');
	      var	URL = RE.exec (location);
	      // alert (location + "\n" + URL + '?username='+username);
	      if (needReload) location.replace (URL + '?username='+username);
	      /*
	      else
	      {
	        Agenda_OK.authuser = username;
		Agenda_OK.reloadEvents ();
	      }
	      */
	    }
	  }

	  // --------------------------
	  function onLogout (needReload=true)
	  {
	    var	username = '';
	    $('#username')[0].value = username;
	    $('#loggeduser')[0].text = username;
	    $('#hiuser').hide ();
	    $('#loginbtn').show ();
	    $('#logoutbtn').hide ();
	    $('#getuser').show ();

	    Agenda_OK.authuser = '';

	    // here must reload document with no user
	    var		RE = new RegExp ('^[^?]*');
	    var		URL = RE.exec (location);
	    if (needReload)
	    {
	      Agenda_OK.DBMS.DB.close ();
	      location.replace (URL);
	    }
	  }

	  var	args = location.search;
	  var	RE = /username=([^&]*)/;
	  var	match = RE.exec (args);
	  var	username = match ? match [1] : '';
	  // alert (location + "\n" + 'reloading with user: '+username + "\n" + match);

	  $('#username')[0].value = username;
	  username ? onLogin (false) : onLogout (false);

	  // $('#hiuser').hide ();
	  // $('#logoutbtn').hide ();
