$(document).ready(function(){
	//Получаем данные об общем количестве мест, свободных и занятых
	$.ajax({
		url: 'php/getNumPlacesTotal.php',
		dataType: 'json',
		success: function(data){
			$("#total").html(data[0].NumberOfPlaces);
			$("#busy").html(data[1].NumBusyPlaces);
			$("#free").html(data[2].NumFreePlaces);
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
	//Получаем данные мест по этажам
	$.ajax({
		url: 'php/getNumPlacesInFlour.php',
		dataType: 'json',
		success: function(data){
			$.each(data, function(index, value){
				var tr = $("<tr></tr>");
				var FlourTd = $("<td><td>");
				FlourTd.html(index);
				tr.append(FlourTd);

				$.each(value, function(ind, val){
					var td = $("<td></td>");
					if (val.numTotal != undefined) {
						td.html(val.numTotal);
					}else if(val.numBusy != undefined){
						td.html(val.numBusy);
					}else{
						td.html(val.numFree);
					}
					tr.append(td);
				});
				$("#flourBody").append(tr);
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
	//Получаем данные мест по полу
	$.ajax({
		url: 'php/getNumGender.php',
		dataType: 'json',
		success: function(data){
			$("#NumMale").html(data[0].numMale);
			$("#NumFemale").html(data[1].numFemale);
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
	//Получаем данные мест по гражданству
	$.ajax({
		url: 'php/getNumNationalities.php',
		dataType: 'json',
		success: function(data){
			for(var key in data){
				var tr = $("<tr></tr>");

				var tdName = $("<td></td>");
				tdName.html(key);
				tr.append(tdName);
				var tdValue = $("<td></td>");
				tdValue.html(data[key]);
				tr.append(tdValue);
				$("#NationalityBody").append(tr);
			}
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
        url: 'php/getEvictionInfo.php',
        dataType: 'JSON',
        success: function(data){
            $.each(data, function(key, value){
                var tr = $("<tr></tr>");
                for (var i = 0; i < 3; i++) {
                    var td = $("<td></td>");
                    switch(i){
                        case 0:{
                            td.html(value.date_finish);
                            break;
                        }
                        case 1:{
                            var input = $("<input />");
                            input.attr("type", "hidden");
                            input.attr("value", value.numVis);
                            td.append(input);
                            td.css("display", "none");
                            break;
                        }
                        case 2:{
                            var btn = $("<a></a>");
                            btn.addClass("btn");
                            btn.addClass("btn-default");
                            btn.html("Отметить");
                            td.append(btn);
                            break;
                        }
                    }
                    tr.append(td);    
                }
                $("#EvictionInfo").append(tr);
            });

            $(".btn").on("click", function(event){
                $(this).toggleClass("btn-success");
                var currentValue = $(this).parent().siblings().has("input").children().attr("value");
                var totalValue = $("#totalEvict").data("currentValue");
                if($(this).hasClass("btn-success")){
                    var newValue = parseInt(totalValue) + parseInt(currentValue);
                    $(this).html("Отменить");
                }else{
                    var newValue = parseInt(totalValue) - parseInt(currentValue);
                    $(this).html("Отметить");
                }
                $("#totalEvict").data("currentValue", newValue);
                $("#totalEvict").html(newValue);
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