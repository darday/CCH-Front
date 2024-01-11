// Call the dataTables jQuery plugin
// $(document).ready(function() {
//   $('#dataTable').DataTable();

// });

$(function () {
    var table2 = $('#dataTableListarMatriculas').DataTable();
    table2.destroy();

    var table = $('#dataTable').DataTable();
    table.destroy();

    var table = $('#dataTable-ord-col1').DataTable();
    table.destroy();

    var table = $('#dataTable-ord-col2').DataTable();
    table.destroy();
})