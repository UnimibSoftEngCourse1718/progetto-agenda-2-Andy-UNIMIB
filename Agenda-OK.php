<?php
  $APPNAME='Agenda-OK';
  $VERSION='0.1';
?>
<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title><?php echo "$APPNAME v$VERSION"; ?></title>

  <!-- ----- JQuery ----- -->
  <script src="./lib/jquery.js"></script>
  <script src="./lib/jquery-ui/jquery-ui.js"></script>
  <link rel="stylesheet" href="./lib/jquery-ui/themes/base/jquery-ui.css" />

  <!-- ----- AgendaOK ----- -->
  <link rel="stylesheet" href="./Agenda-OK.css">

  <script>
    // initialize JQuery UI Tabs ...
    $(function () { $( "#tabs" ).tabs(); } );
  </script>
</head>

<body>
<div id="container">

  <!-- ============================================== -->
  <table id="header">
    <tr>
      <td id="title"><?php echo "$APPNAME v$VERSION"; ?></td>
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
    <div id="tabs-1">
      <h1>Calendario</h1>
      <div id='calendar'></div>
    </div>

    <!-- ============================================== -->
    <div id="tabs-2">
      <h1>Scheduler</h1>
      <div id='scheduler'></div>
    </div>

    <!-- ============================================== -->
    <div id="tabs-3">
      <h1>Rubrica</h1>
      <div id="rubrica">
      </div>
    </div>

    <!-- ============================================== -->
    <div id="tabs-4">
      <h1>Attività</h1>
      <div id="activities"></div>
    </div>

    <!-- ============================================== -->
    <div id="tabs-5">
      <h1>Categorie</h1>
      <div id="categories"></div>
    </div>

    <!-- ============================================== -->
    <div id="tabs-6">
      <h1>Help</h1>
      <h2 id="H1">Calendario</h2>
      <p>TBD</p>
      <h2 id="H2">Rubrica</h2>
      <p>TBD</p>
      <h2 id="H3">Attività</h2>
      <p>TBD</p>
      <h2 id="H4">Categorie</h2>
      <p>TBD</p>
    </div>
  </div> <!-- id="tabs" -->

  <!-- ============================================== -->
  <table id="footer">
    <tr>
      <td>Copyright &copy;2018 Andrea Rui</td>
      <td></td>
    </tr>
  </table> <!-- id="footer" -->

</div> <!-- id="container" -->
</body>
</html>
