document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
  });

  // Or with jQuery

  $(document).ready(function(){
    $('.sidenav').sidenav();
  });

  $(document).ready(function() {
    $('#currency').DataTable( 
      {
        "searching":false,
        "responsive":true,
        "pageLength": 10
      }
 );
} );