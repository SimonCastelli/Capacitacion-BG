$(document).ready(function () {

    // Inicializamos la tabla
    $('#TablaAlumnos').jtable({
        title: 'Listado de Alumnos',
        paging: false,
        sorting: false,
        selecting: true,
        multiselect: true, 
        selectingCheckboxes: true, 
        
        actions: {
            listAction: 'controller_tabla.php?action=list'
        },

        selectionChanged: function () {
            var $selectedRows = $('#TablaAlumnos').jtable('selectedRows');
            
            if ($selectedRows.length > 0) {
                $('#btnBorrarMasivo').fadeIn(); 
                $('#btnBorrarMasivo').text("Borrar (" + $selectedRows.length + ") Seleccionados");
            } else {
                $('#btnBorrarMasivo').fadeOut();
            }
        },

        fields: {
            ID: { key: true, list: false },
            DNI: { title: 'DNI', width: '15%' },
            Nombre: { title: 'Nombre Completo', width: '30%' },
            Grado: { title: 'Grado', width: '10%' },
            Edad: { title: 'Edad', width: '5%' },
            Genero: { 
                title: 'Género', width: '10%',
                display: function (data) {
                   return data.record.Genero === 'M' ? 'Masculino' : 'Femenino';
                }
            },
            
            Eliminar: {
                title: 'Acción',
                width: '15%',
                listClass: 'text-center', 
                display: function (data) {
                    return '<div class="d-flex justify-content-center">' +
                           '<button class="btn btn-danger btn-sm delete-btn" data-id="' + data.record.ID + '">Eliminar</button>' +
                           '</div>';
                }
            }
        }
    });

    $('#TablaAlumnos').jtable('load');

    $('#btnBuscar').click(function (e) {
        e.preventDefault();
        $('#TablaAlumnos').jtable('load', {
            dni: $('#f_dni').val(),
            grado: $('#f_grado').val()
        });
    });

    $(document).on('click', '.delete-btn', function() {
        var idParaBorrar = $(this).data('id');
        
        if(confirm('¿Estás seguro de eliminar este alumno?')) {
            $.post('controller_tabla.php?action=delete', { ID: idParaBorrar }, function(data) {
                $('#TablaAlumnos').jtable('reload');
            }, 'json');
        }
    });

    $('#btnBorrarMasivo').click(function () {
        var $selectedRows = $('#TablaAlumnos').jtable('selectedRows');
        
        if ($selectedRows.length > 0) {
            if (confirm('¿Seguro que querés borrar a los ' + $selectedRows.length + ' alumnos seleccionados?')) {
                
                var promesas = [];
                
                $selectedRows.each(function () {
                    var record = $(this).data('record');
                    var peticion = $.post('controller_tabla.php?action=delete', { ID: record.ID });
                    promesas.push(peticion);
                });

                $.when.apply($, promesas).done(function() {
                    $('#TablaAlumnos').jtable('reload');
                    $('#btnBorrarMasivo').hide();
                });
            }
        }
    });
});