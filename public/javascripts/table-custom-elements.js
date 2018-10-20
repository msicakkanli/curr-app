(function ($) {
  $(document).ready(function(){



    var table = $('#table-custom-elements').DataTable({
     
      'columnDefs': [{
         'targets': 0,
         'searchable':false,
         'orderable':false,
         'className': 'dataTables-checkbox-column',
         'render': function (data, type, full, meta){
             return '<label><input class="filled-in" type="checkbox" name="id[]" value="'
                + $('<div/>').text(data).html() + '"><span></span></label>';
         }
      }],
      'language': {
        'search': '',
        'searchPlaceholder': 'Para Birimini Giriniz'
      },
      'order': [1, 'asc'],
      'dom': 'ft<"footer-wrapper"l<"paging-info"ip>>',
      'scrollY': '400px',
      'scrollCollapse': true,
      'pagingType': 'full',
      'drawCallback': function( settings ) {
        var api = this.api();

        // Add waves to pagination buttons
        $(api.table().container()).find('.paginate_button').addClass('waves-effect');

        api.table().columns.adjust();
      }
    });

    jQuery('#table-custom-elements').on('change', 'input[type=checkbox]', function(e) {
      var parentTR = $(this).parentsUntil('table').closest('tr');
      parentTR.toggleClass('selected', this.checked);
    });

    // Handle click on "Select all" control
    $('#table-custom-elements .select-all').on('click', function(){
      // Check/uncheck all checkboxes in the table
      var rows = table.rows({ 'search': 'applied' }).nodes();
      $('input[type="checkbox"]', rows)
        .prop('checked', this.checked)
      $(rows).toggleClass('selected', this.checked);
    });


  });
}( jQuery ));
