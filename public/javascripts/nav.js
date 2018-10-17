document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
  });


  $(document).ready(function(){
    $('.sidenav').sidenav();
  });

  $(document).ready(function() {
    $('#currency').DataTable( 
      {
        "searching":true,
        "responsive":true,
        "pageLength": 10
      }
 );
} );

$(document).ready(function () {
  $('#sell').toFixed(2)
})



// Or with jQuery

$(document).ready(function(){
  $('select').formSelect();
});


// Or with jQuery

$(document).ready(function(){
  $('.datepicker').datepicker({
    format : 'dd.mm.yyyy',
    setDefaultDate : true,
    
  });
});
      

