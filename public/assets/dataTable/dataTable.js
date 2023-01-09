$(function () {
    $(document).ready(function () {
        $('#dataTable').DataTable(
            {
                retrieve: true,
                dom: 'Bfrtip',
                lengthMenu: [
                    [10, 25, 50, -1],
                    ['10 Filas', '25 Filas', '50 Filas', 'Mostrar Todo']
                ],
                "language":{
                    "decimal":        "",
                    "emptyTable":     "Por Favor Recarge la página",
                    "info":           "Mostrando _START_ a _END_ de _TOTAL_ Datos",
                    "infoEmpty":      "Mostrando 0 a 0 de 0 Datos",
                    "infoFiltered":   "(Encontrada de un Total de _MAX_ Datos)",
                    "infoPostFix":    "",
                    "thousands":      ",",
                    "lengthMenu":     "Mostrar _MENU_ entries",
                    "loadingRecords": "Cargando...",
                    "processing":     "Procesando...",
                    "search":         "Buscar:",
                    "zeroRecords":    "No Se han encontado Datos",
                    "paginate": {
                        "first":      "Primera",
                        "last":       "Última",
                        "next":       "Siguiente",
                        "previous":   "Anterior"
                    },
                    "aria": {
                        "sortAscending":  ": activate to sort column ascending",
                        "sortDescending": ": activate to sort column descending"
                    }
                  }
            }
        );
    });


})