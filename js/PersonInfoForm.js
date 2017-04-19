var PersonId = document.location.href.split("=")[1];
document.getElementById("PersonId").setAttribute('value', PersonId);
$(document).ready(function(){
    $("#cancel").on("click", function(){
        $.fancybox.close();
    });
	$("#birthday").datepicker({
		maxDate: new Date(),
		changeYear: true,
		dateFormat: "yy-mm-dd",
		defaultDate: +7
	});
	$("#date-issue").datepicker({
		changeYear: true,
		dateFormat: "yy-mm-dd",
		minDate: new Date(),
		defaultDate: +7
	});
	$("#date-start, #date-finish").datepicker({
		dateFormat: "yy-mm-dd",
		defaultDate: +7
	});
	$.ajax({
		data: {
			id: 1,
			personId: PersonId
		},
		method: 'get',
		url: 'php/getPersonInfo.php',
		method: 'get',
		dataType: 'html',
		success: function(data){
			$("#workplace").append(data);
			$("#workplace").append($("<option value='self'>Свой вариант</option>"));
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
	$.ajax({
		data: "id=2&personId=" + PersonId,
		method: 'get',
		url: 'php/getPersonInfo.php',
		dataType: 'html',
		success: function(data){
			$("#appoinment").append(data);
			$("#appoinment").append($("<option value='self'>Свой вариант</option>"));
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
	$.ajax({
		data: "id=3&personId=" + PersonId,
		method: 'get',
		url: 'php/getPersonInfo.php',
		dataType: 'html',
		success: function(data){
				$("#nationality").append(data);
			$("#nationality").append($("<option value='self'>Свой вариант</option>"));
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
	$.ajax({
		data: "id=4&personId=" + PersonId,
		method: 'get',
		url: 'php/getPersonInfo.php',
		dataType: 'html',
		success: function(data){
				$("#sex").append(data);
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
	$.ajax({
		data: "id=5&personId=" + PersonId,
		method: 'get',
		url: 'php/getPersonInfo.php',
		dataType: 'json',
		success: function(data){
			$.each(data, function(key, value){
				if(value == 'undefined'){
					$("#" + key).attr("placeholder", "Данных нет");
				}else{
					$("#" + key).val(value);
				}
			})
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

    // $.ajax({
    //     data: "id=6&personId=" + PersonId,
    //     method: 'get',
    //     url: 'php/getPersonInfo.php',
    //     dataType: 'text',
    //     success: function(data){
    //         if(data == 'true'){
                
    //         }
    //     }
    // });
});