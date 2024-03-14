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
                "language": {
                    "decimal": "",
                    "emptyTable": "No existen datos que mostrar",
                    "info": "Mostrando _START_ a _END_ de _TOTAL_ Datos",
                    "infoEmpty": "Mostrando 0 a 0 de 0 Datos",
                    "infoFiltered": "(Encontrada de un Total de _MAX_ Datos)",
                    "infoPostFix": "",
                    "thousands": ",",
                    "lengthMenu": "Mostrar _MENU_ entries",
                    "loadingRecords": "Cargando...",
                    "processing": "Procesando...",
                    "search": "Buscar:",
                    "zeroRecords": "No Se han encontado Datos",
                    "paginate": {
                        "first": "Primera",
                        "last": "Última",
                        "next": "Siguiente",
                        "previous": "Anterior"
                    },
                    "aria": {
                        "sortAscending": ": activate to sort column ascending",
                        "sortDescending": ": activate to sort column descending"
                    }
                }
            }
        );

        $('#dataTable-ord-col1').DataTable(
            {
                retrieve: true,
                dom: 'Bfrtip',
                order: [[1, 'asc']],

                lengthMenu: [
                    [10, 25, 50, -1],
                    ['10 Filas', '25 Filas', '50 Filas', 'Mostrar Todo']
                ],
                "language": {
                    "decimal": "",
                    "emptyTable": "No existen datos que mostrar",
                    "info": "Mostrando _START_ a _END_ de _TOTAL_ Datos",
                    "infoEmpty": "Mostrando 0 a 0 de 0 Datos",
                    "infoFiltered": "(Encontrada de un Total de _MAX_ Datos)",
                    "infoPostFix": "",
                    "thousands": ",",
                    "lengthMenu": "Mostrar _MENU_ entries",
                    "loadingRecords": "Cargando...",
                    "processing": "Procesando...",
                    "search": "Buscar:",
                    "zeroRecords": "No Se han encontado Datos",
                    "paginate": {
                        "first": "Primera",
                        "last": "Última",
                        "next": "Siguiente",
                        "previous": "Anterior"
                    },
                    "aria": {
                        "sortAscending": ": activate to sort column ascending",
                        "sortDescending": ": activate to sort column descending"
                    },
                }
            }
        );

        $('#dataTable-ord-col2').DataTable(
            {
                retrieve: true,
                dom: 'Bfrtip',
                order: [[2, 'asc']],

                lengthMenu: [
                    [10, 25, 50, -1],
                    ['10 Filas', '25 Filas', '50 Filas', 'Mostrar Todo']
                ],
                "language": {
                    "decimal": "",
                    "emptyTable": "No existen datos que mostrar",
                    "info": "Mostrando _START_ a _END_ de _TOTAL_ Datos",
                    "infoEmpty": "Mostrando 0 a 0 de 0 Datos",
                    "infoFiltered": "(Encontrada de un Total de _MAX_ Datos)",
                    "infoPostFix": "",
                    "thousands": ",",
                    "lengthMenu": "Mostrar _MENU_ entries",
                    "loadingRecords": "Cargando...",
                    "processing": "Procesando...",
                    "search": "Buscar:",
                    "zeroRecords": "No Se han encontado Datos",
                    "paginate": {
                        "first": "Primera",
                        "last": "Última",
                        "next": "Siguiente",
                        "previous": "Anterior"
                    },
                    "aria": {
                        "sortAscending": ": activate to sort column ascending",
                        "sortDescending": ": activate to sort column descending"
                    },
                }
            }
        );

        $('#dataTable-ord-col3').DataTable(
            {
                retrieve: true,
                dom: 'Bfrtip',
                order: [[3, 'asc']],

                lengthMenu: [
                    [10, 25, 50, -1],
                    ['10 Filas', '25 Filas', '50 Filas', 'Mostrar Todo']
                ],
                "language": {
                    "decimal": "",
                    "emptyTable": "No existen datos que mostrar",
                    "info": "Mostrando _START_ a _END_ de _TOTAL_ Datos",
                    "infoEmpty": "Mostrando 0 a 0 de 0 Datos",
                    "infoFiltered": "(Encontrada de un Total de _MAX_ Datos)",
                    "infoPostFix": "",
                    "thousands": ",",
                    "lengthMenu": "Mostrar _MENU_ entries",
                    "loadingRecords": "Cargando...",
                    "processing": "Procesando...",
                    "search": "Buscar:",
                    "zeroRecords": "No Se han encontado Datos",
                    "paginate": {
                        "first": "Primera",
                        "last": "Última",
                        "next": "Siguiente",
                        "previous": "Anterior"
                    },
                    "aria": {
                        "sortAscending": ": activate to sort column ascending",
                        "sortDescending": ": activate to sort column descending"
                    },
                }
            }
        );

        $('#dataTable-ord-col4').DataTable(
            {
                retrieve: true,
                dom: 'Bfrtip',
                order: [[4, 'asc']],

                lengthMenu: [
                    [10, 25, 50, -1],
                    ['10 Filas', '25 Filas', '50 Filas', 'Mostrar Todo']
                ],
                "language": {
                    "decimal": "",
                    "emptyTable": "No existen datos que mostrar",
                    "info": "Mostrando _START_ a _END_ de _TOTAL_ Datos",
                    "infoEmpty": "Mostrando 0 a 0 de 0 Datos",
                    "infoFiltered": "(Encontrada de un Total de _MAX_ Datos)",
                    "infoPostFix": "",
                    "thousands": ",",
                    "lengthMenu": "Mostrar _MENU_ entries",
                    "loadingRecords": "Cargando...",
                    "processing": "Procesando...",
                    "search": "Buscar:",
                    "zeroRecords": "No Se han encontado Datos",
                    "paginate": {
                        "first": "Primera",
                        "last": "Última",
                        "next": "Siguiente",
                        "previous": "Anterior"
                    },
                    "aria": {
                        "sortAscending": ": activate to sort column ascending",
                        "sortDescending": ": activate to sort column descending"
                    },
                }
            }
        );

        // $('#dataTable-ord-col5').DataTable(
        //     {
        //         retrieve: true,
        //         dom: 'Bfrtip',
        //         order: [[1, 'asc']],

        //         lengthMenu: [
        //             [10, 25, 50, -1],
        //             ['10 Filas', '25 Filas', '50 Filas', 'Mostrar Todo']
        //         ],
        //         "language": {
        //             "decimal": "",
        //             "emptyTable": "No existen datos que mostrar",
        //             "info": "Mostrando _START_ a _END_ de _TOTAL_ Datos",
        //             "infoEmpty": "Mostrando 0 a 0 de 0 Datos",
        //             "infoFiltered": "(Encontrada de un Total de _MAX_ Datos)",
        //             "infoPostFix": "",
        //             "thousands": ",",
        //             "lengthMenu": "Mostrar _MENU_ entries",
        //             "loadingRecords": "Cargando...",
        //             "processing": "Procesando...",
        //             "search": "Buscar:",
        //             "zeroRecords": "No Se han encontado Datos",
        //             "paginate": {
        //                 "first": "Primera",
        //                 "last": "Última",
        //                 "next": "Siguiente",
        //                 "previous": "Anterior"
        //             },
        //             "aria": {
        //                 "sortAscending": ": activate to sort column ascending",
        //                 "sortDescending": ": activate to sort column descending"
        //             },
        //         }
        //     }
        // );

        $('#dataTable-ord-col5').DataTable({
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'copyHtml5',
                    exportOptions: {
                        columns: [0, ':visible']
                    }
                },
                {
                    extend: 'excelHtml5',
                    exportOptions: {
                        columns: ':visible'
                    }
                },
                {
                    extend: 'pdfHtml5',
                    exportOptions: {
                        columns: [0, 1, 2, 5]
                    }
                },
                'colvis'
            ]
        });

    });


})