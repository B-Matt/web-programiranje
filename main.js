$(document).ready(function(){
	
	$('.alert').hide();
	
	$("#register-button").click(function(event) {
		
		event.preventDefault();
		if(!$("form#register-form")[0].checkValidity()) {
			$('.registration-alert').show();
		}
		
		var isEmpty = false;		
		$("form#register-form input[type=text]").each(function(){
			
			var value = $(this).val();			
			if(!value) {
				isEmpty = true;
			}
		});
		
		if(isEmpty) {
			$('.registration-alert').show();
		} else {
			$.ajax({
				type: 'POST',
				url: 'form.php',
				data: { inputs: JSON.stringify($("form#register-form").serializeArray()) },
				success: function() {
					$('.registration-successful').show();
				},
				error: function(data) {
					if(data.status == 403) {
						$('.registration-alert').html("Given user is already in our database!<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>").show();
					}
				}
			});
		}
	});
	
});