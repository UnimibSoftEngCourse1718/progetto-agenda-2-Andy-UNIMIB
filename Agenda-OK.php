<?php
  $APPNAME='Agenda-OK';
  $VERSION='0.1 &Alpha;';
?>
<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" href="./Agenda-OK.icon.png" />

  <title><?php echo "$APPNAME v$VERSION"; ?></title>

  <!-- ----- JQuery ----- -->
  <script src="./lib/jquery.js"></script>
  <script src="./lib/jquery-ui/jquery-ui.js"></script>
  <link rel="stylesheet" href="./lib/jquery-ui/themes/base/jquery-ui.css" />
  <script>$.holdReady (true);</script>

  <!-- ----- fullCalendar ----- -->
  <script src='./lib/moment.js'></script>
  <script src='./lib/fullcalendar/fullcalendar.js'></script>
  <script src='./lib/fullcalendar/locale/it.js'></script>
  <link rel='stylesheet' href='./lib/fullcalendar/fullcalendar.css' />
  <!--link rel='stylesheet' href='./lib/fullcalendar/fullcalendar.print.css' /-->

  <!-- ----- fullCalendar scheduler ----- -->
  <script src='./lib/fullcalendar-scheduler/scheduler.js'></script>
  <link rel='stylesheet' href='./lib/fullcalendar-scheduler/scheduler.css' />
  <script>$('#calendar').fullCalendar ({ schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives' });</script>

  <!-- ----- sliderNav ----- -->
  <script src='./lib/sliderNav/slidernav.js'></script>
  <link rel="stylesheet" href="./lib/sliderNav/slidernav.css">

  <!-- ----- ToDoList ----- -->
  <script src="./lib/TodoList/dist/jquery.todoList.js"></script>

  <!-- ----- color picker: pickrMaster ----- -->
  <!--script src='./lib/pickr-master/dist/pickr.min.js'></script-->
  <!--link rel="stylesheet" href="./lib/lib/pickr-master/dist/pickr-min.css"-->

  <!-- ----- AgendaOK ----- -->
  <link rel="stylesheet" href="./Agenda-OK.css">
  <script src='./Agenda-OK.js'></script>

</head>

<body>
<div id="container">

  <!-- ============================================== -->
  <table id="header">
    <tr>
      <td id="appname">
        <img src="./Agenda-OK.icon.png" alt="Agenda-OK icon" height="42" width="42">
        <?php echo "$APPNAME v$VERSION"; ?>
      </td>
      <td id="auth">
	<?php include 'auth.inc.html'; ?>
      </td>
    </tr>
  </table> <!-- id="header" -->

  <!-- ============================================== -->
  <div id="tabs">
    <ul>
      <li><a href="#tabs-1">Calendario</a></li>
      <li><a href="#tabs-2">Scheduler</a></li>
      <li><a href="#tabs-3">Rubrica</a></li>
      <li><a href="#tabs-4">Attività</a></li>
      <li><a href="#tabs-5">Categorie</a></li>
      <li><a href="#tabs-6">Help</a></li>
    </ul>

    <!-- ============================================== -->
    <div id="tabs-1" class="tabcontainer">
      <h1>Calendario</h1>
      <div id='calendar'></div>
    </div>

    <!-- ============================================== -->
    <div id="tabs-2" class="tabcontainer">
      <h1>Scheduler</h1>
      <div id='scheduler'></div>
    </div>

    <!-- ============================================== -->
    <div id="tabs-3" class="tabcontainer">
      <h1>Rubrica</h1>
      <!-- object name="Rubrica" type="text/html" data="Rubrica.inc.html"></object -->
      <div class="sliderRubrica">
        <div class="slider-content">
	  <?php require ('sampledata/sampledata.rubrica.inc.html'); ?>
        </div>
      </div>
    </div>

    <!-- ============================================== -->
    <div id="tabs-4" class="tabcontainer">
      <h1>Attività</h1>
      <div id="activities"></div>
      <!--div class="toBeImplemented">TO BE IMPLEMENTED</div-->
    </div>

    <!-- ============================================== -->
    <div id="tabs-5" class="tabcontainer">
      <h1>Categorie</h1>
      <table id="categories">
        <thead>
	  <tr>
	    <td>ID</td>
	    <td>categoria</td>
	    <td>colore</td>
	    <td>priorità</td>
	  </tr>
        </thead>
        <tbody>
        </tbody>
      </table>

      <button id="create-category">Crea una nuova categoria</button>
    </div>

    <!-- ============================================== -->
    <div id="tabs-6" class="tabcontainer">
      <h1>Help</h1>
      <?php require ('help.inc.html'); ?>
    </div>
  </div> <!-- id="tabs" -->

  <!-- ============================================== -->
  <div id="statusbar">
      Attività compatibili: M su N ...
  </div> <!-- id="statusbar" -->

  <!-- ============================================== -->
  <table id="footer">
    <tr>
      <td>Copyright &copy;2018 Andrea Rui</td>
      <td></td>
    </tr>
  </table> <!-- id="footer" -->

  <?php require ('eventFormDialog.inc.html'); ?>
  <script src="./eventFormDialog.js"></script>
  <script src='./event.js'></script>

  <?php require ('categoryFormDialog.inc.html'); ?>
  <script src="./categoryFormDialog.js"></script>
  <script src='./category.js'></script>

  <script src="./init.js"></script>
  <script src="./Agenda-OK.DB.js"></script>
  <script src="./calendar.js"></script>
  <script src="./scheduler.js"></script>

  <script src="./users.js"></script>
  <script src="./resources.js"></script>
  <script src="./activities.js"></script>
  <script src="./todos.js"></script>

  <script src='./auth.js'></script>

  <script src='./sampledata/sampledata.users.js'></script>
  <script src='./sampledata/sampledata.events.js'></script>
  <script src='./sampledata/sampledata.scheduler.js'></script>
  <script src='./sampledata/sampledata.categories.js'></script>
  <script src='./sampledata/sampledata.todos.js'></script>

  <script type="text/javascript">
    // ------------- slider / rubrica ----------------
    $('.sliderRubrica').sliderNav ();
    $('.nameEntry').click (function () { alert ('pippo!!!'); return false; });

    // ------------- todo list ----------------
    $("#activities").todoList ({
		title: "Attività",
		items: [ 'todo 1', 'todo 2', 'todo 3' ]
		});

    Agenda_OK.DBMS = new DBMS ('Agenda-OK');
    if (/[?&]initialize\b/.exec (window.location.search))
    {
      Agenda_OK.DBMS.clear ();
      Agenda_OK.DBMS.initializeData = true;
    }

    Agenda_OK.DBMS.open ();

    $(document).ready (function ()
    {
      console.log ('READY!!!');
      // initialize JQuery UI Tabs ...
      $(function () { $( "#tabs" ).tabs(); } );

      // ----- create hook to popup event dialog -----
      $('.fc-event-container' ).click (function ()
        { $('#event-dialog').dialog ('open'); });

      var	username = /[?&]username=([^&]*)/.exec (window.location.search);
      Agenda_OK.authuser = username ? username [1] : '';

      if (!Agenda_OK.DBMS.initializeData)
      {
	reloadEvents ();
	reloadCategories ();
	reloadResources ();
	reloadActivities ();
	reloadTodos ();
	reloadUsers ();
      }

      console.log ('FINE DELL\'INIZIO!!!!');
    });
  </script>

</div> <!-- id="container" -->
</body>
</html>
