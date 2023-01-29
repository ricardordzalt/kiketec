// General
$(document).ready(function () {
    $('#tabla').DataTable();
    $('.dataTables_length').addClass('bs-select');

    $('.scrollup').click(function () {
        $('body, html').animate({
            scrollTop: '0px'
        }, 300);
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.scrollup').slideDown(300);
        }
        else {
            $('.scrollup').slideUp(300);
        }
    });

    $(".numero").on("change", function () {
        if ($(this).val() == "") {
            $(this).val(0);
        }
    });

    $(".numero").on("keydown", function (t) {
        if ((t.which >= 96 && t.which <= 105) || t.which == 110 || t.which == 9 || t.which == 13 || t.which == 8 || t.which == 46 || t.which == 37 || t.which == 39) {
            if (t.which == 110) {
                var txt = $(this).val();
                var n = txt.indexOf(".");
                if (n > -1) {
                    return false;
                }
            }
        }
        else {
            return false;
        }
    });
});

// Comisiones
$("#fini").change(function () {
    $("#ffin").prop('min', this.value);
    $("#ffin").prop('value', this.value);
    $("#fec1").prop('min', this.value);
    $("#fec1").prop('value', this.value);
    $("#fec2").prop('min', this.value);
    $("#fec2").prop('value', this.value);
    $("#fec3").prop('min', this.value);
    $("#fec3").prop('value', this.value);
    $("#fec4").prop('min', this.value);
    $("#fec4").prop('value', this.value);
});

$("#ffin").change(function () {
    $("#fec1").prop('max', this.value);
    $("#fec2").prop('max', this.value);
    $("#fec3").prop('max', this.value);
    $("#fec4").prop('max', this.value);
});

$("#erfc").change(function () {
    $.ajax({
        type: "POST",
        data: { rfc: $("#erfc").val() },
        url: "../scripts/datos_empleado.php"
    }).done(function (json) {
        var json = eval(json);
        if (json[0] != "") {
            $("#nrfc").val(json[0]);
            $("#depe").val(json[1]);
            $("#pues").val(json[2]);
            $("#clav").val(json[3]);
        }
        else {
            $("#nrfc").focus();
        }
    });
});

function total_viaticos() {
    $("#imp1").val($("#cuo1").val() * $("#dia1").val());
    $("#imp2").val($("#cuo2").val() * $("#dia2").val());
    $("#ivia").val(parseFloat($("#imp1").val()) + parseFloat($("#imp2").val()));
}

$("#lug1").keyup(function () {
    if ($("#lug1").val() != "") {
        $("#cuo1").val(1);
        $("#dia1").val(1);
        $("#cuo1").prop("disabled", false);
        $("#dia1").prop("disabled", false);
    }
    else {
        $("#cuo1").val(0);
        $("#dia1").val(0);
        $("#cuo1").prop("disabled", true);
        $("#dia1").prop("disabled", true);
    }
    total_viaticos();
});

$("#lug2").keyup(function () {
    if ($("#lug2").val() != "") {
        $("#cuo2").val(1);
        $("#dia2").val(1);
        $("#cuo2").prop("disabled", false);
        $("#dia2").prop("disabled", false);
    }
    else {
        $("#cuo2").val(0);
        $("#dia2").val(0);
        $("#cuo2").prop("disabled", true);
        $("#dia2").prop("disabled", true);
    }
    total_viaticos();
});

$("#pter").change(function () {
    if ($("#pter").val() != "") {
        if ($("#iter").val() == 0) {
            $("#iter").val(1);
        }
        $("#iter").prop("disabled", false);
        $("#oter").prop("disabled", false);
        $("#dter").prop("disabled", false);
        $("#cter").prop("disabled", false);
    }
    else {
        $("#iter").val(0);
        $("#iter").prop("disabled", true);
        $("#oter").val("");
        $("#oter").prop("disabled", true);
        $("#dter").val("");
        $("#dter").prop("disabled", true);
        $("#otrt").val("");
        $("#otrt").prop("disabled", true);
        $("#cter").val("");
        $("#cter").prop("disabled", true);
    }
});

$("#paer").change(function () {
    if ($("#paer").val() != "") {
        if ($("#iaer").val() == 0) {
            $("#iaer").val(1);
        }
        $("#iaer").prop("disabled", false);
        $("#oaer").prop("disabled", false);
        $("#daer").prop("disabled", false);
        $("#caer").prop("disabled", false);
    }
    else {
        $("#iaer").val(0);
        $("#iaer").prop("disabled", true);
        $("#oaer").val("");
        $("#oaer").prop("disabled", true);
        $("#daer").val("");
        $("#daer").prop("disabled", true);
        $("#caer").val("");
        $("#caer").prop("disabled", true);
    }
});

$("#cuo1").change(function () {
    total_viaticos();
});

$("#cuo2").change(function () {
    total_viaticos();
});

$("#dia1").change(function () {
    total_viaticos();
});

$("#dia2").change(function () {
    total_viaticos();
});

// ComprobaciÃ³n de viÃ¡ticos
$("#folo").change(function () {
    if ($("#folos").val() != "") {
        $.ajax({
            type: "POST",
            data: { year: 2020, foli: $("#folo").val() },
            url: "../scripts/datos_orden.php"
        }).done(function (json) {
            var json = eval(json);
            if (json[0] != "") {
                $("#nrfc").val(json[0]);
                $("#luga").val(json[1]);
                $("#apli").val(json[2]);
                $("#impo").val(json[3]);
            }
        });
        $("#subf").prop("disabled", false);
    }
    else {
        $("#nrfc").val("");
        $("#luga").val("");
        $("#apli").val("");
        $("#impo").val("");
        $("#subf").prop("disabled", true);
    }
});

function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}