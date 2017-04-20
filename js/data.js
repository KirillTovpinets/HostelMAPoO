$(document).ready(function(){
	$(".btn").on("click", function(){
		$.ajax({
			url: 'php/getPeople.php',
			dataType: 'json',
			method: 'POST',
			data: {"info" : $(this).attr("id")},
			success: function(data){
				var MainTable = $("#mainTbody");
				MainTable.html("");
				var numrows = 1;
	            $.each(data, function(index, value){
	                var row = $("<tr></tr>");
	                row.addClass("clickable-row");
	                row.attr("data-src", "#Info-" + numrows);
	                row.attr("data-fancybox", "");
	                var rowNumTD = $("<td></td>");
	                rowNumTD.html(numrows);
	                row.append(rowNumTD);
	                var rowTD = $("<td></td>");
	                rowTD.html(index);
	                row.append(rowTD);
	                MainTable.append(row);
	                
	                if (value.length != 0 ) {
	                	var tablecontainerMore = $("<div></div>");
		                tablecontainerMore.addClass("table-responsive");
		                tablecontainerMore.attr("id", "Info-" + numrows);

		                var tableInfo = $("<table></table>");
		                tableInfo.addClass("table table-bordered table-hover table-striped");
		                var tableheader = $("<thead></thead>");
		                var tableBody = $("<tbody></tbody>");
		                tableInfo.append(tableheader);

		                var tableTR = $("<tr></tr>");
		                for (var i = 1; i <= 3; i++) {
		                	var tableTH = $("<th></th>");
		                    switch(i){
		                        case 1: {
		                            tableTH.html("Фамилия");
		                            break;
		                        }
		                        case 2: {
		                            tableTH.html("Имя");
		                            break;
		                        }
		                        case 3: {
		                            tableTH.html("Отчество");
		                            break;
		                        }
		                    }
		                    tableTR.append(tableTH);
		                }
		                tableheader.append(tableTR);
	                	$.each(value, function(id, val){
			                var row = $("<tr></tr>");
			                for (var i = 0; i < 3; i++) {
			                	var td = $("<td></td>");
			                	switch(i){
			                		case 0: {
			                			td.html(val.f_name);
			                			break;
			                		}
			                		case 1: {
			                			td.html(val.m_name);
			                			break;
			                		}
			                		case 2: {
			                			td.html(val.surname);
			                			break;
			                		}
			                	}
			                	row.append(td);	
			                }
			                tableBody.append(row);
	                	});
	                	tableInfo.append(tableBody);
	                	tablecontainerMore.append(tableInfo);
	                	$("#container").append(tablecontainerMore);
	                }
	                numrows++;
	            });
	            $("[data-fancybox]").fancybox({
	                    buttons: false,
	                    infobar: false,
	                    errorTpl : '<div class="fancybox-error"><p>Нет сотрудников<p></div>',
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
});