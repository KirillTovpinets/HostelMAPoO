var placeId = document.location.href.split("=")[1];
document.getElementById("placeId").setAttribute('value', placeId);
$(document).ready(function(){
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
		data: "id=1",
		method: 'get',
		url: 'php/getOptions.php',
		method: 'get',
		dataType: 'json',
		success: function(data){
			$.each(data, function(index, value){
				var option = $("<option></<option>");
				option.val(value.id);
				option.html(value.title + ", " + value.city + ", " + value.region);
				$("#workplace").append(option);
			});
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
		data: "id=2",
		method: 'get',
		url: 'php/getOptions.php',
		dataType: 'json',
		success: function(data){
			$.each(data, function(index, value){
				var option = $("<option></<option>");
				option.val(value.id);
				option.html(value.title);
				$("#appoinment").append(option);
			});
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
		data: "id=3",
		method: 'get',
		url: 'php/getOptions.php',
		dataType: 'json',
		success: function(data){
			$.each(data, function(index, value){
				var option = $("<option></<option>");
				option.val(value.id);
				option.html(value.title);
				$("#nationality").append(option);
			});
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
		data: "id=4",
		method: 'get',
		url: 'php/getOptions.php',
		dataType: 'json',
		success: function(data){
			$.each(data, function(index, value){
				var option = $("<option></<option>");
				option.val(value.id);
				option.html(value.title);
				$("#sex").append(option);
			});
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
		data: "id=5",
		method: 'get',
		url: 'php/getOptions.php',
		dataType: 'json',
		success: function(data){
			var array = new Array();
			$.each(data, function(index, value){
				var obj = new Object();
				obj.label = value.m_name + " " + value.f_name + " " + value.surname;
				obj.value = value.id;
				array.push(obj);
			});
			$("#autocompleteVisitors").autocomplete({
		  		source:array,
		  		select: function(event, ui){
		  			
		  			$.each(data, function(index, value){
		  				if (value.id === ui.item.value) {
		  					$("#name").val(value.f_name);
							$("#surname").val(value.m_name);
							$("#patername").val(value.surname);
							$("#appoinment").val(value.appointment);
							$("#birthday").val(value.date_birthday);
							$("#passport-series").val(value.passport_series);
							$("#passport-number").val(value.passport_number);
							$("#personal-number").val(value.personal_number);
							$("#date-issue").val(value.date_issue);
							$("#authority").val(value.Autority);
							$("#registration-place").val(value.Registration_place);
							$("#registration-address").val(value.Registration_adress);
							$("#mobile").val(value.mobile);
							$("#date-start").val(value.date_start);
							$("#date-finish").val(value.date_finish);

		  				}
		  			})
		  		}
			});
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
});