
$(document).ready(function(){
    $("#visitors").on("click", ".clickable-row", function(){
        $(this).addClass("active").siblings().removeClass("active");
    });
    $("#search").keyup(function(){
        var search = $(this).val();
        $.ajax({
            url: 'php/search.php',
            type: 'POST',
            data: {'search' : search},
            dataType: 'html',
            cache: false,
            success: function(data){
                //alert(data);
                $("#visitors").children("tbody").html(data);
            },
            error: function (jqXHR, exception) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                alert(msg);
            }
        });
    })
    $.ajax({
        url: 'php/visitors.php',
        dataType: 'json',
        success: function(data){
            $.each(data, function(index, value){
                var row = $("<tr></tr>");
                row.addClass("clickable-row");
                row.attr("data-src", "PersonInfoForm.html?id=" + value.id);
                row.attr("data-fancybox", "");
                var nameCell = $("<td>" + value.f_name + "</td>");
                var fnameCell = $("<td>" + value.m_name + "</td>");
                var paterCell = $("<td>" + value.surname + "</td>");
                var birthCell = $("<td>" + value.date_birthday + "</td>");

                $("[data-fancybox]").fancybox({
                    buttons: false,
                    infobar: false
                });
                row.append(fnameCell);
                row.append(nameCell);
                row.append(paterCell);
                row.append(birthCell);
                var mainTbody = $("#mainTbody");
                mainTbody.append(row);
            });
        }
    });
});