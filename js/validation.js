$(document).ready(function(){
	$(".select-option").change(function(){
		if(this.value == 'self'){
			$(this).siblings(".input-group").css("display", "block");
			$(this).css("display", "none");	
		}
	});
	$("#form").validate({
		rules: {
			name: "required",
			surname: "required",
			appoinment: "required",
			birthday: "required",
			passport_series: "required",
			passport_number: "required",
			personal_number: "required",
			date_issue: "required",
			authority: "required",
			registration_place: "required",
			registration_address: "required",
			mobile: "required",
			date_start: "required",
			date_finish: "required"
		},
		messages: {
			name: {
				required: "Это обязательное поле"
			},
			surname: {
				required: "Это обязательное поле"
			},
			appoinment: {
				required: "Это обязательное поле"
			},
			birthday: {
				required: "Это обязательное поле"
			},
			passport_series: {
				required: "Это обязательное поле"
			},
			passport_number: {
				required: "Это обязательное поле"
			},
			personal_number: {
				required: "Это обязательное поле"
			},
			date_issue: {
				required: "Это обязательное поле"
			},
			authority: {
				required: "Это обязательное поле"
			},
			registration_place: {
				required: "Это обязательное поле"
			},
			registration_address: {
				required: "Это обязательное поле"
			},
			mobile: {
				required: "Это обязательное поле"
			},
			date_start: {
				required: "Это обязательное поле"
			},
			date_finish: {
				required: "Это обязательное поле"
			}
		},
		errorClass: "has-error",
		errorPlacement: function(error, element){
			$(element).attr("placeholder", error.text());
		},
		submitHandler: function(){
			$.ajax({
				type: 'POST',
				url: 'php/SavePerson.php',
				dataType: "text",
				data: $("#form").serialize(),
				success: function(data){
					$("#form").css("display", "none");
					if(data == "500"){
						$("#error-message").css("display", "block");
					}else{
						$("#success-message").css("display", "block");
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
		}
	});
});