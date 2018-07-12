
    /*
    // ----------------------------------------
    const pickr = new Pickr (
    {
      el: '.color-picker',

      default: '#0000ff',

      components:
      {
          preview: true,
          opacity: true,
          hue: true,
          output: { hex: true, rgba: true, hsva: true, input: true },
      },
    });
    */



    // ----------------------------------------
    function	addCategoryRow (record)
    {
      $('#categories tbody').append (
      '<tr id=cat-'+record.ID+' class="category">' +
		'<td id="ID">' + record.ID + '</td>' +
		'<td id="name">' + record.name + '</td>' +
		'<td id="color">' + record.color + '</td>' +
		'<td id="priority">' + record.priority + '</td>' +
      '</tr>' );
    }

    // ----------------------------------------
    $(function ()
    {
      var dialog; // , form;

      // update data back to caller
      function addCategory ()
      {
	var	valid = true;
	var	action = $('#category-dialog').data ('action');
	var	catData = $('#category-dialog').data ('categoryData');
        // var	action = $('#category-dialog').data ('action');
        // var	categoryData = $('#category-dialog').data ('calCategory');
        console.log ('saving org calCategory: %o', catData, 'action: ', action);
	if (catData.color == '') catData.color = 'yellow';

	var	DB_Category =
	{
	  user :	Agenda_OK.authuser,
	  ID :		Number ($('#category-dialog #ID') [0].value),
	  name :	$('#category-dialog #name')     [0].value,
	  color :	$('#category-dialog #color')    [0].value,
	  priority :	$('#category-dialog #priority') [0].value,
	};

	valid = DB_Category.name != '';

	if (valid)
	{
	  // categoryData.title = $('#title')[0].value;
	  // if (action == 'renderCategory')
	    // categoryData.title = Agenda_OK.nextCategoryID++;
	  //!!!!!!!!!!!!! $('#calendar').fullCalendar (action, DB_Category); //, true); // stick? = true
          console.log ('--- MUST SAVE / UPDATE DATABASE: %o', DB_Category);
	  switch (action)
	  {
	    case 'renderCategory':
		DB_Category.ID = Agenda_OK.nextCategoryID++;
		addCategoryRow (DB_Category)
	    	createCategory (DB_Category);
		break;

	    case 'updateCategory':
		console.log ("MUST UPDATE ROW: row = $('+#cat-'"+DB_Category.ID+")");
		var	nam = $('#cat-'+DB_Category.ID+' #name');
		$('#cat-'+DB_Category.ID+' #name') [0].innerText = DB_Category.name;
		$('#cat-'+DB_Category.ID+' #color') [0].innerText = DB_Category.color;
		$('#cat-'+DB_Category.ID+' #priority') [0].innerText = DB_Category.priority;
	    	updateCategory (DB_Category);
		break;

	    default:
	    	console.log ('Category unmanaged database action: '+ action);
		break;
	  }
	  dialog.dialog ('close');
	}

	return valid;
      };

      dialog = $('#category-dialog').dialog (
      {
        autoOpen: false,
        height: 300,
        width: '25em',
        modal: true,

        buttons:	// intialize dialog
        {
          'Add / update category': addCategory,
          Cancel: function () { dialog.dialog ('close'); }
        },

	// populate dialog fields
	// -----------------------------------------------
        open: function ()
        {
          var	dlg = $('#category-dialog');
          var	action = $('#category-dialog').data ('action');
          var	catData = $('#category-dialog').data ('categoryData');

	  if (action == 'updateCategory')
	    $('#name') [0].readOnly = true;

	  var	x1 = $('#category-dialog #ID') [0];
	  var	x2 = $('#category-dialog #name') [0];
	  var	x3 = $('#category-dialog #color') [0];

          // console.log ('popping up calCategory: %o', catData);
          // console.log ('who am I: %o', this);

	  // initialize fields with category data ...
	  $('#category-dialog #ID')    [0].value = catData.ID;
	  $('#category-dialog #name')  [0].value = catData.name;
	  $('#category-dialog #color') [0].value = catData.color;
	  // $('#priority')[0].value = catData.priority;
	  // var	field = $('#priority') [0];
	  // if (categoryData.priority !== null) $('#priority')[categoryData.priority].checked = true;
	  if (catData.priority !== null) $('#category-dialog #priority') [0].value = catData.priority;
        },

	// called any way on OK or cancel (to be verified)
	// -----------------------------------------------
        close: function ()
        {
	  // $("#Category-Dialog-Form").reset ();
	  var	form = $("#Category-Dialog-Form") [0];
	  form.reset ();
          // allFields.removeClass ('ui-state-error');
        }
      });

      // add handler to the save button ...
      var	form = dialog.find ("form").on ("submit", function (event)
			{
			  alert ('onSubmit () ...');
			  // event.preventDefault();
			  // addUser();
			});

      // if an existing category row clicked ...
      $('#categories tbody').on ('click', 'tr.category', function ()
			{
			  var	record = { ID : this.children [0].innerText,
					   name : this.children [1].innerText,
					   color : this.children [2].innerText,
					   priority : this.children [3].innerText,
					 };
			  // console.log ('updateCat: %o', this.children [0].innerText);
			  // console.log ('updateCat: %o', this.children [0]);
			  console.log ('updateCat: %o', record);
			  $('#category-dialog')
			  .data ('action', 'updateCategory')
			  .data ('categoryData', record)
			  .dialog ("open");
			});

      // add handler to add new category button ...
      $("#create-category").button ().on ("click", function ()
			{
			  $('#category-dialog')
			  .data ('action', 'renderCategory')
			  .data ('categoryData', { ID:'', name:'', color:'', priority:1 })
			  .dialog ("open");
			});

    } );
