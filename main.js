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
			$('.registration-successful').show();

			$.ajax({
				type: 'POST',
				url: 'form.php',
				data: { inputs: JSON.stringify($("form#register-form").serializeArray()) },
				success: function(data) {
					console.log(data);
				},
				error: function(data) {
					console.log(data);
				}
			});
		}
	});
	
});