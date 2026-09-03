$(document).ready(function() {  

    $("#Grado").change(function() {
        if ($(this).val() == "") {
            $("#Grado").css("border", "3px solid red");
        } else {
            var grado = $(this).val();
            $("#Grado").css("border", "3px solid green");
        }
    });

    $("#Apellido").blur(function() {
        if ($(this).val().trim().length < 4) {
            $("#Apellido").css("border", "3px solid red");
        } else {
            $("#Apellido").css("border", "3px solid green");
        }
    });
    $("#Nombre").blur(function() {
        if ($(this).val().trim().length < 4) {
            $("#Nombre").css("border", "3px solid red");
        } else {
            $("#Nombre").css("border", "3px solid green");
        }
    });
    var fechacorrecta = false;
    var dniLibre = false;

  
    $("#DNI").blur(function() {
        var $input = $(this); 
        var dniVal = $input.val().trim();

        if (dniVal.length < 7 || dniVal.length > 8) {
            $input.css("border", "3px solid red");
            dniLibre = false;
        } else {
        
            $.get("check_dni.php", { dni: dniVal }, function(data) {
                if (data.existe) { 
                    $input.css("border", "3px solid red");
                    dniLibre = false; 
                    Swal.fire("Error", "Este DNI ya está registrado", "warning");
                } else {    
                    $input.css("border", "3px solid green");
                    dniLibre = true; 
                }
            }, "json");
        }
    }); 
    $("#Edad").blur(function() {
        if (parseInt($(this).val()) < 18) {
            $("#Edad").css("border", "3px solid red");
        } else if(parseInt($(this).val()) > 100){
            $("#Edad").css("border", "3px solid red");
        }else if(isNaN(parseInt($(this).val()))){
            $("#Edad").css("border", "3px solid red");
        } else {
            $("#Edad").css("border", "3px solid green");
        }
    });
    var fechacorrecta = false;
    $("#FechaNacimiento").blur(function() {
        var fecha = new Date($(this).val());
        var hoy = new Date();
        var edad = hoy.getFullYear() - fecha.getFullYear();
        if (edad < 18) {
            $("#FechaNacimiento").css("border", "3px solid red");
            fechacorrecta = false;
        } else if(edad > 100){
            $("#FechaNacimiento").css("border", "3px solid red");
            fechacorrecta = false;
        }else if(isNaN(fecha.getTime())){
            $("#FechaNacimiento").css("border", "3px solid red");
            fechacorrecta = false;
        } else {
            $("#FechaNacimiento").css("border", "3px solid green");
            fechacorrecta = true;
        }
    });

    
    $("#Domicilio").blur(function() {
        var direccion = $(this).val().trim();
        var regex = /^[a-zA-Z0-9\s#\-\.,ñÑáéíóúÁÉÍÓÚ]+$/;

        if (direccion === "") {
            $(this).css("border", "3px solid red");
        } 
        else if (!regex.test(direccion)) {
            $(this).css("border", "3px solid red");
        } 
        else if (direccion.length > 50) {
            $(this).css("border", "3px solid red");
        } else if (direccion.length < 4){
            $(this).css("border", "3px solid red");
        } else {   
            $(this).css("border", "3px solid green");
        }
    });

    $("#btnenviar").click(function(e) {
        e.preventDefault();

        var formulario = {
            Grado: $("#Grado").val(),
            Apellido: $("#Apellido").val(),
            Nombre: $("#Nombre").val(),
            DNI: $("#DNI").val(),
            Edad: $("#Edad").val(),
            Genero: $("input[name='genero']:checked").val(),
            FechaNacimiento: $("#FechaNacimiento").val(),
            Domicilio: $("#Domicilio").val()
        };

      
        var camposValidos = (
            formulario.Apellido.length >= 4 && 
            formulario.Nombre.length >= 4 && 
            dniLibre &&
            fechacorrecta &&
            formulario.Genero != null
        );

        if(!camposValidos){
            Swal.fire({
                icon: "error",
                title: "No se puede enviar",
                text: "Revisá que todos los campos estén verdes y el DNI no esté repetido.",
            });
            return;
        }

        $.ajax({
            url: "formulario.php",
            type: "POST",              
            data: {
                grado: formulario.Grado,
                apellido: formulario.Apellido,
                nombre: formulario.Nombre,
                dni: formulario.DNI,
                genero: formulario.Genero,
                domicilio: formulario.Domicilio,
                fecha: formulario.FechaNacimiento,
                edad: formulario.Edad    
            },     
            success: function(response) {
                Swal.fire("¡Éxito!", response.mensaje, "success");
                
                $("form")[0].reset(); 

                $(".form-control").css("border", ""); 
                
                dniLibre = false;

            }
        });
    });



});