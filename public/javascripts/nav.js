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

// Toggle Function
$('.toggle').click(function(){
  // Switches the Icon
  $(this).children('i').toggleClass('fa-pencil');
  // Switches the forms  
  $('.form').animate({
    height: "toggle",
    'padding-top': 'toggle',
    'padding-bottom': 'toggle',
    opacity: "toggle"
  }, "slow");
});